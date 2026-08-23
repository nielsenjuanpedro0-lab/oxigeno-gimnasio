import Reveal from "./Reveal";

const WHATSAPP_URL = "https://wa.me/5492262664679";

/**
 * Banner de promoción.
 *
 * No está montado en ninguna página: la promo de dos semanas gratis no está
 * confirmada como vigente. Se mantiene actualizado al sistema visual para que se
 * pueda activar sin retoques si el gimnasio la vuelve a ofrecer.
 */
const CTABanner = () => (
  <section className="border-y border-border bg-surface-2 py-20 lg:py-28">
    <div className="container">
      <Reveal>
        <h2 className="font-display text-[2.75rem] leading-[0.9] sm:text-6xl lg:text-7xl">
          TU TRANSFORMACIÓN
          <br />
          <span className="text-muted-foreground">COMIENZA HOY</span>
        </h2>
        <p className="font-body text-lg text-muted-foreground mt-6 max-w-md leading-relaxed">
          Primeras 2 semanas de prueba sin costo. Sin compromisos.
        </p>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary btn-lg mt-9"
        >
          Empezar gratis
        </a>
      </Reveal>
    </div>
  </section>
);

export default CTABanner;
