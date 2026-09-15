export type RestaurantReview = {
  name: string;
  username: string;
  initial: string;
  text: string;
};

export type RestaurantConfig = {
  name: string;
  tagline: string;
  description: string;
  logo: string;
  banner: string;

  about: {
    heading: string;
    body: string;
  };

  hero: {
    heading: string;
    body: string;
    cta: string;
  };

  location: {
    heading: string;
    body: string;
    address: string;
    mapsUrl: string;
    hours: string;
    phone: string;
    whatsapp: string;
  };

  socials: {
    facebook: string;
  };

  reviews: RestaurantReview[];

  footer: {
    name: string;
    tagline: string;
  };
};

export const restaurantConfig: RestaurantConfig = {
  name: "K & Runch",
  tagline: "مطعم مصري جامد",
  description: "مطعم مصري جامد | ممكن تطلب اورد من الواتساب.",
  logo: "/images/profile/logo.jpg",
  banner: "/images/profile/banner.png",

  about: {
    heading: "أكل يفرحك من أول لقمة",
    body: "في K & Runch بنحب الأكل اللي يتعمل بحب ويتاكل وهو لسه سخن وهدفنا نقدم أكل طعمه جامد، بسيط، ويخليك ترجع تاني.",
  },

  hero: {
    heading: "طعم مصري على مزاجك",
    body: "برجر، ساندوتشات وكريب معمولين بحب وطعم يخليك ترجع تاني.",
    cta: "شوف المنيو",
  },

  location: {
    heading: "مستنيينك عندنا",
    body: "تقدر تزورنا في الفرع أو تتواصل معانا وتطلب بسهولة.",
    address: "المحلة الكبرى، الغربية",
    mapsUrl: "https://maps.app.goo.gl/fXSBYpkpDMbRd9Yx9",
    hours: "يومياً من 10ص لـ 10م",
    phone: "0402259889",
    whatsapp: "01069153469",
  },

  socials: {
    facebook: "https://www.facebook.com/profile.php?id=61593270965881",
  },

  reviews: [
    {
      name: "كريم",
      username: "@demo_kareem",
      initial: "ك",
      text: "جربت الأكل وكانت التجربة حلوة جدًا والطعم ممتاز والكمية كويسة أكيد هكرر الطلب تاني",
    },
    {
      name: "سارة",
      username: "@demo_sara",
      initial: "س",
      text: "الأكل وصل مرتب وساخن وطعمه كان ممتاز والطلب كان سهل جدًا تجربة لطيفة فعلًا",
    },
  ],

  footer: {
    name: "K & Runch",
    tagline: "مطعم مصري جامد",
  },
};
