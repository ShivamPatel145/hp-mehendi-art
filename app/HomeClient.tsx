"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { generateWhatsAppLink } from "@/lib/utils";
import { CloudinaryImage } from "@/lib/cloudinary";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

export default function HomeClient({ images }: { images: CloudinaryImage[] }) {
  const featuredImages = images.slice(0, 3); // Grab the first 3 images

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] sm:min-h-[85vh] flex items-center justify-center overflow-hidden pt-10">
        {/* Hero Background Image */}
        <div className="absolute inset-0 z-0 bg-[#2C1810]">
          <Image 
            src="/images/13.jpeg"
            alt="Mehndi Background"
            fill
            className="object-cover object-top opacity-30 sm:opacity-40"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background z-10" />
        </div>
        
        <div className="relative z-20 text-center px-4 sm:px-6 w-full max-w-4xl mx-auto space-y-8 md:space-y-10 pt-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-6 md:mb-8"
          >
            <div className="mx-auto mb-6 md:mb-8 flex justify-center">
              <Image src="/hp_logo.png" alt="HP Mehendi Art" width={1000} height={530} className="h-24 sm:h-28 md:h-36 w-auto object-contain mix-blend-multiply" priority />
            </div>
            <div className="inline-block mb-4 md:mb-6">
              <span className="text-sm sm:text-base md:text-xl text-accent font-medium tracking-[0.3em] uppercase bg-background/50 backdrop-blur-sm px-6 py-2 rounded-full border border-accent/20">
                Henna Artist by Himani Patel
              </span>
            </div>
            <h1 className="font-heading text-5xl sm:text-6xl md:text-8xl font-bold text-foreground leading-[1.1] drop-shadow-sm">
              Elegant Mehndi <br/>
              <span className="text-primary italic font-light">for every occasion</span>
            </h1>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-base sm:text-lg md:text-2xl text-foreground/80 max-w-2xl mx-auto px-4 font-medium"
          >
            Specializing in luxury Bridal, Baby Shower, Traditional, and Arabic Mehndi. 
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 pb-6 md:pt-14 w-full px-6"
          >
            <Button render={<a href={generateWhatsAppLink("Hi Himani! I'm interested in booking a Mehndi session.")} target="_blank" rel="noopener noreferrer" />} size="lg" className="bg-primary text-primary-foreground rounded-full px-8 py-7 md:py-8 text-lg w-full sm:w-auto shadow-[0_8px_30px_rgb(107,142,35,0.3)]">
              Book on WhatsApp
            </Button>
            <Button nativeButton={false} render={<Link href="/gallery" />} variant="outline" size="lg" className="rounded-full px-8 py-7 md:py-8 text-lg w-full sm:w-auto border-accent text-foreground hover:bg-accent hover:text-accent-foreground transition-all bg-background/80 backdrop-blur-md shadow-sm">
              View Gallery
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Featured Work */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInUp}
            className="text-center mb-10 md:mb-16"
          >
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">Featured Work</h2>
            <div className="flex items-center justify-center gap-4">
              <div className="h-px w-8 md:w-12 bg-gradient-to-r from-transparent to-accent"></div>
              <span className="text-accent text-sm md:text-base">✧</span>
              <div className="h-px w-8 md:w-12 bg-gradient-to-l from-transparent to-accent"></div>
            </div>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8"
          >
            {featuredImages.map((img) => (
              <motion.div key={img.id} variants={fadeInUp} className="group relative overflow-hidden rounded-2xl shadow-md cursor-pointer sm:last:hidden md:last:block">
                <Image 
                  src={img.src} 
                  alt={img.alt} 
                  width={600}
                  height={750}
                  className="w-full h-auto aspect-[4/5] object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <span className="text-white font-medium text-lg tracking-wide">{img.category}</span>
                </div>
              </motion.div>
            ))}
            
            {featuredImages.length === 0 && (
              <div className="col-span-3 text-center text-muted-foreground py-10">
                Gallery images will appear here once uploaded via the admin dashboard.
              </div>
            )}
          </motion.div>
          
          <div className="text-center mt-10 md:mt-12">
            <Button nativeButton={false} render={<Link href="/gallery" />} variant="ghost" className="text-primary hover:text-primary/80 text-base md:text-lg group">
              See more in Gallery <span className="inline-block transition-transform group-hover:translate-x-1 ml-2">→</span>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-16 md:py-24 bg-secondary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInUp}
            className="text-center mb-10 md:mb-16"
          >
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">Our Services</h2>
            <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto px-2">Tailored henna experiences for your most cherished moments.</p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
          >
            {[
              { title: 'Bridal Mehndi', desc: 'Intricate & full-length luxury designs.', img: '/images/bridal_service.png' },
              { title: 'Traditional Mehndi', desc: 'Classic Rajasthani & Indian patterns.', img: '/images/traditional_service.png' },
              { title: 'Baby Shower', desc: 'Delicate designs celebrating motherhood.', img: '/images/baby_shower_service.png' },
              { title: 'Engagement Mehndi', desc: 'Elegant semi-heavy designs for your special moment.', img: '/images/10.jpeg' }
            ].map((service, idx) => (
              <motion.div key={idx} variants={fadeInUp}>
                <Card className="p-0 gap-0 h-full border-accent/20 hover:border-accent/60 hover:shadow-xl transition-all duration-500 bg-background group overflow-hidden">
                  <div className="relative w-full h-56 sm:h-64 overflow-hidden shrink-0">
                    <Image 
                      src={service.img} 
                      alt={service.title} 
                      fill 
                      className="object-cover transition-transform duration-700 group-hover:scale-110" 
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
                  </div>
                  <CardContent className="p-6 md:p-8 text-center flex flex-col items-center justify-center relative -mt-8 bg-background z-10 rounded-t-[2rem]">
                    <h3 className="font-heading text-2xl font-bold text-foreground mb-3">{service.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{service.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-40 relative overflow-hidden flex items-center justify-center text-center rounded-t-3xl sm:rounded-t-[4rem] bg-[#2C1810]">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/cta_background.png" 
            alt="Luxurious Mehndi" 
            fill 
            className="object-cover opacity-40 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2C1810] via-[#2C1810]/80 to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="bg-[#2C1810]/40 backdrop-blur-md border border-[#FAF7F2]/10 p-8 md:p-16 rounded-3xl shadow-2xl"
          >
            <h2 className="font-heading text-4xl sm:text-5xl md:text-7xl font-bold mb-6 text-accent drop-shadow-md">
              Ready for your <br className="hidden sm:block"/> Special Day?
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-[#FAF7F2]/90 mb-10 max-w-2xl mx-auto font-medium">
              Let&apos;s create beautiful henna art together. Dates fill up quickly during the wedding season.
            </p>
            <Button render={<a href={generateWhatsAppLink("Hi! I would like to check availability and book a Mehndi session.")} target="_blank" rel="noopener noreferrer" />} size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-10 py-7 md:py-8 text-lg md:text-xl shadow-[0_8px_30px_rgb(107,142,35,0.1)] transition-all transform w-full sm:w-auto border-none">
              Inquire & Book Now
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
