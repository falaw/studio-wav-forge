import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer
      id="contact"
      className="py-20 px-6 border-t border-foreground/10 text-center relative z-10"
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center space-y-8">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl font-black tracking-tighter text-foreground"
        >
          STUDIOWAV
        </motion.span>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="flex flex-col items-center"
        >
          <span className="text-xs uppercase tracking-studio text-muted-foreground mb-2">
            Collaboration
          </span>
          <a
            href="mailto:contact@studiowav.com?subject=Demande%20de%20collaboration%20-%20StudioWav"
            className="text-2xl md:text-5xl hover:text-primary transition-colors font-black tracking-tighter text-foreground"
          >
            contact@studiowav.com
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-muted-foreground text-xs uppercase tracking-widest pt-10"
        >
          © 2026 Creative House. Tous droits réservés.
        </motion.p>
      </div>
    </footer>
  );
};

export default Footer;
