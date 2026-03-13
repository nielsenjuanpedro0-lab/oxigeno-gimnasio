import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
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

    const { full_name, email, phone, dni, plan, plan_price } = await req.json();

    if (!full_name || !email || !dni || !plan || !plan_price) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Save member as pending in DB
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { data: member, error: dbError } = await supabase
      .from("members")
      .insert({
        full_name,
        email,
        phone,
        dni,
        plan,
        plan_price,
        payment_status: "pending",
      })
      .select()
      .single();

    if (dbError) {
      throw new Error(`DB error: ${dbError.message}`);
    }

    // Create MercadoPago preference
    const projectId = Deno.env.get("SUPABASE_PROJECT_ID") || supabaseUrl.split("//")[1].split(".")[0];
    
    const preference = {
      items: [
        {
          title: `Membresía ${plan} - Oxígeno Gym`,
          quantity: 1,
          unit_price: plan_price,
          currency_id: "ARS",
        },
      ],
      payer: {
        name: full_name,
        email,
        identification: { type: "DNI", number: dni },
      },
      external_reference: member.id,
      back_urls: {
        success: `${req.headers.get("origin") || "https://oxigenogym.com"}/?payment=success`,
        failure: `${req.headers.get("origin") || "https://oxigenogym.com"}/?payment=failure`,
        pending: `${req.headers.get("origin") || "https://oxigenogym.com"}/?payment=pending`,
      },
      auto_return: "approved",
      notification_url: `${supabaseUrl}/functions/v1/mp-webhook`,
    };

    const mpResponse = await fetch(
      "https://api.mercadopago.com/checkout/preferences",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${MP_ACCESS_TOKEN}`,
        },
        body: JSON.stringify(preference),
      }
    );

    const mpData = await mpResponse.json();

    if (!mpResponse.ok) {
      throw new Error(`MercadoPago error [${mpResponse.status}]: ${JSON.stringify(mpData)}`);
    }

    return new Response(
      JSON.stringify({
        init_point: mpData.init_point,
        sandbox_init_point: mpData.sandbox_init_point,
        member_id: member.id,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: unknown) {
    console.error("Error creating payment:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
