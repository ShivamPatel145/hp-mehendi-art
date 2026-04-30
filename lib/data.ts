export const categories = ["All", "Bridal", "Traditional", "Baby Shower", "Engagement"];

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
  { slug: "baby-shower", title: "Baby Shower", description: "Specialized delicate designs celebrating motherhood, including belly art and light hand designs.", price: "From ₹1,500", image: "/images/baby_shower_service.png", order: 3 },
  { slug: "engagement", title: "Engagement Mehndi", description: "Beautiful, semi-heavy designs crafted to complement your engagement look — elegant patterns for your special moment.", price: "From ₹2,100", image: "/images/10.jpeg", order: 4 },
];
