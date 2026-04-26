export const categories = ["All", "Bridal", "Traditional", "Arabic", "Baby Shower", "Western"];

const rawImages = Array.from({ length: 25 }, (_, i) => `${i + 1}.jpeg`);

// Assigning arbitrary categories based on index for variety
export const galleryImages = rawImages.map((filename, i) => {
  let cat = categories[1]; // default Bridal
  if (i % 5 === 0) cat = "Traditional";
  else if (i % 4 === 0) cat = "Arabic";
  else if (i % 3 === 0) cat = "Bridal";
  else if (i % 7 === 0) cat = "Baby Shower";
  else if (i % 8 === 0) cat = "Western";

  return {
    id: i,
    src: `/images/${filename}`,
    category: cat,
    alt: `Mehndi Design ${i + 1}`
  };
});
