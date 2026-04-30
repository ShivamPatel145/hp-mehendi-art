"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { generateWhatsAppLink } from "@/lib/utils";
import { type Service } from "@/lib/data";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function ServicesClient({ services }: { services: Service[] }) {
  return (
    <div className="min-h-screen bg-background py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-20 mt-8">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-5xl md:text-6xl font-bold text-foreground mb-6"
          >
            Our Services
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            We offer a variety of Mehendi services tailored to your needs. From heavy bridal designs to minimalist modern art, we ensure perfection in every stroke.
          </motion.p>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service) => (
            <motion.div key={service.slug} variants={item} className="h-full">
              <div className="h-full flex flex-col rounded-2xl overflow-hidden border border-accent/20 hover:border-accent/50 bg-white hover:shadow-2xl transition-all duration-500 group">
                
                {/* Image */}
                <div className="relative w-full h-56 flex-shrink-0 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-6">
                    <h3 className="font-heading text-2xl md:text-3xl text-white font-bold tracking-wide drop-shadow-md">
                      {service.title}
                    </h3>
                    <div className="text-accent font-bold text-lg mt-1 drop-shadow-sm">
                      {service.price}
                    </div>
                  </div>
                </div>

                {/* Body */}
                <div className="flex flex-col flex-grow px-6 pt-6 pb-8">
                  <p className="text-base text-muted-foreground leading-relaxed text-center flex-grow">
                    {service.description}
                  </p>
                  <div className="mt-6 flex justify-center">
                    <a
                      href={generateWhatsAppLink(`Hi! I'm interested in booking the ${service.title} package.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 py-2.5 font-medium text-sm transition-colors text-center"
                    >
                      Book this Package
                    </a>
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </div>
  );
}
