import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Mail, Check, Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { Input } from '@/components/ui/input';

// Configure your Formspree endpoint here
const FORM_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';

interface EmailGateModalProps {
  isOpen: boolean;
  onClose: () => void;
  downloadUrl: string;
  packTitle: string;
}

const EmailGateModal = ({ isOpen, onClose, downloadUrl, packTitle }: EmailGateModalProps) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Veuillez entrer votre email');
      return;
    }

    if (!validateEmail(email)) {
      setError('Email invalide');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          email,
          pack: packTitle,
          timestamp: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
        
        // Trigger download after short delay
        setTimeout(() => {
          const link = document.createElement('a');
          link.href = downloadUrl;
          link.download = '';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }, 500);

        // Close modal after showing success
        setTimeout(() => {
          onClose();
          // Reset state for next time
          setTimeout(() => {
            setEmail('');
            setIsSuccess(false);
          }, 300);
        }, 2000);
      } else {
        throw new Error('Erreur lors de l\'envoi');
      }
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    onClose();
    // Reset state after close animation
    setTimeout(() => {
      setEmail('');
      setError('');
      setIsSuccess(false);
    }, 300);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md w-full bg-background border-studio-border p-0 overflow-hidden rounded-3xl">
        <VisuallyHidden>
          <DialogTitle>Débloquer le pack</DialogTitle>
        </VisuallyHidden>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="p-8 md:p-10"
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors p-2"
            aria-label="Fermer"
          >
            <X size={20} />
          </button>

          {!isSuccess ? (
            <>
              {/* Icon */}
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-foreground/5 border border-foreground/10 flex items-center justify-center">
                  <Mail size={28} className="text-foreground" />
                </div>
              </div>

              {/* Title */}
              <h2 className="text-2xl md:text-3xl font-black tracking-tighter text-center mb-4 text-foreground uppercase">
                Débloquer le Pack
              </h2>

              {/* Description */}
              <p className="text-muted-foreground text-center text-sm md:text-base mb-8 leading-relaxed">
                Entrez votre email pour recevoir votre lien de téléchargement sécurisé et rejoindre la liste StudioWav.
              </p>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input
                    type="email"
                    placeholder="votre@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-14 bg-secondary border-foreground/10 rounded-xl px-5 text-foreground placeholder:text-muted-foreground focus:border-foreground/30 focus:ring-0"
                    disabled={isSubmitting}
                  />
              {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-destructive text-xs mt-2 ml-1"
                    >
                      {error}
                    </motion.p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-foreground text-background py-4 font-black uppercase tracking-tighter hover:bg-foreground/90 transition-colors flex items-center justify-center gap-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Envoi en cours...
                    </>
                  ) : (
                    'Recevoir mon pack'
                  )}
                </button>
              </form>

              {/* Privacy note */}
              <p className="text-muted-foreground/60 text-xs text-center mt-6">
                Votre email ne sera jamais partagé. Pas de spam, promis.
              </p>
            </>
          ) : (
            /* Success State */
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                  <Check size={40} className="text-primary" />
                </div>
              </div>
              
              <h2 className="text-2xl font-black tracking-tighter text-foreground uppercase mb-2">
                Merci !
              </h2>
              <p className="text-muted-foreground">
                Téléchargement lancé ! 🎉
              </p>
            </motion.div>
          )}
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default EmailGateModal;
