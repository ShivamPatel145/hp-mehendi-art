"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import { generateWhatsAppLink } from "@/lib/utils";

const services = [
  {
    title: "Bridal Mehndi",
    description: "Intricate, full-length designs for the bride's special day. Includes arms, full hands, and feet with customized motifs.",
    price: "From ₹5,100",
    image: "/images/bridal_service.png"
  },
  {
    title: "Traditional Mehndi",
    description: "Classic Indian and Rajasthani patterns featuring peacocks, paisleys, and floral elements.",
    price: "From ₹1,100",
    image: "/images/traditional_service.png"
  },
  {
    title: "Arabic Mehndi",
    description: "Bold, elegant, and flowing floral and vine designs that leave spaces for a striking contrast.",
    price: "From ₹800",
    image: "/images/4.jpeg"
  },
  {
    title: "Ring Ceremony",
    description: "Beautiful, semi-heavy designs perfect for engagements and ring ceremonies.",
    price: "From ₹2,100",
    image: "/images/10.jpeg"
  },
  {
    title: "Baby Shower",
    description: "Specialized delicate designs celebrating motherhood, including belly art and light hand designs.",
    price: "From ₹1,500",
    image: "/images/baby_shower_service.png"
  },
  {
    title: "Western / Modern",
    description: "Minimalist, geometric, and contemporary henna tattoos for modern aesthetics.",
    price: "From ₹500",
    image: "/images/western_service.png"
  }
];

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function ServicesPage() {
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
          {services.map((service, idx) => (
            <motion.div key={idx} variants={item}>
              <Card className="h-full flex flex-col hover:shadow-2xl transition-all duration-500 border-accent/20 hover:border-accent/50 bg-white overflow-hidden rounded-2xl group !p-0 !gap-0">
                <CardHeader className="p-0 border-b border-accent/10">
                  <div className="relative w-full h-56 overflow-hidden">
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
                </CardHeader>
                <CardContent className="flex-grow text-center pt-8 px-6 pb-2">
                  <CardDescription className="text-base text-muted-foreground leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardContent>
                <CardFooter className="pt-4 pb-8 flex justify-center">
                  <Button render={<a href={generateWhatsAppLink(`Hi! I'm interested in booking the ${service.title} package.`)} target="_blank" rel="noopener noreferrer" />} className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full w-full max-w-[200px]">
                    Book this Package
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </div>
  );
}
