import { motion } from "framer-motion";

const CTABanner = () => (
  <section className="py-24 lg:py-32 relative overflow-hidden">
    {/* Gradient bg */}
    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-accent/10" />
    <div className="absolute inset-0 grain-overlay" />

    <div className="relative container mx-auto px-4 lg:px-8 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="font-display text-5xl lg:text-7xl tracking-tight mb-4">
          TU TRANSFORMACIÓN
          <br />
          <span className="text-gradient-amber">COMIENZA HOY</span>
        </h2>
        <p className="font-body text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
          Primeras 2 semanas de prueba sin costo. Sin compromisos, sin excusas.
        </p>
        <a
          href="https://wa.me/5492262000000"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-accent hover:bg-accent/90 text-accent-foreground font-body font-bold text-lg px-10 py-4 rounded-full transition-all duration-300 hover:shadow-[0_0_40px_hsl(355_72%_56%/0.4)] animate-pulse-glow"
        >
          EMPEZÁ GRATIS →
        </a>
      </motion.div>
    </div>
  </section>
);

export default CTABanner;
