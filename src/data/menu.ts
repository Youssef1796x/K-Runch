export type MenuCategory = {
  id: string;
  name: string;
};

export type PriceOption = {
  label: string;
  price: number;
};

export type MenuItem = {
  id: string;
  category: string;
  name: string;
  description?: string;
  price?: number;
  priceOptions?: PriceOption[];
  available: boolean;
};

export const menuCategories: MenuCategory[] = [
  { id: "chicken-crepe", name: "كريب الدجاج" },
  { id: "meat-cheese-crepe", name: "كريب اللحوم والأجبان" },
  { id: "seafood-crepe", name: "كريب السي فود" },
  { id: "sweet-crepe", name: "كريب الحلو" },
  { id: "chicken-sandwiches", name: "سندوتشات الفراخ" },
  { id: "chicken-burger", name: "تشيكن برجر" },
  { id: "beef-burger", name: "بيف برجر" },
  { id: "smash-burger", name: "سماش برجر" },
  { id: "seafood-meals", name: "وجبات السي فود" },
  { id: "seafood-sandwiches", name: "سندوتشات السي فود" },
  { id: "milano-pasta", name: "باستا ميلانو" },
  { id: "fries-zone", name: "قسم البطاطس" },
  { id: "al-harash", name: "قسم الحرش" },
  { id: "al-harash-meals", name: "وجبات الحرش" },
  { id: "drinks", name: "قسم المشروبات" },
  { id: "meat-chicken-meals", name: "وجبات اللحوم والدجاج" },
];

export const menuItems: MenuItem[] = [
  // كريب الدجاج
  {
    id: "king-smoky",
    category: "chicken-crepe",
    name: "كينج سموكي",
    description: "قطع دجاج متبلة، صوص باربيكيو مدخن، ميكس جبن، خضار",
    price: 130,
    available: true,
  },
  {
    id: "sonic-bomb-crepe",
    category: "chicken-crepe",
    name: "سونيك بوم",
    description: "دجاج زنجر مقرمش سبايسي، صوص حار، وموزاريلا",
    price: 130,
    available: true,
  },
  {
    id: "el-chico-fajita",
    category: "chicken-crepe",
    name: "التشيكو فاهيتا",
    description: "شرائح دجاج فاهيتا متبلة، بصل وفلفل ملون، تتبيلة مكسيكية",
    price: 135,
    available: true,
  },
  {
    id: "ranchista",
    category: "chicken-crepe",
    name: "رانشيستا",
    description: "قطع دجاج مشوية، صوص رانش كريمي، وموزاريلا",
    price: 130,
    available: true,
  },
  {
    id: "al-peccino",
    category: "chicken-crepe",
    name: "البيتشينو",
    description: "قطع دجاج، صوص كريمي غني، ميكس أجبان دسمة",
    price: 140,
    available: true,
  },
  {
    id: "blue-wave-crepe",
    category: "chicken-crepe",
    name: "بلو ويف",
    description: "قطع دجاج، صوص الجبنة الريكفورد المميزة، وموزاريلا",
    price: 140,
    available: true,
  },
  {
    id: "chicken-monster",
    category: "chicken-crepe",
    name: "تشيكن مونستر",
    description: "ميكس دجاج مقرمش ومشوي، حشو مضاعف، وموزاريلا",
    price: 140,
    available: true,
  },

  // كريب اللحوم والأجبان
  {
    id: "el-haty-mix",
    category: "meat-cheese-crepe",
    name: "ميكس الحاتي",
    description: "توليفة شرقية مميزة من الكفتة والسجق البلدي مع الموزاريلا",
    price: 140,
    available: true,
  },
  {
    id: "chili-bomb",
    category: "meat-cheese-crepe",
    name: "تشيلي بومب هوت دوج",
    description: "شرائح هوت دوج مكسيكانو، صوص تشيلي حار، موزاريلا، جبنة تركي",
    price: 140,
    available: true,
  },
  {
    id: "cheese-mix",
    category: "meat-cheese-crepe",
    name: "حدوقة ميكس جبن",
    description: "توليفة مميزة من الجبن الشيدر والموزاريلا والتركي السايح",
    price: 110,
    available: true,
  },

  // كريب السي فود
  {
    id: "titanic",
    category: "seafood-crepe",
    name: "تيتانك ميكس سي فود",
    description: "جمبري مقلي كرانشي، سبيط مقرمش، طحينة، وموزاريلا",
    price: 210,
    available: true,
  },
  {
    id: "tarh-el-bahr",
    category: "seafood-crepe",
    name: "طرح البحر ميكس سي فود",
    description: "ميكس جمبري وسبيط مشوي بالزبدة والثوم والليمون، وموزاريلا",
    price: 210,
    available: true,
  },

  // كريب الحلو
  {
    id: "nutella-bomb",
    category: "sweet-crepe",
    name: "نوتيلا بوم",
    description: "شوكولاتة نوتيلا ومكسرات",
    price: 70,
    available: true,
  },
  {
    id: "nutella-banana",
    category: "sweet-crepe",
    name: "نوتيلا بانانا",
    description: "نوتيلا، قطع موز فريش، ومكسرات",
    price: 90,
    available: true,
  },
  {
    id: "nutty-bomb-candy",
    category: "sweet-crepe",
    name: "نوتي بوم كاندي",
    description: "مارشميلو، نوتيلا ومكسرات، وقطع كاندي",
    price: 90,
    available: true,
  },

  // سندوتشات الفراخ
  {
    id: "golden-strips",
    category: "chicken-sandwiches",
    name: "جولدن ستريبس",
    description: "قطع دجاج إستريبس مقرمشة ذهبية، خس، ومايونيز",
    priceOptions: [
      { label: "وسط", price: 100 },
      { label: "كبير", price: 130 },
    ],
    available: true,
  },
  {
    id: "blue-wave-sandwich",
    category: "chicken-sandwiches",
    name: "بلو ويف",
    description: "قطع دجاج، صوص الجبنة الريكفورد المميزة",
    priceOptions: [
      { label: "وسط", price: 100 },
      { label: "كبير", price: 130 },
    ],
    available: true,
  },
  {
    id: "sonic-bomb-sandwich",
    category: "chicken-sandwiches",
    name: "سونيك بوم",
    description: "دجاج زنجر مقرمش سبايسي، صوص حار، وهالبينو",
    priceOptions: [
      { label: "وسط", price: 110 },
      { label: "كبير", price: 140 },
    ],
    available: true,
  },
  {
    id: "fire-shot",
    category: "chicken-sandwiches",
    name: "فاير شوت",
    description: "قطع دجاج مشعلة بصوص الفاير الحار المميز",
    priceOptions: [
      { label: "وسط", price: 100 },
      { label: "كبير", price: 130 },
    ],
    available: true,
  },
  {
    id: "shish-pop",
    category: "chicken-sandwiches",
    name: "شيش بوب",
    description: "شيش طاووق متبل وممشوي على الجريل مع الخضار",
    priceOptions: [
      { label: "وسط", price: 100 },
      { label: "كبير", price: 130 },
    ],
    available: true,
  },
  {
    id: "buffalo-bomb",
    category: "chicken-sandwiches",
    name: "بافلو بوم",
    description: "قطع دجاج مقرمشة بصوص البافلو الأمريكي الحامض واللاذع",
    priceOptions: [
      { label: "وسط", price: 100 },
      { label: "كبير", price: 130 },
    ],
    available: true,
  },
  {
    id: "fajita-class",
    category: "chicken-sandwiches",
    name: "فاهيتا كلاس",
    description: "شرائح دجاج فاهيتا متبلة على الجريل مع البصل والفلفل الملون",
    priceOptions: [
      { label: "وسط", price: 100 },
      { label: "كبير", price: 130 },
    ],
    available: true,
  },

  // تشيكن برجر
  {
    id: "chicken-hill",
    category: "chicken-burger",
    name: "تشيكن هيل",
    description: "برجر دجاج، خس، مايونيز، وصوصات مميزة",
    priceOptions: [
      { label: "سنجل", price: 120 },
      { label: "دبل", price: 150 },
    ],
    available: true,
  },
  {
    id: "buffalo-strips",
    category: "chicken-burger",
    name: "بافلو ستريبس",
    description: "قطع دجاج إستريبس مقرمشة بصوص البافلو الحار",
    priceOptions: [
      { label: "سنجل", price: 120 },
      { label: "دبل", price: 150 },
    ],
    available: true,
  },
  {
    id: "mr-sour",
    category: "chicken-burger",
    name: "مستر صاور",
    description: "برجر دجاج بخلطة الصوص الحامض المميز والمخلل",
    priceOptions: [
      { label: "سنجل", price: 120 },
      { label: "دبل", price: 150 },
    ],
    available: true,
  },

  // بيف برجر
  {
    id: "cheesy-lazy",
    category: "beef-burger",
    name: "تشيزي ليزي",
    description: "برجر لحم مشوي غرقان بصوص الجبنة الشيدر السايحة",
    priceOptions: [
      { label: "سنجل", price: 150 },
      { label: "دبل", price: 210 },
    ],
    available: true,
  },
  {
    id: "classic-combo",
    category: "beef-burger",
    name: "كلاسيك كومبو (وجبة شاملة)",
    description: "ساندوتش برجر لحم كلاسيكي + بطاطس مقرمشة + بيبسي كولا",
    price: 150,
    available: true,
  },
  {
    id: "cowboy",
    category: "beef-burger",
    name: "كاوبوي",
    description: "برجر لحم، بيف بيكون مدخن، وصوص باربيكيو",
    priceOptions: [
      { label: "سنجل", price: 150 },
      { label: "دبل", price: 210 },
    ],
    available: true,
  },
  {
    id: "mushroom-lava",
    category: "beef-burger",
    name: "مشروم لافا",
    description: "برجر لحم، مشروم مشوي، غرقان بصوص المشروم والشيدر",
    priceOptions: [
      { label: "سنجل", price: 150 },
      { label: "دبل", price: 210 },
    ],
    available: true,
  },

  // سماش برجر
  {
    id: "smash-town",
    category: "smash-burger",
    name: "سماش تاون",
    description: "لحم بقري مضغوط مقرمش، جبنة شيدر، خيار مخلل، وصوص السماش",
    priceOptions: [
      { label: "سنجل", price: 150 },
      { label: "دبل", price: 210 },
    ],
    available: true,
  },
  {
    id: "smash-hunter",
    category: "smash-burger",
    name: "سماش هانتر",
    description: "لحم سماش مميز، صوصات غنية، وخضار فريش",
    priceOptions: [
      { label: "سنجل", price: 150 },
      { label: "دبل", price: 210 },
    ],
    available: true,
  },
  {
    id: "smoky-mushroom",
    category: "smash-burger",
    name: "سموكي مشروم",
    description: "لحم سماش، مشروم مشوي، بيف بيكون مدخن، وجبنة شيدر",
    priceOptions: [
      { label: "سنجل", price: 150 },
      { label: "دبل", price: 210 },
    ],
    available: true,
  },

  // وجبات السي فود
  {
    id: "hala-bel-khamees",
    category: "seafood-meals",
    name: "هلا بالخميس",
    description:
      "وجبة اللمّة والروقان: ميكس فوسفور مشوي على الجريل بالزبدة والثوم، ينزل فوق رز صيادية مفلفل مع السلطات والعيش",
    price: 250,
    available: true,
  },
  {
    id: "ibn-hamido",
    category: "seafood-meals",
    name: "ابن حميدو",
    description:
      "ملوك المقرمش والكرانشي: تشكيلة بحرية مقلية بخلطة تتبيلة زمان السرية، قرمشة لآخر قطعة بتنزل مع الطحينة والعيش",
    price: 250,
    available: true,
  },
  {
    id: "al-sahel-al-shereer",
    category: "seafood-meals",
    name: "الساحل الشرير",
    description:
      "طاسة الطاقة والدسم: ميكس سي فود غرقان في صوص الجبنة الشيدر والموزاريلا السايحة مع بهارات المطعم الحارة الحصرية",
    price: 250,
    available: true,
  },

  // سندوتشات السي فود
  {
    id: "bahreya",
    category: "seafood-sandwiches",
    name: "بحرية",
    description: "جمبري مشوي وجمبري جامبو مقرمش، صوص تارتار وخس فريش",
    priceOptions: [
      { label: "وسط", price: 150 },
      { label: "كبير", price: 210 },
    ],
    available: true,
  },
  {
    id: "zafir",
    category: "seafood-sandwiches",
    name: "زفير",
    description: "جمبري مشوي، فلفل ألوان، بصل مكرمل، بهارات مكسيكية، صوص مميز",
    priceOptions: [
      { label: "وسط", price: 150 },
      { label: "كبير", price: 210 },
    ],
    available: true,
  },
  {
    id: "balbaa",
    category: "seafood-sandwiches",
    name: "بلبع",
    description:
      "سندوتش الملوك: ميكس جمبري وسبيط مقلي أو مشوي، صوص ديناميت، جرجير",
    priceOptions: [
      { label: "وسط", price: 150 },
      { label: "كبير", price: 210 },
    ],
    available: true,
  },
  {
    id: "golden-shrimp",
    category: "seafood-sandwiches",
    name: "جولدن شرمب",
    description: "جمبري ذهبي مقرمش، صوص المطعم، مايونيز، ليمون، خيار مخلل",
    priceOptions: [
      { label: "وسط", price: 150 },
      { label: "كبير", price: 210 },
    ],
    available: true,
  },
  {
    id: "al-lol",
    category: "seafood-sandwiches",
    name: "اللول",
    description: "ميكس سي فود غرقان صوص جبنة سايحة وبهارات المطعم المميزة",
    priceOptions: [
      { label: "وسط", price: 150 },
      { label: "كبير", price: 210 },
    ],
    available: true,
  },
  {
    id: "gaddorah",
    category: "seafood-sandwiches",
    name: "قدورة",
    description: "ميكس سي فود مجهز بطريقة خاصة وحصرية تذوقها لأول مرة",
    priceOptions: [
      { label: "وسط", price: 150 },
      { label: "كبير", price: 210 },
    ],
    available: true,
  },
  {
    id: "apache-seafood",
    category: "seafood-sandwiches",
    name: "أباتشي",
    description: "ساندوتش فرنسي كبير بحشوة سي فود وصوصات مميزة",
    price: 210,
    available: true,
  },

  // باستا ميلانو
  {
    id: "negresco-lava",
    category: "milano-pasta",
    name: "نيجرسكو لافا",
    description:
      "قطع دجاج ومشروم فريش، غرقانة ببركان من صوص البشاميل والموزاريلا السايحة",
    priceOptions: [
      { label: "صغير", price: 140 },
      { label: "وسط", price: 180 },
      { label: "كبير", price: 220 },
    ],
    available: true,
  },
  {
    id: "crunchy-white",
    category: "milano-pasta",
    name: "كرانشي وايت",
    description:
      "باستا كريمي بالوايت صوص، مغطاة بقطع الدجاج المقرمشة الذهبية الكرانشي",
    priceOptions: [
      { label: "صغير", price: 160 },
      { label: "وسط", price: 200 },
      { label: "كبير", price: 240 },
    ],
    available: true,
  },
  {
    id: "white-lava",
    category: "milano-pasta",
    name: "وايت لافا",
    description:
      "بركان الصوص الأبيض الكريمي الغني الغرقان بميكس أجبان دسمة وموزاريلا",
    priceOptions: [
      { label: "صغير", price: 180 },
      { label: "وسط", price: 240 },
      { label: "كبير", price: 300 },
    ],
    available: true,
  },
  {
    id: "sicilia",
    category: "milano-pasta",
    name: "سيسليا",
    description:
      "طعم صقلية الأصيل: باستا بالريد صوص المتبل بالأعشاب مع ميكس لحوم مميز",
    priceOptions: [
      { label: "صغير", price: 200 },
      { label: "وسط", price: 250 },
      { label: "كبير", price: 300 },
    ],
    available: true,
  },
  {
    id: "venezia",
    category: "milano-pasta",
    name: "فينيسيا",
    description:
      "باستا فينيسيا الساحرة بصوص ميكس (بينك صوص) يجمع بين كريمية الوايت صوص وقوة الريد صوص",
    priceOptions: [
      { label: "صغير", price: 200 },
      { label: "وسط", price: 250 },
      { label: "كبير", price: 300 },
    ],
    available: true,
  },
  {
    id: "honey-moon",
    category: "milano-pasta",
    name: "شهر العسل",
    description:
      "طاجن الفوسفور والطاقة: باستا غنية بالجمبري والكاليماري مع الوايت صوص الكريمي والموزاريلا",
    price: 250,
    available: true,
  },
  {
    id: "roma-meat",
    category: "milano-pasta",
    name: "روما لحوم",
    description:
      "باستا العاصمة روما: قطع لحم ستيك دايبة ومشروم مشوي بالصوص البني الفاخر",
    priceOptions: [
      { label: "صغير", price: 150 },
      { label: "وسط", price: 200 },
      { label: "كبير", price: 250 },
    ],
    available: true,
  },
  {
    id: "bolognese",
    category: "milano-pasta",
    name: "بولونيز لحوم",
    description:
      "الباستا الإيطالية الكلاسيكية باللحم المفروم المتبل وصلصة الطماطم الغنية",
    priceOptions: [
      { label: "صغير", price: 150 },
      { label: "وسط", price: 200 },
      { label: "كبير", price: 250 },
    ],
    available: true,
  },
  {
    id: "toscani",
    category: "milano-pasta",
    name: "توسكاني",
    description:
      "وصفة إقليم توسكانا الشهيرة بقطع اللحم المتبل والبهارات الخاصة مع الصوص الغني",
    priceOptions: [
      { label: "صغير", price: 150 },
      { label: "وسط", price: 200 },
      { label: "كبير", price: 250 },
    ],
    available: true,
  },

  // قسم البطاطس
  {
  id: "cheetos-potato",
  category: "fries-zone",
  name: "شيتوس بوتيتو",
  description: "أصابع بطاطس، صوص الجبنة الشيدر السايحة، وفتات شيتوس المقرمش",
  priceOptions: [
    { label: "باكت", price: 45 },
    { label: "سندوتش", price: 55 },
    { label: "سوري", price: 55 },
  ],
  available: true,
},
{
  id: "twins",
  category: "fries-zone",
  name: "التوينز",
  description: "ميكس البطاطس المزدوج بتوليفة مميزة من صوصات المطعم",
  priceOptions: [
    { label: "باكت", price: 35 },
    { label: "سندوتش", price: 45 },
    { label: "سوري", price: 45 },
  ],
  available: true,
},
{
  id: "mix-sauce",
  category: "fries-zone",
  name: "ميكس صوصات",
  description: "أصابع البطاطس الذهبية الغرقانة بتشكيلة من الصوصات الخاصة",
  priceOptions: [
    { label: "باكت", price: 45 },
    { label: "سندوتش", price: 55 },
    { label: "سوري", price: 55 },
  ],
  available: true,
},
{
  id: "lava-buffalo",
  category: "fries-zone",
  name: "لافا بافلو",
  description: "بركان البطاطس المشعلة بصوص البافلو الحار واللاذع",
  priceOptions: [
    { label: "باكت", price: 45 },
    { label: "سندوتش", price: 55 },
    { label: "سوري", price: 55 },
  ],
  available: true,
},
{
  id: "flamingo",
  category: "fries-zone",
  name: "فلامنجو",
  description: "البطاطس المقرمشة بصوص الفلامنجو المميز المبتكر للمطعم",
  priceOptions: [
    { label: "باكت", price: 70 },
    { label: "سندوتش", price: 85 },
    { label: "سوري", price: 80 },
  ],
  available: true,
},
{
  id: "extreme",
  category: "fries-zone",
  name: "إكستريم",
  description: "وجبة البطاطس العملاقة الغنية بالإضافات وأقوى النكهات",
  priceOptions: [
    { label: "باكت", price: 70 },
    { label: "سندوتش", price: 80 },
    { label: "سوري", price: 80 },
  ],
  available: true,
},

  // قسم الحرش
  {
    id: "kebda",
    category: "al-harash",
    name: "كبدة",
    description:
      "شرائح الكبدة الإسكندراني المتبلة بالثوم، الفلفل الحار، والليمون",
    priceOptions: [
      { label: "صغير", price: 40 },
      { label: "وسط", price: 70 },
      { label: "كبير", price: 90 },
    ],
    available: true,
  },
  {
    id: "sogoq",
    category: "al-harash",
    name: "سجق",
    description: "السجق الشرقي المتشوح بخلطة الطماطم، البصل، والبهارات الخاصة",
    priceOptions: [
      { label: "صغير", price: 45 },
      { label: "وسط", price: 75 },
      { label: "كبير", price: 100 },
    ],
    available: true,
  },
  {
    id: "hawawshi",
    category: "al-harash",
    name: "حواوشي",
    description:
      "رغيف الحواوشي البلدي المقرمش المليان باللحمة المفرومة المتبلة",
    priceOptions: [
      { label: "وسط", price: 45 },
      { label: "كبير", price: 75 },
    ],
    available: true,
  },
  {
    id: "mokh-al-prince",
    category: "al-harash",
    name: "مخ سندوتش البرنس",
    description: "قطع المخ المقلي بخلطة البرنس الشهيرة، قرمشة وطعم أصيل",
    price: 75,
    available: true,
  },
  {
    id: "mombar-sandwich",
    category: "al-harash",
    name: "ممبار سندوتش",
    description: "أصابع الممبار البلدي المحمر والمقرمش بخلطة الأرز المتبلة",
    price: 75,
    available: true,
  },

  // وجبات الحرش
  {
    id: "kings-meal",
    category: "al-harash-meals",
    name: "وجبة الملوك",
    description:
      "ملوك الفخامة الشرقية: ميكس ممبار محمر ومقرمش + مخ مقلي + الخبز الطازج",
    price: 250,
    available: true,
  },
  {
    id: "candy-beef",
    category: "al-harash-meals",
    name: "كباب حلة كاندي بيف",
    description: "قطع اللحم البقري الدايبة المستوية على الهادي بالبصل المكرمل",
    price: 100,
    available: true,
  },
  {
    id: "kokoroko",
    category: "al-harash-meals",
    name: "كوكوروكو سوسيس",
    description: "سيخ السوسيس المقرمش الكوري المغطى بالكفر الذهبي والجبن",
    price: 100,
    available: true,
  },

  // المشروبات
  {
    id: "pepsi-cans",
    category: "drinks",
    name: "بيبسي كانز",
    price: 25,
    available: true,
  },
  {
    id: "free-cola",
    category: "drinks",
    name: "فري كولا",
    price: 25,
    available: true,
  },
  {
    id: "twist-classic",
    category: "drinks",
    name: "تويست كلاسيك",
    price: 25,
    available: true,
  },
  {
    id: "pepsi-1-5l",
    category: "drinks",
    name: "لتر ونص بيبسي",
    price: 50,
    available: true,
  },
  {
    id: "almarai-rayeb",
    category: "drinks",
    name: "رايب المراعي",
    price: 25,
    available: true,
  },
  {
    id: "big-cola",
    category: "drinks",
    name: "بيج كولا",
    price: 15,
    available: true,
  },
  {
    id: "aswan-hibiscus",
    category: "drinks",
    name: "كركديه أسواني أصلي",
    price: 25,
    available: true,
  },
  {
    id: "sobia-milk",
    category: "drinks",
    name: "سوبيا حليب",
    price: 35,
    available: true,
  },
  {
    id: "tamarind",
    category: "drinks",
    name: "تمر هندي أصلي",
    price: 25,
    available: true,
  },
  {
    id: "kharoub",
    category: "drinks",
    name: "خروب أصلي",
    price: 35,
    available: true,
  },
  {
    id: "sakans-mix",
    category: "drinks",
    name: "سكلانس",
    description:
      "اختر ميكسك المفضل: تمر هندي مع كركديه / خروب مع كركديه / سوبيا مع تمر هندي",
    price: 35,
    available: true,
  },

  // وجبات اللحوم والدجاج
  {
    id: "kofta-sogoq-meal",
    category: "meat-chicken-meals",
    name: "وجبة كفتة وسجق شرقي",
    description:
      "التوليفة الشرقية المعتمدة: أصابع كفتة مشوية وسجق بلدي متبل، تنزل فوق أرز بسمتي مفلفل مع صوصات المطعم والعيش",
    price: 150,
    available: true,
  },
  {
    id: "shish-tawook-meal",
    category: "meat-chicken-meals",
    name: "وجبة شيش طاووق",
    description:
      "وجبة الطاقة والدجاج: قطع شيش طاووق متبلة ومشوية على الجريل مع الخضار الملون، تقدم فوق أرز بسمتي مع الصوصات والعيش",
    price: 150,
    available: true,
  },
];
