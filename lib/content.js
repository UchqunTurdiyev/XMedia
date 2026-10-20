// Saytdagi barcha matnlar va kontaktlar shu yerda — tahrirlash oson bo'lishi uchun.

export const site = {
  brand: "XMEDIA",
  tagline: "Shifokor va ekspertlar uchun media agentlik",
  phone: "+998 99 012 61 00",
  phoneRaw: "+998990126100",
  telegram: "https://t.me/xmedianew",
  // Arizadan so'ng mijoz shu Telegram'ga yo'naltiriladi (/rahmat)
  managerTelegram: "https://t.me/+998990126100",
  instagram: "https://www.instagram.com/xmedia.uz/",
  instagramHandle: "@xmedia.uz",
};

export const hero = {
  kicker: "Shaxsiy brend · SMM · Video prodakshn",
  title: ["Shifokor va ekspertlar", "uchun media agentlik"],
  sub: "Strategiya, suratga olish, montaj va target reklama — bitta jamoada. Siz bemor va mijozlaringiz bilan ishlaysiz, biz sizni sohangizdagi eng tanilgan yuzga aylantiramiz.",
  // 6–8 soniyalik, ovozsiz showreel: faylni public/showreel.mp4 ga qo'ying va yo'lini shu yerga yozing.
  // Bo'sh bo'lsa, o'rniga real loyiha kadri ko'rsatiladi.
  showreel: "",
  poster: "/cases/nargiza.jpg",
};

export const services = [
  { t: "SMM va kontent", d: "Instagram, Telegram, TikTok va YouTube'ni tizimli yuritamiz: kontent-reja, reels, dizayn, kopirayting va oylik hisobot.", tag: "Oyiga 15–20 reels" },
  { t: "Shaxsiy brend", d: "Shifokor, yurist, psixolog, ekspert — sizni sohangizdagi eng ishonchli va tanilgan mutaxassisga aylantiramiz.", tag: "Sohada tanilgan yuz" },
  { t: "Video prodakshn", d: "Reklama roliklari, podkast, intervyu va reels. Ssenariy, operator, yorug'lik, montaj — to'liq sikl.", tag: "Ssenariydan montajgacha" },
  { t: "Target reklama", d: "Meta Ads: auditoriya, kreativ testlar, Pixel va CAPI. Lid soni emas — sifatli lid va sotuv bo'yicha ishlaymiz.", tag: "Har hafta hisobot" },
  { t: "Infoprodyuserlik", d: "Ekspertning bilimini mahsulotga aylantiramiz: kurs, vebinar, marafon — g'oyadan birinchi sotuvgacha.", tag: "G'oyadan sotuvgacha" },
  { t: "Tadbirlar va media trening", d: "Konferensiya va taqdimotlarni yoritamiz, jamoalarga kamera oldida ishonchli gapirishni o'rgatamiz.", tag: "Reels o'sha kunning o'zida" },
];

export const manifesto = "Sifatli kontent hech qachon arzon bo'lmaydi. Biz arzon emas — natija beradigan media qilamiz.";

// "Ish jarayoni" — tarif PDF'idagi 8 bosqich, imlosi tuzatilgan
export const process = [
  { t: "Brifing", d: "Brendingiz, xizmat yoki mahsulotingiz haqida to'liq ma'lumot olamiz." },
  { t: "Raqobatchilar tahlili", d: "Bozordagi raqobatchilaringiz nima qilayotganini o'rganib chiqamiz." },
  { t: "Marketing yo'nalishi", d: "Bozorni tahlil qilib, brendingiz uchun aniq pozitsiya va yo'nalish belgilaymiz." },
  { t: "Kontent strategiya", d: "Kontent-reja tuzamiz: postlar ketma-ketligi, turlari va chiqish sanalari." },
  { t: "Suratga olish rejasi", d: "Suratga olish kunlarini oldindan birga belgilaymiz — vaqtingiz tejaladi." },
  { t: "Prodakshn", d: "Video va fotolarni suratga olamiz, professional montaj va dizayn qilamiz." },
  { t: "Storislar", d: "Sohangizdan kelib chiqib, har kuni storislar yuritamiz." },
  { t: "Target reklama", d: "Reklamani aniq, maqsadli auditoriyaga yetkazamiz va har hafta hisobot beramiz." },
];

// Faqat tasdiqlangan, haqiqiy raqamlar (manba: tarif PDF va mijozlar ro'yxati)
export const stats = [
  { v: "40+", label: "mutaxassisdan iborat jamoa" },
  { v: "150+", label: "muvaffaqiyatli loyiha" },
  { v: "35+", label: "shifokor, ekspert va brend mijoz" },
  { v: "15 daq", label: "arizaga javob vaqti" },
];

export const team = [
  { n: "12+", t: "Montajchi" },
  { n: "15+", t: "Stories maker" },
  { n: "9+", t: "SMM mutaxassisi" },
  { n: "5+", t: "Operator" },
  { n: "5+", t: "Texnik xodim" },
  { n: "3+", t: "Targetolog" },
  { n: "3+", t: "Grafik dizayner" },
  { n: "1", t: "Rejissyor" },
  { n: "", t: "Grimyor va yorug'lik ustasi" },
];

// Keyslar — tarif PDF'idagi real loyiha sahifalari. Obunachi soni skrinshotdagi holat.
// MUHIM: saytda ochiq ko'rsatishdan oldin har bir mijozdan ruxsat oling.
export const cases = [
  { img: "/cases/nargiza.jpg", handle: "nargiza.cosmetology_", niche: "Kosmetolog", followers: "153K" },
  { img: "/cases/nandini.jpg", handle: "nandini.coach", niche: "Psixolog · raqs terapiyasi", followers: "164K" },
  { img: "/cases/nasirova.jpg", handle: "doctor_nasirova", niche: "Kosmetolog · dermatolog", followers: "109K" },
  { img: "/cases/ishla.jpg", handle: "ishla.uz_", niche: "Ish e'lonlari platformasi", followers: "14.1K" },
  { img: "/cases/maftuna.jpg", handle: "maftuna.dietolog", niche: "Dietolog", followers: "10.1K" },
  { img: "/cases/safina.jpg", handle: "safina_dent", niche: "Stomatologiya", followers: "2.5K" },
  { img: "/cases/birkun.jpg", handle: "birkun.podcast.uz", niche: "Podkast loyihasi", followers: "2K" },
];

export const clients = [
  ["nargiza.cosmetology_", "Kosmetolog"], ["vrach.cosmetolog_dildora", "Shifokor-kosmetolog"], ["advokat_davron", "Yurist"],
  ["iroda_yurist", "Oilaviy yurist"], ["anora_yakubovna", "Kosmetolog"], ["doctor_gulyamova", "Salomatlik"],
  ["doctor_nasirova", "Dermatolog"], ["nandini.coach", "Psixolog"], ["logoped.azizova", "Logoped"],
  ["psixolog.nasirov", "Oilaviy psixolog"], ["dr.adias", "Shifokor-kosmetolog"], ["talia_meditation", "Meditatsiya"],
  ["shanicosmetics.uz", "Kosmetika"], ["cordial_uzbekistan_", "Suv filtrlari"], ["umida_abdullaeva_psixolog", "Psixolog"],
  ["marhabo.soxibovna", "Dietolog"], ["dr.zarina_husaynqizi", "Shifokor-kosmetolog"], ["meronshohtv", "Jurnalist"],
  ["xusen.xakimov", "Broker"], ["shahnoza__logoped", "Logoped"], ["dilnoza.kodirovaa", "Shaxsiy blog"],
  ["dilshoda_cosmetolog", "Shifokor-kosmetolog"], ["dilorom__alimova", "Oilaviy psixolog"], ["sheralixonqulov", "Ta'lim"],
  ["smartgen_uz", "Biotexnologiya"], ["alxorazmiyntm", "Xususiy maktab"], ["birkun.podcast.uz", "Podkast"],
  ["nargiz_pardalar", "Parda va jalyuzi"], ["ishla.uz_", "Ish e'lonlari"], ["maftuna.dietolog", "Dietolog"],
  ["doctor_musakova", "Endokrinolog"], ["zarina__pardalari", "Interyer"], ["feruza.cosmetolog_", "Kosmetolog"],
  ["safina_dent", "Stomatologiya"], ["green__tashkent", "Turar-joy"], ["nurafshon_markazi", "Logoped-defektolog"],
];

export const form = {
  business: ["Klinika / shifokor", "Ekspert / blogger", "Yurist / psixolog", "Ta'lim markazi", "Savdo / ishlab chiqarish", "Boshqa"],
  service: ["SMM", "Shaxsiy brend", "Video prodakshn", "Target reklama", "Infoprodyuserlik", "Kompleks (12 oy)"],
  budget: ["15 mln gacha", "15–30 mln", "30–60 mln", "60–150 mln", "150 mln+"],
};

export const faq = [
  {
    q: "Natijaga kafolat berasizmi?",
    a: "Biz jarayon, KPI va haftalik hisobotga javob beramiz. KPI'ni boshida birga belgilaymiz, har hafta raqamlar bilan hisobot beramiz. Strategiya ishlamasa — o'z hisobimizdan yo'nalishni o'zgartiramiz.",
  },
  {
    q: "Qancha vaqtda birinchi natija ko'rinadi?",
    a: "Target reklamada birinchi lidlar 3–7 kun ichida keladi. SMM va shaxsiy brendda barqaror o'sish odatda 1–3 oyda shakllanadi.",
  },
  {
    q: "Reklama byudjeti tarif narxiga kiradimi?",
    a: "Yo'q. Tarif — jamoa ishi: strategiya, prodakshn, SMM va targetni sozlash. Reklama byudjeti Meta'ga to'g'ridan-to'g'ri, alohida to'lanadi; uning miqdorini maqsadingizga qarab birga belgilaymiz.",
  },
  {
    q: "Mendan qancha vaqt talab qilinadi?",
    a: "Oyiga 2–4 ta suratga olish kuni va kontentni tasdiqlash uchun 24 soat. Qolgan hamma ishni — ssenariy, montaj, dizayn, joylash va reklamani — jamoamiz qiladi.",
  },
  {
    q: "Video suratga olishni o'zingiz qilasizmi?",
    a: "Ha. Rejissyor, operator, yorug'lik, grim, montaj va dizayn — hammasi bitta jamoada, shuning uchun sifat va tezlik nazoratda.",
  },
  {
    q: "Ariza qoldirsam keyin nima bo'ladi?",
    a: "Menejerimiz 15 daqiqa ichida qo'ng'iroq qiladi, biznesingizni qisqacha o'rganadi va bepul audit uchun uchrashuv belgilaydi.",
  },
];

/* ---------------- TARIF (/tarif — yopiq sahifa, havola orqali yuboriladi) ----------------
   TASDIQLANG: Start va Pro narxlari, to'lov shartlari va amal qilish muddati — taklif sifatida
   qo'yilgan. Premium (12 oy, 40 000 $) va undagi hajmlar tarif PDF'idan olingan. */
export const tarif = {
  validUntil: "2026-yil 30-noyabr",
  usdRate: 12000, // so'mdagi taxminiy hisob uchun
  plans: [
    {
      id: "start",
      name: "Start",
      term: "3 oy",
      perMonth: 1500,
      total: 4500,
      for: "Sahifasini endi tizimga solmoqchi bo'lgan mutaxassis uchun",
      items: [
        ["8", "reels / oy"],
        ["90+", "storis / oy"],
        ["3", "rasm post / oy"],
        ["", "Kontent-reja va oylik hisobot"],
        ["", "Oyiga 1 suratga olish kuni"],
      ],
    },
    {
      id: "pro",
      name: "Pro",
      term: "6 oy",
      perMonth: 2500,
      total: 15000,
      featured: true,
      for: "Barqaror oqim va reklamadan lid kerak bo'lgan klinika va ekspert uchun",
      items: [
        ["12–15", "reels / oy"],
        ["8", "target video / oy"],
        ["200+", "storis / oy"],
        ["3+", "rasm post / oy"],
        ["", "Target reklama sozlash va yuritish"],
        ["", "Oyiga 2 suratga olish kuni"],
      ],
    },
    {
      id: "premium",
      name: "Premium",
      term: "12 oy",
      perMonth: 3333,
      total: 40000,
      for: "Sohada yetakchi brend bo'lmoqchi bo'lganlar uchun to'liq paket",
      items: [
        ["15–20", "reels / oy"],
        ["15", "target video / oy"],
        ["300+", "storis / oy (har kuni)"],
        ["3+", "rasm post / oy"],
        ["5+", "lifestyle video / oy"],
        ["6", "rejissyorlik reklama roligi — 12 oyda"],
        ["", "YouTube, TikTok, Facebook, Telegram — barcha tarmoqlar"],
      ],
    },
  ],
  // Premium ichida nimalar bor — PDF'dagi 8 band, tuzatilgan
  premium: [
    "Rejissyorlik xizmati: har bir rolik ssenariy va sahnalashtirish bilan",
    "Sohangizga mos, har kuni yuritiladigan storislar",
    "Sohangizdan kelib chiqib tuziladigan kontent-reja",
    "Target reklamani professional sozlash va yuritish",
    "Professional operator va videomontaj",
    "YouTube, TikTok, Facebook va Telegram — barcha tarmoqlarni yuritish",
    "Lifestyle formatda oyiga 5+ qo'shimcha video",
    "Jarayon, KPI va haftalik hisobotga javob beramiz",
  ],
  terms: [
    ["Reklama byudjeti", "Narxga kirmaydi. Meta'ga to'g'ridan-to'g'ri to'lanadi, miqdorini birga belgilaymiz."],
    ["To'lov", "Har oy oldindan yoki butun muddat uchun bir martada. Bir martalik to'lovda shartlarni alohida kelishamiz."],
    ["Sizdan kerak", "Oyiga 2–4 suratga olish kuni va kontentni 24 soat ichida tasdiqlash."],
    ["Hisobot", "Har hafta: qamrov, obunachi, lid va reklama xarajati. Har oy — strategiya uchrashuvi."],
  ],
};
