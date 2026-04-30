export const categories = ["All", "Bridal", "Traditional", "Arabic", "Baby Shower", "Western"];

export type Service = {
  _id: string;
  slug: string;
  title: string;
  description: string;
  price: string;
  image: string;
  order: number;
};

export const DEFAULT_SERVICES: Omit<Service, "_id">[] = [
  { slug: "bridal", title: "Bridal Mehndi", description: "Intricate, full-length designs for the bride's special day. Includes arms, full hands, and feet with customized motifs.", price: "From ₹5,100", image: "/images/bridal_service.png", order: 1 },
  { slug: "traditional", title: "Traditional Mehndi", description: "Classic Indian and Rajasthani patterns featuring peacocks, paisleys, and floral elements.", price: "From ₹1,100", image: "/images/traditional_service.png", order: 2 },
  { slug: "arabic", title: "Arabic Mehndi", description: "Bold, elegant, and flowing floral and vine designs that leave spaces for a striking contrast.", price: "From ₹800", image: "/images/4.jpeg", order: 3 },
  { slug: "ring-ceremony", title: "Ring Ceremony", description: "Beautiful, semi-heavy designs perfect for engagements and ring ceremonies.", price: "From ₹2,100", image: "/images/10.jpeg", order: 4 },
  { slug: "baby-shower", title: "Baby Shower", description: "Specialized delicate designs celebrating motherhood, including belly art and light hand designs.", price: "From ₹1,500", image: "/images/baby_shower_service.png", order: 5 },
  { slug: "western", title: "Western / Modern", description: "Minimalist, geometric, and contemporary henna tattoos for modern aesthetics.", price: "From ₹500", image: "/images/western_service.png", order: 6 },
];
