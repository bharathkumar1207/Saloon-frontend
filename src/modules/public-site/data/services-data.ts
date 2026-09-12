import categoryMensHair from "../../../assets/stock/category-mens-hair.jpg";
import categoryWomensHair from "../../../assets/stock/category-womens-hair.jpg";
import categoryHairColour from "../../../assets/stock/category-hair-colour.jpg";
import categorySkinCare from "../../../assets/stock/category-skin-care.jpg";
import categoryNails from "../../../assets/stock/category-nails.jpg";
import categoryMakeup from "../../../assets/stock/category-makeup.jpg";
import categorySpa from "../../../assets/stock/category-spa.jpg";

export type ServiceItem = {
  name: string;
  price: string;
  description?: string;
};

export type ServiceCategory = {
  id: string;
  name: string;
  image?: string;
  items: ServiceItem[];
};

export const serviceCategories: ServiceCategory[] = [
  {
    id: "mens-hair",
    name: "Men's Hair & Grooming",
    image: categoryMensHair,
    items: [
      { name: "Haircut – Basic", price: "₹299" },
      { name: "Haircut – Premium Styling", price: "₹399" },
      { name: "Kids Haircut (Below 10 yrs)", price: "₹199" },
      { name: "Hair Wash + Blow Dry", price: "₹199" },
      { name: "Head Massage – 15 min", price: "₹149" },
      { name: "Head Massage – 30 min", price: "₹249" },
      { name: "Beard Trim", price: "₹149" },
      { name: "Beard Styling / Design", price: "₹199" },
      { name: "Clean Shave", price: "₹149" },
      { name: "Premium Shave", price: "₹199" },
      { name: "Haircut + Beard Trim", price: "₹399" },
      { name: "Haircut + Beard + Head Massage", price: "₹549" },
      { name: "Grey Coverage – Men", price: "₹599" },
      { name: "Hair Spa – Basic", price: "₹699" },
      { name: "Hair Spa – Premium", price: "₹999" },
    ],
  },
  {
    id: "womens-hair",
    name: "Women's Hair",
    image: categoryWomensHair,
    items: [
      { name: "Haircut – Basic", price: "₹399" },
      { name: "Haircut – Layer / U / V", price: "₹499" },
      { name: "Haircut – Advanced / Creative", price: "₹699" },
      { name: "Kids Haircut", price: "₹299" },
      { name: "Hair Wash + Blow Dry – Short", price: "₹299" },
      { name: "Hair Wash + Blow Dry – Medium", price: "₹399" },
      { name: "Hair Wash + Blow Dry – Long", price: "₹499" },
      { name: "Blow Dry – Short", price: "₹399" },
      { name: "Blow Dry – Medium", price: "₹499" },
      { name: "Blow Dry – Long", price: "₹599" },
      { name: "Ironing – Short", price: "₹699" },
      { name: "Ironing – Medium", price: "₹899" },
      { name: "Ironing – Long", price: "₹1,099" },
      { name: "Tonging / Curls – Short", price: "₹799" },
      { name: "Tonging / Curls – Medium", price: "₹999" },
      { name: "Tonging / Curls – Long", price: "₹1,299" },
      { name: "Hair Spa – Basic", price: "₹799" },
      { name: "Hair Spa – Premium", price: "₹1,199" },
      { name: "Scalp Detox / Anti-Dandruff Spa", price: "₹1,299" },
    ],
  },
  {
    id: "hair-colour",
    name: "Hair Colour & Chemical Services",
    image: categoryHairColour,
    items: [
      { name: "Global Colour – Men", price: "₹999+" },
      { name: "Global Colour – Women (Short)", price: "₹1,499+" },
      { name: "Global Colour – Women (Medium)", price: "₹1,999+" },
      { name: "Global Colour – Women (Long)", price: "₹2,499+" },
      { name: "Root Touch-Up", price: "₹799+" },
      { name: "Fashion / Creative Colour", price: "₹1,499+" },
      { name: "Highlights – Half Head", price: "₹1,999+" },
      { name: "Highlights – Full Head", price: "₹2,999+" },
      { name: "Balayage / Ombre", price: "₹3,499+" },
      { name: "Keratin – Men", price: "₹2,999+" },
      { name: "Keratin – Women", price: "₹4,999+" },
      { name: "Smoothening – Men", price: "₹2,999+" },
      { name: "Smoothening – Women", price: "₹4,999+" },
      { name: "Straightening – Women", price: "₹5,999+" },
      { name: "Hair Botox – Men", price: "₹3,999+" },
      { name: "Hair Botox – Women", price: "₹5,999+" },
      { name: "Cysteine Treatment", price: "₹4,999+" },
      { name: "Nanoplastia", price: "₹6,999+" },
    ],
  },
  {
    id: "skin-care",
    name: "Skin Care & Facials",
    image: categorySkinCare,
    items: [
      { name: "Eyebrow Threading", price: "₹49" },
      { name: "Upper Lip Threading", price: "₹49" },
      { name: "Chin Threading", price: "₹59" },
      { name: "Forehead Threading", price: "₹59" },
      { name: "Sidelocks", price: "₹79" },
      { name: "Full Face Threading", price: "₹299" },
      { name: "Basic Cleanup", price: "₹499" },
      { name: "Deep Cleansing Cleanup", price: "₹699" },
      { name: "D-Tan Cleanup", price: "₹799" },
      { name: "D-Tan Facial", price: "₹999" },
      { name: "Glow Facial", price: "₹1,199" },
      { name: "O3+ / Professional Facial", price: "₹1,499+" },
      { name: "Acne / Pimple Care Facial", price: "₹1,499+" },
      { name: "De-Tan – Face & Neck", price: "₹399" },
      { name: "De-Tan – Full Arms", price: "₹599" },
      { name: "De-Tan – Full Legs", price: "₹799" },
      { name: "De-Tan – Full Back", price: "₹799" },
      { name: "Skin Polish – Face", price: "₹999+" },
      { name: "Hydra / Advanced Facial", price: "₹2,499+" },
      { name: "Bridal / Luxury Facial", price: "₹2,999+" },
    ],
  },
  {
    id: "waxing",
    name: "Waxing",
    items: [
      { name: "Upper Lip", price: "₹79" },
      { name: "Chin", price: "₹99" },
      { name: "Full Face", price: "₹399" },
      { name: "Underarms", price: "₹249" },
      { name: "Half Arms", price: "₹299" },
      { name: "Full Arms", price: "₹449" },
      { name: "Half Legs", price: "₹399" },
      { name: "Full Legs", price: "₹599" },
      { name: "Back", price: "₹599" },
      { name: "Chest – Men", price: "₹599" },
      { name: "Stomach – Men", price: "₹599" },
      { name: "Full Body – Regular", price: "₹1,499+" },
      { name: "Full Body – Rica / Premium", price: "₹2,499+" },
      { name: "Bikini Line", price: "₹499+" },
      { name: "Brazilian Wax", price: "₹1,999+" },
    ],
  },
  {
    id: "nails",
    name: "Manicure, Pedicure & Nails",
    image: categoryNails,
    items: [
      { name: "Basic Manicure", price: "₹399" },
      { name: "Spa Manicure", price: "₹599" },
      { name: "Premium Manicure", price: "₹799" },
      { name: "Basic Pedicure", price: "₹499" },
      { name: "Spa Pedicure", price: "₹699" },
      { name: "Premium Pedicure", price: "₹899" },
      { name: "Cut + File + Polish", price: "₹299" },
      { name: "Gel Polish – Hands", price: "₹699+" },
      { name: "Gel Polish – Toes", price: "₹799+" },
      { name: "Gel Removal", price: "₹299" },
      { name: "Nail Art – Per Nail", price: "₹49+" },
      { name: "Acrylic / Extension – Full Set", price: "₹1,499+" },
    ],
  },
  {
    id: "makeup",
    name: "Makeup, Bridal & Occasion",
    image: categoryMakeup,
    items: [
      { name: "Party Makeup", price: "₹1,999+" },
      { name: "HD Party Makeup", price: "₹2,999+" },
      { name: "Engagement Makeup", price: "₹4,999+" },
      { name: "HD Engagement Makeup", price: "₹6,999+" },
      { name: "Bridal Makeup", price: "₹8,999+" },
      { name: "HD / Airbrush Bridal", price: "₹12,999+" },
      { name: "Bridal Hair Styling", price: "₹1,499+" },
      { name: "Saree / Draping", price: "₹699+" },
      { name: "Basic Mehendi", price: "₹299+" },
      { name: "Bridal Mehendi", price: "₹2,999+" },
    ],
  },
  {
    id: "spa",
    name: "Spa & Relaxation",
    image: categorySpa,
    items: [
      { name: "Head Massage – 30 min", price: "₹249" },
      { name: "Head Massage + Wash", price: "₹399" },
      { name: "Foot Massage – 30 min", price: "₹399" },
      { name: "Back Massage – 30 min", price: "₹699" },
      { name: "Body Massage – 60 min", price: "₹1,499+" },
      { name: "Body Scrub / Polish", price: "₹1,499+" },
      { name: "Back Polish", price: "₹999+" },
      { name: "Full Body Polish", price: "₹2,499+" },
    ],
  },
  {
    id: "combos",
    name: "Signature Combos",
    items: [
      {
        name: "The Gent's Essential",
        price: "₹699",
        description: "Haircut + Beard Trim + Head Massage",
      },
      {
        name: "The Gent's Premium",
        price: "₹1,199",
        description: "Premium Haircut + Beard Design + Hair Spa",
      },
      {
        name: "Ladies' Glow Combo",
        price: "₹899",
        description: "Haircut + Eyebrow + Upper Lip + Basic Cleanup",
      },
      {
        name: "Ladies' Spa Combo",
        price: "₹1,999",
        description: "Hair Spa + Spa Manicure + Spa Pedicure",
      },
      { name: "Glow & Go", price: "₹699", description: "D-Tan Cleanup + Eyebrow + Upper Lip" },
      {
        name: "Bridal Prep",
        price: "₹3,999+",
        description: "Facial + Manicure + Pedicure + Hair Spa",
      },
    ],
  },
];
