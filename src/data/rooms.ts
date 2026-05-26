export interface Room {
  id: string;
  name: string;
  nepaliName: string;
  type: string;
  pricePerNight: number;
  currency: string;
  description: string;
  features: string[];
  amenities: { icon: string; label: string }[];
  capacity: number;
  size: string;
  image: string;
  gradient: string;
  badge?: string;
}

export const rooms: Room[] = [
  {
    id: "deluxe",
    name: "Deluxe Room",
    nepaliName: "डिलक्स कोठा",
    type: "Standard Premium",
    pricePerNight: 4500,
    currency: "NPR",
    description:
      "A serene retreat with modern comforts and garden views. Thoughtfully designed with local artisan furnishings and soft eco-cotton linens.",
    features: ["Garden View", "King Bed", "Private Bathroom", "WiFi"],
    amenities: [
      { icon: "🛏", label: "King Bed" },
      { icon: "🚿", label: "Hot Shower" },
      { icon: "📶", label: "Free WiFi" },
      { icon: "🍵", label: "Tea & Coffee" },
      { icon: "🌿", label: "Garden View" },
      { icon: "❄️", label: "Fan/AC" },
    ],
    capacity: 2,
    size: "220 sq ft",
    image: "/images/rooms/deluxe.jpg",
    gradient: "from-forest/80 to-dark/90",
    badge: "Most Popular",
  },
  {
    id: "family",
    name: "Family Room",
    nepaliName: "पारिवारिक कोठा",
    type: "Family Suite",
    pricePerNight: 7500,
    currency: "NPR",
    description:
      "Spacious and warm, designed for families. Two sleeping areas, a cozy sitting nook, and views of the forested hillside.",
    features: ["Hill View", "2 Beds", "Family Bath", "Sitting Area"],
    amenities: [
      { icon: "🛏", label: "2 Beds" },
      { icon: "🛁", label: "Bathtub" },
      { icon: "📶", label: "Free WiFi" },
      { icon: "🍽️", label: "Mini Kitchenette" },
      { icon: "🏔️", label: "Hill View" },
      { icon: "👨‍👩‍👧‍👦", label: "Up to 4 guests" },
    ],
    capacity: 4,
    size: "380 sq ft",
    image: "/images/rooms/family.jpg",
    gradient: "from-leaf/70 to-dark/90",
  },
  {
    id: "traditional",
    name: "Traditional Nepali Room",
    nepaliName: "नेपाली परम्परागत कोठा",
    type: "Cultural Heritage",
    pricePerNight: 5500,
    currency: "NPR",
    description:
      "Immerse yourself in authentic Nepali culture. Hand-carved wooden furniture, dhaka fabric accents, and Palpali dhaka art throughout.",
    features: ["Courtyard View", "Traditional Decor", "Cultural Experience"],
    amenities: [
      { icon: "🎨", label: "Dhaka Decor" },
      { icon: "🪵", label: "Hand-Carved Wood" },
      { icon: "🪔", label: "Clay Lamp" },
      { icon: "🍵", label: "Herbal Tea" },
      { icon: "📶", label: "Free WiFi" },
      { icon: "🧘", label: "Yoga Corner" },
    ],
    capacity: 2,
    size: "260 sq ft",
    image: "/images/rooms/traditional.jpg",
    gradient: "from-beige/90 to-dark/85",
    badge: "Unique Experience",
  },
  {
    id: "mountain-view",
    name: "Balcony Mountain View",
    nepaliName: "बालकनी माउन्टेन व्यू",
    type: "Premium Suite",
    pricePerNight: 8500,
    currency: "NPR",
    description:
      "Our signature suite. A private balcony opens to a breathtaking panorama of Palpa's misty mountain ranges. Perfect for sunrise watching.",
    features: ["Mountain Panorama", "Private Balcony", "Luxury Bath", "Suite"],
    amenities: [
      { icon: "🏔️", label: "Mountain Panorama" },
      { icon: "🌅", label: "Sunrise View" },
      { icon: "🛁", label: "Luxury Bathtub" },
      { icon: "☕", label: "Balcony Breakfast" },
      { icon: "📶", label: "High-Speed WiFi" },
      { icon: "🌿", label: "Eco Amenities" },
    ],
    capacity: 2,
    size: "320 sq ft",
    image: "/images/rooms/mountain-view.jpg",
    gradient: "from-forest/70 to-forest/90",
    badge: "Best Views",
  },
];
