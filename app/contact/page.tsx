"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, MessageCircle, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generateWhatsAppLink } from "@/lib/utils";

const contactDetails = [
  {
    icon: Phone,
    label: "Phone / WhatsApp",
    value: "+91 9313994191",
    href: "tel:+919313994191",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "193, Amizara Residency, Bamroli, Surat, Gujarat 394010",
    href: "https://maps.app.goo.gl/LfBB5iUfNmjKqUby5",
  },
  {
    icon: Mail,
    label: "Email",
    value: "book@hpmehendiart.com",
    href: "mailto:book@hpmehendiart.com",
  },
  {
    icon: Clock,
    label: "Working Hours",
    value: "Mon – Sun: 9:00 AM – 8:00 PM",
    href: null,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1 + 0.2, duration: 0.5 },
  }),
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Banner */}
      <div className="relative bg-gradient-to-br from-primary/10 via-accent/5 to-background pt-36 pb-20 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-10"
          style={{ backgroundImage: "radial-gradient(circle at 60% 40%, hsl(var(--primary)) 0%, transparent 60%)" }}
        />
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-accent font-semibold tracking-[0.3em] uppercase text-sm mb-4"
        >
          We&apos;d love to hear from you
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-heading text-5xl md:text-6xl font-bold text-foreground mb-5"
        >
          Get In Touch
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="text-muted-foreground text-lg max-w-xl mx-auto"
        >
          Book an appointment or reach out with any questions. We reply on WhatsApp within minutes!
        </motion.p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">

          {/* ── Left: Contact Info ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Info Card */}
            <div className="bg-white rounded-3xl shadow-md border border-border/60 p-8 space-y-7">
              <h3 className="font-heading text-2xl font-bold text-foreground">Contact Information</h3>

              {contactDetails.map((item, i) => (
                <motion.div
                  key={item.label}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  variants={fadeUp}
                  className="flex items-start gap-4"
                >
                  <div className="bg-primary/10 p-3 rounded-2xl text-primary shrink-0">
                    <item.icon size={22} />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{item.label}</p>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors text-sm leading-snug"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-muted-foreground text-sm">{item.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <Button
              nativeButton={false}
              render={
                <a
                  href={generateWhatsAppLink("Hi Himani! I found your website and would like to book a Mehndi session.")}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
              size="lg"
              className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white rounded-2xl py-5 text-base font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3"
            >
              <MessageCircle size={22} />
              Chat on WhatsApp
            </Button>

            {/* Social + Review row */}
            <div className="grid grid-cols-2 gap-4">
              <a
                href="https://www.instagram.com/hp_mehendi_art"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-secondary text-foreground rounded-2xl py-4 font-semibold text-sm border border-accent/20 shadow-sm hover:shadow-md hover:bg-secondary/80 hover:border-accent/40 hover:scale-[1.02] transition-all"
              >
                {/* Instagram SVG */}
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
                Instagram
              </a>
              <a
                href="https://g.page/r/hpmehendiart"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-accent text-white rounded-2xl py-4 font-semibold text-sm shadow-sm hover:shadow-md hover:bg-accent/90 hover:scale-[1.02] transition-all"
              >
                <Star size={18} className="fill-white text-white" />
                Rate Us
              </a>
            </div>
          </motion.div>

          {/* ── Right: Map ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="lg:col-span-3 space-y-4"
          >
            <div className="rounded-3xl overflow-hidden shadow-xl border border-border/60" style={{ height: "520px" }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3720.634!2d72.866!3d21.1959!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04fb9c46875c5%3A0x7c6e3af9e49fe9c2!2sAmizara%20Residency%2C%20Bamroli%2C%20Surat%2C%20Gujarat%20394010!5e0!3m2!1sen!2sin!4v1714045589000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, display: "block" }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="HP Mehendi Art Location"
              />
            </div>

            {/* Directions button */}
            <a
              href="https://maps.app.goo.gl/LfBB5iUfNmjKqUby5"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground rounded-2xl py-4 font-semibold shadow-md hover:bg-primary/90 hover:shadow-lg transition-all"
            >
              <MapPin size={18} />
              Get Directions on Google Maps
            </a>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
