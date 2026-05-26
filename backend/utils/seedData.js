// Image pools — files that already live in backend/uploads/.
// Grouped by what the image actually depicts so the seeded catalog looks coherent.

const guitarImages = [
  "211477629- Gibson1.jpg",
  "246707708- Gibson1.jpg",
  "250842160- RG42.jpg",
  "257126549- RG42.jpg",
  "27466419- ST60.jpg",
  "303292132- Gibson1.jpg",
  "327305424- Gibson1.jpg",
  "396268710- RG42.jpg",
  "434240191- Gibson1.jpg",
  "50905493- Gibson1.jpg",
  "522643046- ibanez.jpeg",
  "637271282- Gibson1.jpg",
  "758648888- Guitar.jpg",
  "837698886- Guitar.jpg",
  "866627141- RG42.jpg",
  "894304339- Gibson1.jpg",
  "969102645- RG42.jpg",
  "972897338- RG42.jpg",
];

const acousticImages = [
  "153339837- manaslu.jpg",
  "72684970- manaslu.jpg",
  "758648888- Guitar.jpg",
  "837698886- Guitar.jpg",
];

const keyboardImages = [
  "417607704- yamaha.jpg",
  "596183741- keyboard.jpg",
  "652945741- yamaha.jpg",
  "655858082- keyboard.jpg",
  "720225957- yamaha.jpg",
];

const ampImages = [
  "194929081- laney2.jpg",
  "295059910- orange.jpg",
  "872657084- laney.jpg",
];

const studioImages = [
  "324940251- zoom.jpg",
  "900473360- audio.jpg",
  "761931670- Untitled.jpg",
  "797909239- WhatsApp-Image-2023-05-12-at-12.03.48-PM.jpeg",
  "946433400- WhatsApp-Image-2023-05-12-at-12.03.48-PM.jpeg",
];

const micImages = ["900473360- audio.jpg", "324940251- zoom.jpg"];

// Brands — used as a Mongo Brand collection.
const BRANDS = [
  "Fender", "Gibson", "Ibanez", "Yamaha", "Roland", "Korg", "Casio",
  "Pearl", "Tama", "Shure", "AKG", "Audio-Technica", "Behringer",
  "Marshall", "Vox", "Boss", "Zoom", "Martin", "Taylor", "Squier",
  "Epiphone", "PRS", "Gretsch", "ESP", "Schecter",
];

// Categories — used as a Mongo Category collection.
const CATEGORIES = [
  "Electric Guitars",
  "Acoustic Guitars",
  "Bass Guitars",
  "Keyboards & Pianos",
  "Drums & Percussion",
  "Amplifiers",
  "Microphones",
  "Studio Equipment",
  "Accessories",
];

// Word pools used to compose product titles + descriptions.
const adjectives = ["Classic", "Modern", "Vintage", "Premium", "Studio", "Pro", "Signature", "Deluxe", "Standard", "Artist", "Custom"];
const finishes = ["Sunburst", "Cherry Red", "Black", "White", "Natural", "Tobacco Burst", "Olympic White", "Surf Green", "Candy Apple", "Walnut", "Silver"];

// Per-category product definitions.
// Each entry: { titlePool, brandPool, priceMin, priceMax, descTemplate, images }
const CATALOG = {
  "Electric Guitars": {
    count: 28,
    brandPool: ["Fender", "Gibson", "Ibanez", "PRS", "Gretsch", "ESP", "Schecter", "Squier", "Epiphone"],
    models: [
      "Stratocaster", "Telecaster", "Les Paul Standard", "Les Paul Custom", "SG Standard",
      "RG550", "RG370", "Custom 24", "PRS Silver Sky", "Talman", "Jaguar", "Mustang",
      "ES-335", "Falcon", "Player Series", "American Pro II", "Eclipse", "Hellraiser",
    ],
    priceRange: [25000, 280000],
    images: guitarImages,
    description: (title) =>
      `The ${title} delivers exceptional playability and rich, articulate tone. ` +
      `Featuring premium tonewoods, hand-shaped neck profile, and high-output pickups, ` +
      `it's built for players who demand versatility from clean cleans to high-gain leads.`,
  },
  "Acoustic Guitars": {
    count: 22,
    brandPool: ["Martin", "Taylor", "Gibson", "Yamaha", "Fender", "Ibanez", "Epiphone"],
    models: [
      "D-28", "D-18", "000-15M", "GS Mini", "814ce", "214ce", "Hummingbird",
      "J-45", "Songwriter", "FG800", "FS820", "LL16", "AVN9", "AW54", "FA-125",
      "Travel Mahogany",
    ],
    priceRange: [15000, 220000],
    images: acousticImages,
    description: (title) =>
      `Hand-crafted with attention to every detail, the ${title} offers warm projection ` +
      `and balanced overtones. Solid top construction provides the resonance that opens up ` +
      `beautifully over years of playing.`,
  },
  "Bass Guitars": {
    count: 16,
    brandPool: ["Fender", "Ibanez", "Yamaha", "Squier", "ESP", "Gibson"],
    models: [
      "Precision Bass", "Jazz Bass", "SR300", "SR500", "TRBX304", "BB434",
      "Player Plus PJ", "Affinity Jazz", "LTD B-204", "Thunderbird",
    ],
    priceRange: [22000, 180000],
    images: guitarImages,
    description: (title) =>
      `The ${title} delivers powerful low-end punch and articulate midrange. ` +
      `Smooth-playing neck and active electronics make it equally at home in studio ` +
      `or on stage.`,
  },
  "Keyboards & Pianos": {
    count: 20,
    brandPool: ["Yamaha", "Roland", "Korg", "Casio"],
    models: [
      "P-125", "P-45", "Clavinova CLP-735", "MX49", "MODX6", "Montage 8",
      "FP-30X", "FP-90X", "Juno-DS61", "Fantom-7",
      "Kross 2-61", "Krome EX-73", "Pa700",
      "PX-S1100", "CDP-S360", "CT-X700",
    ],
    priceRange: [18000, 350000],
    images: keyboardImages,
    description: (title) =>
      `The ${title} brings concert-grade piano tone and a responsive weighted action ` +
      `to your home studio or stage. Hundreds of voices, intuitive controls, and ` +
      `solid build quality.`,
  },
  "Drums & Percussion": {
    count: 14,
    brandPool: ["Pearl", "Tama", "Yamaha", "Roland"],
    models: [
      "Roadshow 5pc", "Export 5pc", "Decade Maple", "Stage Custom Birch",
      "Imperialstar", "Superstar Classic", "TD-1K Electronic Kit", "TD-17KVX",
      "PCY155 Cymbal", "Pearl Cajon", "Yamaha Stage Custom Hip",
    ],
    priceRange: [12000, 320000],
    images: studioImages,
    description: (title) =>
      `Built for the working drummer, the ${title} kit cuts through any mix with ` +
      `punch and clarity. Includes hardware and a setup that's ready to record or ` +
      `gig out of the box.`,
  },
  Amplifiers: {
    count: 16,
    brandPool: ["Marshall", "Vox", "Fender", "Boss", "Behringer", "Yamaha"],
    models: [
      "DSL40CR", "Code 50", "MG30FX", "Origin 20H",
      "AC15C1", "AC30C2X", "Pathfinder 10",
      "Champion 40", "Mustang LT25", "Hot Rod Deluxe IV", "Acoustasonic 15",
      "Katana 50 MkII", "Katana 100", "X1-50", "THR10II",
    ],
    priceRange: [8000, 180000],
    images: ampImages,
    description: (title) =>
      `The ${title} packs studio-quality tones into a stage-ready format. ` +
      `Multiple voicings, built-in effects, and clear DI output for silent ` +
      `practice or full-band rehearsal.`,
  },
  Microphones: {
    count: 10,
    brandPool: ["Shure", "AKG", "Audio-Technica", "Behringer"],
    models: [
      "SM58", "SM57", "Beta 58A", "SM7B",
      "P420", "C214", "C414 XLII",
      "AT2020", "AT4040",
      "B-1",
    ],
    priceRange: [3500, 95000],
    images: micImages,
    description: (title) =>
      `A studio favourite, the ${title} captures every nuance of voice and ` +
      `instrument with low noise and an open, natural response. Trusted by ` +
      `producers worldwide.`,
  },
  "Studio Equipment": {
    count: 12,
    brandPool: ["Zoom", "Behringer", "Audio-Technica", "Yamaha", "Boss"],
    models: [
      "H4n Pro Recorder", "H6 Recorder", "PodTrak P4", "Q2n-4K",
      "UMC22 Interface", "UMC404HD Interface", "Xenyx Q802USB Mixer",
      "AT2020USB+", "MG10 Mixer", "RC-505 Loopstation",
      "GT-1000 Multi-FX", "BR-80 Recorder",
    ],
    priceRange: [6000, 75000],
    images: studioImages,
    description: (title) =>
      `Compact yet professional, the ${title} fits seamlessly into any home ` +
      `studio setup. Pristine audio capture and intuitive controls let you ` +
      `focus on the music.`,
  },
  Accessories: {
    count: 18,
    brandPool: ["Boss", "Behringer", "Fender", "Yamaha", "Ibanez", "AKG"],
    models: [
      "DS-1 Distortion Pedal", "Tuner Pedal TU-3", "Looper Pedal RC-1",
      "Reverb Pedal RV-6", "Delay Pedal DD-8", "Guitar Strap Premium",
      "Hard Case Standard", "Padded Gig Bag", "Capo Pro",
      "Bass Strings Roundwound", "Acoustic Strings Phosphor Bronze",
      "Electric Strings Slinky", "Closed-Back Studio Headphones",
      "K72 Headphones", "Cable XLR 5m", "Cable Instrument 3m",
      "Guitar Stand Folding", "Drum Throne Round",
    ],
    priceRange: [800, 25000],
    images: studioImages,
    description: (title) =>
      `An essential addition to any musician's rig, the ${title} delivers ` +
      `reliable build quality and pro-grade performance. Designed to last ` +
      `through years of gigging and practice.`,
  },
};

module.exports = { BRANDS, CATEGORIES, CATALOG, adjectives, finishes };
