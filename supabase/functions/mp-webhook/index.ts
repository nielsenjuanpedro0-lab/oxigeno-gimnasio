import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const MP_ACCESS_TOKEN = Deno.env.get("MP_ACCESS_TOKEN");
    if (!MP_ACCESS_TOKEN) {
      throw new Error("MP_ACCESS_TOKEN is not configured");
    }

    const body = await req.json();
    console.log("Webhook received:", JSON.stringify(body));

    // MercadoPago sends different types of notifications
    if (body.type === "payment" || body.action === "payment.updated" || body.action === "payment.created") {
      const paymentId = body.data?.id;
      if (!paymentId) {
        return new Response(JSON.stringify({ received: true }), {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Get payment details from MercadoPago
      const mpResponse = await fetch(
        `https://api.mercadopago.com/v1/payments/${paymentId}`,
        {
          headers: { Authorization: `Bearer ${MP_ACCESS_TOKEN}` },
        }
      );

      const payment = await mpResponse.json();
      console.log("Payment details:", JSON.stringify(payment));

      if (!mpResponse.ok) {
        throw new Error(`MP API error [${mpResponse.status}]: ${JSON.stringify(payment)}`);
      }

      const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
      const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
      const supabase = createClient(supabaseUrl, supabaseServiceKey);

      // Update member payment status
      const memberId = payment.external_reference;
      if (memberId) {
        const updateData: Record<string, unknown> = {
          payment_id: String(paymentId),
          payment_status: payment.status, // approved, pending, rejected
        };

        // If payment approved, set membership dates
        if (payment.status === "approved") {
          const startDate = new Date();
          const endDate = new Date();
          endDate.setMonth(endDate.getMonth() + 1);
          updateData.membership_start = startDate.toISOString().split("T")[0];
          updateData.membership_end = endDate.toISOString().split("T")[0];

          // Auto-create auth account for the member
          const { data: member } = await supabase
            .from("members")
            .select("email, full_name")
            .eq("id", memberId)
            .single();

          if (member) {
            // Create auth user with a temporary password (they can reset it)
            const tempPassword = crypto.randomUUID().slice(0, 12);
            const { error: authError } = await supabase.auth.admin.createUser({
              email: member.email,
              password: tempPassword,
              email_confirm: true,
              user_metadata: { full_name: member.full_name },
            });

            if (authError && !authError.message.includes("already been registered")) {
              console.error("Auth user creation error:", authError);
            }
          }
        }

        const { error: updateError } = await supabase
          .from("members")
          .update(updateData)
          .eq("id", memberId);

        if (updateError) {
          console.error("Update error:", updateError);
        }
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    console.error("Webhook error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
