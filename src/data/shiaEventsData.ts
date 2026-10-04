export interface ShiaVenue {
  id: string;
  name: string;
  arabicName: string;
  category: 'Mosque & Centre' | 'Imambargah & Azakhana' | 'Banquet & Community Hall';
  city: string;
  state: string;
  address: string;
  capacity: number;
  image: string;
  facilities: string[];
  recommendedFor: string[];
  suggestedDonation: string; // in INR ₹
  imamOrTrustee: string;
  contactPhone: string;
  description: string;
  hasNikahLicense: boolean;
  hasTabarrukKitchen: boolean;
  hasSeparateHalls: boolean;
}

export interface ShiaEventType {
  id: string;
  title: string;
  urduTitle: string;
  category: 'Celebration' | 'Commemoration' | 'Family & Social';
  description: string;
  typicalDuration: string;
  recommendedServices: string[];
  icon: string;
}

export const SHIA_EVENT_TYPES: ShiaEventType[] = [
  {
    id: 'nikah_shadi',
    title: 'Nikah & Shadi Reception',
    urduTitle: 'عقدِ نکاح و ولیمہ',
    category: 'Celebration',
    description: 'Solemn Islamic marriage contract recitation by an authorized Shia Alim/Maulana, followed by Walima banquet, stage photography, and family reception.',
    typicalDuration: '4 — 6 Hours',
    recommendedServices: ['Authorized Shia Alim for Nikah Khutbah', 'Stage Floral Decoration & Seating', 'Separate Gents/Ladies Partition Halls', 'Halal Banquet Catering & Service', 'Audio-Visual Recording & Live Relay'],
    icon: 'HeartHandshake'
  },
  {
    id: 'mehfil_jashan',
    title: 'Mehfil-e-Jashan & Milad',
    urduTitle: 'محفلِ جشن و ولادت',
    category: 'Celebration',
    description: 'Festive congregational assembly celebrating the 14 Infallibles (A.S.), Wiladat anniversaries, Eid-e-Ghadeer, Manqabat recitations, and Shirini (sweets) distribution.',
    typicalDuration: '3 — 4 Hours',
    recommendedServices: ['Traditional Minbar & Acoustic Sound Setup', 'Manqabat Khawan Microphone Relay', 'Festive Illumination & Banners', 'Tabarruk & Shirini Distribution Counters'],
    icon: 'Sparkles'
  },
  {
    id: 'majlis_aza',
    title: 'Majlis-e-Aza & Commemoration',
    urduTitle: 'مجلسِ عزا و ایامِ ماتم',
    category: 'Commemoration',
    description: 'Solemn assembly for Ayyam-e-Aza (Muharram & Safar), Ayyam-e-Fatimiyya, or martyrdom anniversaries. Features Soz-o-Salam, scholarly discourse from Minbar, and Matam.',
    typicalDuration: '3 — 5 Hours',
    recommendedServices: ['Traditional Carved Wooden Minbar', 'Black Cloth Drapery & Calligraphic Banners', 'High-Grade Sound System with Delay Speakers', 'Commercial Kitchen for Niaz/Tabarruk Deg Cooking', 'Separate Ladies Enclosure'],
    icon: 'Flame'
  },
  {
    id: 'khatam_fatiha',
    title: 'Khatam-e-Quran / Soyem / Fatiha',
    urduTitle: 'ختمِ قرآن و فاتحہ خوانی',
    category: 'Commemoration',
    description: 'Memorial assembly, collective Tilawat of the Holy Quran, Dua-e-Kumayl & Dua-e-Tawassul recitations, and Isaal-e-Sawab for departed community elders.',
    typicalDuration: '2 — 3 Hours',
    recommendedServices: ['Quran 30 Siparah Sets', 'Dua-e-Kumayl Booklets', 'Audio Microphone Setup', 'Chai & Tabarruk Refreshment Counter'],
    icon: 'BookOpen'
  },
  {
    id: 'halal_banquet',
    title: 'Family Banquet / Aqiqa / Bismillah',
    urduTitle: 'دعوتِ عقیقہ و بسم اللہ',
    category: 'Family & Social',
    description: 'Celebratory community feasts, Aqiqa banquets for newborns, Bismillah celebrations, youth academic honors, or community health & blood donation drives.',
    typicalDuration: '3 — 5 Hours',
    recommendedServices: ['Round Dining Tables & Chair Setup', 'Commercial Halal Catering Kitchen Access', 'Projector & Sound System', 'Family & Children Seating Arrangements'],
    icon: 'Users'
  }
];

export const SHIA_VENUES: ShiaVenue[] = [
  {
    id: 'venue-bada-imambara-lucknow',
    name: 'Bada Imambara & Asfi Mosque Complex',
    arabicName: 'بڑا امام باڑہ و جامع مسجد آصفی',
    category: 'Mosque & Centre',
    city: 'Lucknow',
    state: 'Uttar Pradesh',
    address: 'Machchhi Bhavan, Husainabad, Lucknow, Uttar Pradesh 226003',
    capacity: 2500,
    image: '/src/assets/images/bada_imambara_lucknow_1791105419028.jpg',
    facilities: [
      'Historic Asfi Central Congregational Mosque',
      'Massive Vaulted Central Assembly Hall (No pillars)',
      'Spacious Grand Courtyard for Large Gatherings',
      'Traditional Minbar & Acoustic Sound Amplification',
      'Dedicated Tabarruk & Niaz Cauldron (Deg) Kitchen Area'
    ],
    recommendedFor: ['Majlis-e-Aza', 'Mehfil-e-Jashan', 'Eid-e-Ghadeer Assembly', 'Khatam-e-Quran'],
    suggestedDonation: '₹15,000 — ₹45,000 per session',
    imamOrTrustee: 'Hussainabad Allied Trust & Resident Maulana',
    contactPhone: '+91 522 225 6100',
    description: 'Built in 1784 by Nawab Asaf-ud-Daula, the iconic Bada Imambara is India\'s foremost Shia monument, featuring the grand Asfi Mosque, unparalleled arched architecture, and expansive grounds for monumental community gatherings.',
    hasNikahLicense: true,
    hasTabarrukKitchen: true,
    hasSeparateHalls: true
  },
  {
    id: 'venue-chhota-imambara-lucknow',
    name: 'Chhota Imambara (Husainabad Imambara)',
    arabicName: 'چھوٹا امام باڑہ (حسین آباد)',
    category: 'Imambargah & Azakhana',
    city: 'Lucknow',
    state: 'Uttar Pradesh',
    address: 'Husainabad, Daulatganj, Lucknow, Uttar Pradesh 226003',
    capacity: 1200,
    image: '/src/assets/images/chhota_imambara_lucknow_1791105435047.jpg',
    facilities: [
      'Historic Hall of Chandeliers (Zarih & Azakhana)',
      'Reflecting Pool & Illuminated Courtyard Gardens',
      'Ornate Gold Dome & Arabic Calligraphic Paneling',
      'Separate Enclosures for Gents & Ladies',
      'Tabarruk Distribution Counters'
    ],
    recommendedFor: ['Nikah & Shadi', 'Mehfil-e-Jashan', 'Majlis-e-Aza', 'Milad Commemoration'],
    suggestedDonation: '₹12,000 — ₹35,000 per session',
    imamOrTrustee: 'Maulana Yasoob Abbas / Husainabad Trust',
    contactPhone: '+91 522 225 8420',
    description: 'Built by Nawab Muhammad Ali Shah in 1838, the Chhota Imambara is famous for its breathtaking Belgian chandeliers, golden dome, and ornate calligraphy. A premier venue for dignified Nikah ceremonies and sacred Mehfils.',
    hasNikahLicense: true,
    hasTabarrukKitchen: true,
    hasSeparateHalls: true
  },
  {
    id: 'venue-mughal-masjid-mumbai',
    name: 'Mughal Masjid (Masjid-e-Irani)',
    arabicName: 'مسجد مغل (مسجد ایرانی) ممبئی',
    category: 'Mosque & Centre',
    city: 'Mumbai',
    state: 'Maharashtra',
    address: 'Imamwada Road, Bhendi Bazaar / Dongri, Mumbai, Maharashtra 400009',
    capacity: 1000,
    image: '/src/assets/images/mughal_masjid_mumbai_1791105448700.jpg',
    facilities: [
      'Authentic Blue & Turquoise Persian Mosaic Tilework',
      'Spacious Open-Air Marble Courtyard with Fountain',
      'Authorized Shia Nikah Registration & Certificate Office',
      'Dual-Level Carpeted Prayer & Assembly Halls',
      'Sound Relay System & Dedicated Minbar'
    ],
    recommendedFor: ['Nikah & Shadi', 'Majlis-e-Aza', 'Dua-e-Kumayl & Khatam', 'Mehfil-e-Jashan'],
    suggestedDonation: '₹10,000 — ₹30,000 per session',
    imamOrTrustee: 'Haji Mohammad Husain Shirazi Trust & Maulana Faiyaz',
    contactPhone: '+91 22 2372 9400',
    description: 'Built in 1860, this historic Iranian mosque in South Mumbai is celebrated for its breathtaking Persian tilework and vibrant spiritual life. The foremost center in Mumbai for Nikah ceremonies, Friday prayers, and central Majalis.',
    hasNikahLicense: true,
    hasTabarrukKitchen: true,
    hasSeparateHalls: true
  },
  {
    id: 'venue-noor-baug-mumbai',
    name: 'Noor Baug Shia Community Banquet Hall',
    arabicName: 'قاعة نور باغ للمناسبات ممبئی',
    category: 'Banquet & Community Hall',
    city: 'Mumbai',
    state: 'Maharashtra',
    address: 'Noor Baug, Babula Tank Cross Lane, Dongri, Mumbai, Maharashtra 400009',
    capacity: 850,
    image: '/src/assets/images/noor_baug_mumbai_1791105498823.jpg',
    facilities: [
      'Air-Conditioned Grand Banquet Hall with Stage',
      'Dedicated Partition Screens for Gents and Ladies Dining',
      'Fully Equipped Commercial Halal Kitchen for Biryani Degs',
      'Bridal Dressing Suite & Groom Green Room',
      'Audio-Visual System & Projection Screens'
    ],
    recommendedFor: ['Nikah & Shadi Reception', 'Walima Feast', 'Aqiqa Celebration', 'Family Banquet'],
    suggestedDonation: '₹25,000 — ₹65,000 per session',
    imamOrTrustee: 'Noor Baug Charitable Trust Management',
    contactPhone: '+91 22 2371 4588',
    description: 'The premier community wedding and banquet reception venue for the Mumbai Shia community, located in Dongri. Purpose-built for grand Shadi celebrations, Walima feasts, and family gatherings with complete privacy partitions.',
    hasNikahLicense: true,
    hasTabarrukKitchen: true,
    hasSeparateHalls: true
  },
  {
    id: 'venue-masjid-askari-bangalore',
    name: 'Masjid-e-Askari & Shia Jama Masjid',
    arabicName: 'مسجد عسکری و جامع مسجد اہل تشیع بنگلور',
    category: 'Mosque & Centre',
    city: 'Bangalore',
    state: 'Karnataka',
    address: 'Hosur Road, Johnson Market, Richmond Town, Bengaluru, Karnataka 560025',
    capacity: 1100,
    image: '/src/assets/images/masjid_askari_bangalore_1791105466414.jpg',
    facilities: [
      'Two-Tier Grand Marble Prayer Hall',
      'Separate Women\'s Enclosure with Screen Relay',
      'Authorized Shia Marriage Registration Bureau',
      'Large Tabarruk & Niaz Dining Hall',
      'Underground & Open Parking for 100+ Vehicles'
    ],
    recommendedFor: ['Nikah & Shadi', 'Majlis-e-Aza', 'Mehfil-e-Milad', 'Soyem & Fatiha'],
    suggestedDonation: '₹12,000 — ₹32,000 per session',
    imamOrTrustee: 'Maulana Mirza Sajjad Hussain / Shia Youth Conference Trust',
    contactPhone: '+91 80 2221 3450',
    description: 'The central Shia spiritual and community complex in South India, situated in Johnson Market, Bangalore. Features impressive stone domes, an active marriage registration office, and spacious dining facilities for community banquets.',
    hasNikahLicense: true,
    hasTabarrukKitchen: true,
    hasSeparateHalls: true
  },
  {
    id: 'venue-ashurkhana-hyderabad',
    name: 'Badshahi Ashurkhana & Bibi ka Alawa',
    arabicName: 'بادشاہی عاشور خانہ و بی بی کا الاوہ حیدرآباد',
    category: 'Imambargah & Azakhana',
    city: 'Hyderabad',
    state: 'Telangana',
    address: 'Near Madina Circle, Pathergatti / Dabeerpura, Old City, Hyderabad, Telangana 500002',
    capacity: 1500,
    image: '/src/assets/images/ashurkhana_hyderabad_1791105483280.jpg',
    facilities: [
      'Historic 16th-Century Qutb Shahi Enamelled Tile Sanctuary',
      'Massive Open & Covered Ashurkhana Courtyards',
      'Traditional Alam & Zarih Mubarak Shrine Enclosure',
      'Dedicated Cauldron (Deg) Kitchen for Haleem & Niaz',
      'Historic Wooden Minbars & Relay Audio'
    ],
    recommendedFor: ['Majlis-e-Aza', 'Bibi ka Alawa Juloos Assembly', 'Khatam-e-Quran', 'Mehfil-e-Jashan'],
    suggestedDonation: '₹10,000 — ₹28,000 per session',
    imamOrTrustee: 'Mutawalli Mir Abbas Ali Moosvi / Wakf Management',
    contactPhone: '+91 40 2452 7890',
    description: 'Constructed by Sultan Muhammad Quli Qutb Shah in 1594, Badshahi Ashurkhana and nearby Bibi ka Alawa in Dabeerpura are world-renowned Shia heritage centers, featuring radiant Persian mosaic tiles, historic minbars, and centuries-old spiritual traditions.',
    hasNikahLicense: true,
    hasTabarrukKitchen: true,
    hasSeparateHalls: true
  }
];
