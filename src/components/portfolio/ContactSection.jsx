import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { base44 } from '@/api/base44Client';

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    await base44.integrations.Core.SendEmail({
      to: 'hrene2412@gmail.com',
      subject: `Portfolio Contact from ${formData.name}`,
      body: `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    });
    setSending(false);
    setSent(true);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section ref={ref} id="contact" className="bg-black py-16 md:py-24 px-4 sm:px-6 md:px-12 lg:px-24 relative">
      {/* Background pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 border border-white/5 rounded-full" />
        <div className="absolute bottom-1/4 left-0 w-64 h-64 border border-white/5 rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-white/40 text-sm tracking-[0.4em] uppercase">04</span>
          <h2 className="text-white text-5xl md:text-7xl font-light tracking-tight mt-4">
            Connect
          </h2>
          <div className="w-24 h-px bg-white mt-6" />
          <p className="text-white/50 mt-6 max-w-xl">
            Every great partnership begins with a conversation. Let's discuss how we can create something extraordinary together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Left side - Contact info */}
          <motion.div
            className="space-y-12"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Email highlight */}
            <div>
              <p className="text-white/40 text-sm tracking-[0.2em] uppercase mb-4">Get in touch</p>
              <a
                href="mailto:hrene2412@gmail.com"
                className="text-xl md:text-2xl lg:text-3xl text-white font-light hover:text-white/70 transition-colors duration-300 break-all"
              >
                hrene2412@gmail.com
              </a>
            </div>

            {/* Availability status */}
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-white/60 text-sm">Available for new opportunities</span>
            </div>
          </motion.div>

          {/* Right side - Contact form */}
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div>
              <label className="text-white/40 text-sm tracking-[0.2em] uppercase mb-2 block">
                Name
              </label>
              <Input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-transparent border-white/20 text-white placeholder:text-white/30 focus:border-white h-12 rounded-none"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="text-white/40 text-sm tracking-[0.2em] uppercase mb-2 block">
                Email
              </label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-transparent border-white/20 text-white placeholder:text-white/30 focus:border-white h-12 rounded-none"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="text-white/40 text-sm tracking-[0.2em] uppercase mb-2 block">
                Message
              </label>
              <Textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="bg-transparent border-white/20 text-white placeholder:text-white/30 focus:border-white min-h-[150px] rounded-none resize-none"
                placeholder="Tell me about your project..."
              />
            </div>

            <Button
              type="submit"
              disabled={sending || sent}
              className="w-full bg-white text-black hover:bg-white/90 h-14 rounded-none text-sm tracking-[0.2em] uppercase font-medium group disabled:opacity-60"
            >
              {sent ? (
                <span>Message Sent ✓</span>
              ) : sending ? (
                <span>Sending...</span>
              ) : (
                <>
                  <span>Send Message</span>
                  <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </>
              )}
            </Button>
          </motion.form>
        </div>

        {/* Footer */}
        <motion.div
          className="mt-24 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <p className="text-white/30 text-sm">
            © 2026 — Rene Hernandez
          </p>
          <p className="text-white/30 text-sm tracking-[0.2em]">
            California, USA
          </p>
        </motion.div>
      </div>
    </section>
  );
}
