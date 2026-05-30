import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const L = (uz: string, ru: string, en: string) =>
  JSON.stringify({ uz, ru, en });

async function main() {
  // Admin user
  const username = process.env.ADMIN_USERNAME || "admin";
  const password = process.env.ADMIN_PASSWORD || "bisma2026";
  const passwordHash = await bcrypt.hash(password, 10);
  await prisma.adminUser.upsert({
    where: { username },
    update: { passwordHash },
    create: { username, passwordHash },
  });
  console.log("✓ Admin user:", username);

  // Wipe existing data so we re-seed cleanly with localized JSON
  await prisma.portfolioProject.deleteMany();
  await prisma.service.deleteMany();
  await prisma.faq.deleteMany();
  await prisma.testimonial.deleteMany();
  await prisma.materialBrand.deleteMany();
  await prisma.equipment.deleteMany();

  // Site settings (localized hero + offices)
  await prisma.siteSettings.upsert({
    where: { id: "singleton" },
    update: {
      heroTitle: L(
        "Kvartira remontini",
        "Ремонт квартиры",
        "Apartment renovation"
      ),
      heroTitleAccent: L(
        "g'oyadan topshirishgacha",
        "от идеи до сдачи",
        "from idea to handover"
      ),
      heroDesc: L(
        "Bisma Group — Toshkentda yevro-remont xizmatlari. Loyiha, materiallar, ish — barchasi bir qo'lda. 2 yil kafolat, aniq smeta, belgilangan muddat.",
        "Bisma Group — евроремонт в Ташкенте. Проект, материалы, работы — всё в одних руках. 2 года гарантии, точная смета, фиксированный срок.",
        "Bisma Group — premium renovation in Tashkent. Design, materials, work — all in one hand. 2-year warranty, precise estimate, fixed deadline."
      ),
      aboutWarranty: L("2 yil", "2 года", "2 years"),
      offices: JSON.stringify([
        {
          name: L("Markaziy ofis", "Главный офис", "Main office"),
          address: L(
            "Toshkent, Yunusobod tumani, Amir Temur shoh ko'chasi 108",
            "Ташкент, Юнусабадский р-н, проспект Амира Темура 108",
            "Tashkent, Yunusabad district, Amir Temur Avenue 108"
          ),
          landmark: L(
            "Mo'ljal: Mustaqillik metro stansiyasi yonida",
            "Ориентир: рядом со станцией метро Мустакиллик",
            "Landmark: near Mustaqillik metro station"
          ),
          mapsQuery: "Toshkent+Yunusobod+tumani",
        },
        {
          name: L(
            "Chilonzor showroom",
            "Шоурум Чиланзар",
            "Chilonzor showroom"
          ),
          address: L(
            "Toshkent, Chilonzor tumani, 19-kvartal, Bunyodkor ko'chasi",
            "Ташкент, Чиланзарский р-н, 19-квартал, ул. Бунёдкор",
            "Tashkent, Chilonzor district, 19th quarter, Bunyodkor street"
          ),
          landmark: L(
            "Mo'ljal: Chilonzor metrosi yonida",
            "Ориентир: рядом с метро Чиланзар",
            "Landmark: near Chilonzor metro"
          ),
          mapsQuery: "Toshkent+Chilonzor+tumani",
        },
        {
          name: L(
            "Mirzo Ulug'bek ofisi",
            "Офис Мирзо-Улугбек",
            "Mirzo Ulugbek office"
          ),
          address: L(
            "Toshkent, Mirzo Ulug'bek tumani, Buyuk Ipak Yo'li ko'chasi",
            "Ташкент, Мирзо-Улугбекский р-н, ул. Буюк Ипак Йули",
            "Tashkent, Mirzo Ulugbek district, Buyuk Ipak Yuli street"
          ),
          landmark: L(
            "Mo'ljal: Mashinasozlar metrosi yonida",
            "Ориентир: рядом с метро Машинасозлар",
            "Landmark: near Mashinasozlar metro"
          ),
          mapsQuery: "Toshkent+Mirzo+Ulugbek+tumani",
        },
      ]),
    },
    create: { id: "singleton" },
  });
  console.log("✓ Site settings");

  // FAQs (localized question + answer)
  const faqs = [
    {
      question: L(
        "Kvartira remonti qancha vaqt davom etadi?",
        "Сколько длится ремонт квартиры?",
        "How long does an apartment renovation take?"
      ),
      answer: L(
        "Remont turiga bog'liq: kosmetik remont 30–45 kun, kapital remont 60–90 kun, dizaynerlik remont 90–120 kun. Hammom va oshxona uchun maxsus loyihalar 25 kun ichida tugaydi.",
        "Зависит от типа: косметический 30–45 дней, капитальный 60–90 дней, дизайнерский 90–120 дней. Специальные проекты для ванной и кухни — за 25 дней.",
        "Depends on the type: cosmetic 30–45 days, major 60–90 days, designer 90–120 days. Bathroom & kitchen specials are completed within 25 days."
      ),
    },
    {
      question: L(
        "Smeta tuzish va o'lchov bepulmi?",
        "Замер и составление сметы бесплатны?",
        "Are the on-site measurement and estimate free?"
      ),
      answer: L(
        "Ha, mutaxassisimizning ob'ektga chiqishi va aniq smeta tuzishi to'liq bepul. Smeta 5–7 ish kuni ichida tayyor bo'ladi.",
        "Да, выезд специалиста и составление точной сметы полностью бесплатны. Смета готова за 5–7 рабочих дней.",
        "Yes, an on-site visit and full estimate are completely free. The estimate is ready within 5–7 business days."
      ),
    },
    {
      question: L(
        "Materiallarni o'zim olamanmi yoki siz olib berasizmi?",
        "Материалы покупаю сам или вы поставляете?",
        "Do I buy the materials myself or do you supply them?"
      ),
      answer: L(
        "Ikkala variant ham mavjud. Bizning sertifikatlangan brendlar bilan to'g'ridan-to'g'ri shartnomalar 15–20% tejashga olib keladi.",
        "Возможны оба варианта. Прямые контракты с сертифицированными брендами позволяют вам сэкономить 15–20%.",
        "Both options are available. Our direct contracts with certified brands save you 15–20%."
      ),
    },
    {
      question: L(
        "Kafolat necha yilga beriladi?",
        "На сколько лет даётся гарантия?",
        "How many years is the warranty?"
      ),
      answer: L(
        "Barcha bajarilgan ishlarga 2 yil yozma kafolat beramiz. Sifat, muddat, narx va materiallar bo'yicha shartnomada belgilanadi.",
        "На все выполненные работы — 2 года письменной гарантии. Качество, срок, цена и материалы фиксируются в договоре.",
        "We provide a 2-year written warranty on all completed work. Quality, deadline, price and materials are fixed in the contract."
      ),
    },
    {
      question: L(
        "Remont jarayonida xonadonda yashash mumkinmi?",
        "Можно ли жить в квартире во время ремонта?",
        "Can I live in the apartment during renovation?"
      ),
      answer: L(
        "Kosmetik remontda ko'pchilik holatda mumkin. Kapital va dizaynerlik remontda vaqtinchalik ko'chish tavsiya etiladi.",
        "Во время косметического ремонта — обычно можно. При капитальном и дизайнерском рекомендуется временно переехать.",
        "During cosmetic renovation — usually yes. For major and designer work, temporary relocation is recommended."
      ),
    },
  ];
  for (let i = 0; i < faqs.length; i++) {
    await prisma.faq.create({ data: { ...faqs[i], order: i } });
  }
  console.log("✓ FAQs:", faqs.length);

  // Services (localized title/label/shortDesc + nested JSON labels)
  const services = [
    {
      slug: "kosmetik",
      title: L(
        "Kosmetik remont",
        "Косметический ремонт",
        "Cosmetic renovation"
      ),
      label: L(
        "TEZKOR YANGILANISH",
        "БЫСТРОЕ ОБНОВЛЕНИЕ",
        "QUICK REFRESH"
      ),
      shortDesc: L(
        "Eski xonadonni qisqa muddatda chiroyli ko'rinishga keltirish — devor, pol va shift yangilanadi.",
        "Быстро привести старую квартиру в красивый вид — обновление стен, пола и потолка.",
        "Quickly bring an old apartment to a beautiful state — refresh walls, floor and ceiling."
      ),
      icon: "Paintbrush",
      bigStats: JSON.stringify([
        {
          value: "$80–120",
          label: L("1 m² narxi", "Цена за 1 м²", "Price per m²"),
        },
        {
          value: L("30–45 kun", "30–45 дней", "30–45 days"),
          label: L("O'rtacha muddat", "Средний срок", "Average duration"),
        },
        {
          value: L("2 yil", "2 года", "2 years"),
          label: L("Ish kafolati", "Гарантия на работы", "Work warranty"),
        },
      ]),
      iconFeatures: JSON.stringify([
        {
          icon: "Paintbrush",
          label: L(
            "Devor va shift bo'yog'i",
            "Покраска стен и потолка",
            "Wall & ceiling painting"
          ),
        },
        {
          icon: "Wallpaper",
          label: L(
            "Yangi oboi yopishtirish",
            "Поклейка новых обоев",
            "New wallpaper installation"
          ),
        },
        {
          icon: "Layers",
          label: L(
            "Linoleum / laminat",
            "Линолеум / ламинат",
            "Linoleum / laminate"
          ),
        },
        {
          icon: "Plug",
          label: L(
            "Rozetka almashtirish",
            "Замена розеток",
            "Outlet replacement"
          ),
        },
      ]),
      iconSpecs: JSON.stringify([
        {
          icon: "Hammer",
          label: L("Demontaj ishlari", "Демонтажные работы", "Dismantling"),
        },
        {
          icon: "Sparkles",
          label: L(
            "Tekislash va shpaklyovka",
            "Выравнивание и шпаклёвка",
            "Levelling & putty"
          ),
        },
        {
          icon: "Lightbulb",
          label: L(
            "Yoritgich o'rnatish",
            "Установка светильников",
            "Lighting installation"
          ),
        },
        {
          icon: "ClipboardList",
          label: L(
            "Yakuniy klininglik",
            "Финальный клининг",
            "Final cleaning"
          ),
        },
      ]),
      contactInfo: L(
        "+998 78 122 75 75 · Bepul chiqim",
        "+998 78 122 75 75 · Бесплатный выезд",
        "+998 78 122 75 75 · Free visit"
      ),
      order: 0,
    },
    {
      slug: "kapital",
      title: L("Kapital remont", "Капитальный ремонт", "Major renovation"),
      label: L(
        "TO'LIQ YANGILASH",
        "ПОЛНОЕ ОБНОВЛЕНИЕ",
        "COMPLETE OVERHAUL"
      ),
      shortDesc: L(
        "Kommunikatsiyalardan boshlab to'liq qaytadan qurish — elektr, suv, gaz, devor va pol almashtiriladi.",
        "Полная переделка начиная с коммуникаций — замена электричества, воды, газа, стен и полов.",
        "Full rebuild starting with utilities — replacement of electricity, water, gas, walls and floors."
      ),
      icon: "Wrench",
      bigStats: JSON.stringify([
        {
          value: "$120–150",
          label: L("1 m² narxi", "Цена за 1 м²", "Price per m²"),
        },
        {
          value: L("60–90 kun", "60–90 дней", "60–90 days"),
          label: L("O'rtacha muddat", "Средний срок", "Average duration"),
        },
        {
          value: L("2 yil", "2 года", "2 years"),
          label: L("Ish kafolati", "Гарантия на работы", "Work warranty"),
        },
      ]),
      iconFeatures: JSON.stringify([
        {
          icon: "Plug",
          label: L(
            "Yangi elektr montaji",
            "Новый электромонтаж",
            "New electrical installation"
          ),
        },
        {
          icon: "Droplets",
          label: L(
            "Suv va kanalizatsiya",
            "Вода и канализация",
            "Water & sewerage"
          ),
        },
        {
          icon: "Layers",
          label: L(
            "Pol va devor tekislash",
            "Выравнивание пола и стен",
            "Floor & wall levelling"
          ),
        },
        {
          icon: "Home",
          label: L(
            "Eshik va deraza almashtirish",
            "Замена дверей и окон",
            "Door & window replacement"
          ),
        },
      ]),
      iconSpecs: JSON.stringify([
        {
          icon: "Hammer",
          label: L(
            "Eski qatlamni demontaj",
            "Демонтаж старого слоя",
            "Dismantling old layers"
          ),
        },
        {
          icon: "Lightbulb",
          label: L(
            "Natyajnoy potolok",
            "Натяжной потолок",
            "Stretch ceiling"
          ),
        },
        {
          icon: "Wallpaper",
          label: L(
            "Plitka va dekorativ shpaklyovka",
            "Плитка и декоративная шпаклёвка",
            "Tiles & decorative putty"
          ),
        },
        {
          icon: "ShieldCheck",
          label: L(
            "Sertifikatlangan materiallar",
            "Сертифицированные материалы",
            "Certified materials"
          ),
        },
      ]),
      contactInfo: L(
        "+998 78 122 75 75 · Bepul o'lchov",
        "+998 78 122 75 75 · Бесплатный замер",
        "+998 78 122 75 75 · Free measurement"
      ),
      order: 1,
    },
    {
      slug: "dizayn",
      title: L(
        "Dizaynerlik remont",
        "Дизайнерский ремонт",
        "Designer renovation"
      ),
      label: L(
        "INDIVIDUAL LOYIHA BILAN",
        "С ИНДИВИДУАЛЬНЫМ ПРОЕКТОМ",
        "WITH AN INDIVIDUAL PROJECT"
      ),
      shortDesc: L(
        "3D dizayn loyiha asosida premium materiallardan foydalangan holda mukammal interer yaratish.",
        "Создание идеального интерьера на основе 3D-дизайна с использованием премиум-материалов.",
        "Crafting a perfect interior based on a 3D design using premium materials."
      ),
      icon: "Palette",
      bigStats: JSON.stringify([
        {
          value: "$150–170",
          label: L("1 m² narxi", "Цена за 1 м²", "Price per m²"),
        },
        {
          value: L("90–120 kun", "90–120 дней", "90–120 days"),
          label: L("O'rtacha muddat", "Средний срок", "Average duration"),
        },
        {
          value: L("2 yil", "2 года", "2 years"),
          label: L(
            "Kengaytirilgan kafolat",
            "Расширенная гарантия",
            "Extended warranty"
          ),
        },
      ]),
      iconFeatures: JSON.stringify([
        {
          icon: "Palette",
          label: L(
            "3D dizayn-loyiha",
            "3D дизайн-проект",
            "3D design project"
          ),
        },
        {
          icon: "Sofa",
          label: L(
            "Mebel tanlash yordami",
            "Помощь в выборе мебели",
            "Furniture selection help"
          ),
        },
        {
          icon: "Lightbulb",
          label: L(
            "Dekorativ yoritish",
            "Декоративное освещение",
            "Decorative lighting"
          ),
        },
        {
          icon: "Sparkles",
          label: L(
            "Premium materiallar",
            "Премиум материалы",
            "Premium materials"
          ),
        },
      ]),
      iconSpecs: JSON.stringify([
        {
          icon: "Sparkles",
          label: L("Klassik uslub", "Классический стиль", "Classic style"),
        },
        {
          icon: "Ruler",
          label: L("Minimalizm", "Минимализм", "Minimalism"),
        },
        {
          icon: "Hammer",
          label: L(
            "Loft / industrial",
            "Лофт / индастриал",
            "Loft / industrial"
          ),
        },
        {
          icon: "Home",
          label: L(
            "Skandinav uslubi",
            "Скандинавский стиль",
            "Scandinavian style"
          ),
        },
      ]),
      contactInfo: L(
        "+998 78 122 75 75 · Dizayner bilan uchrashuv",
        "+998 78 122 75 75 · Встреча с дизайнером",
        "+998 78 122 75 75 · Meet a designer"
      ),
      order: 2,
    },
    {
      slug: "sanuzel",
      title: L(
        "Hammom va oshxona",
        "Ванная и кухня",
        "Bathroom & kitchen"
      ),
      label: L(
        "MAXSUS YO'NALISHLAR",
        "СПЕЦИАЛЬНЫЕ НАПРАВЛЕНИЯ",
        "SPECIAL FOCUS"
      ),
      shortDesc: L(
        "Eng ko'p ehtiyotni talab qiluvchi xonalar — sifatli germetik, premium plitka va o'rnatish.",
        "Самые требовательные помещения — качественный герметик, премиум-плитка и монтаж.",
        "The most demanding rooms — quality sealant, premium tiles and installation."
      ),
      icon: "Bath",
      bigStats: JSON.stringify([
        {
          value: "$200+",
          label: L("1 m² narxi", "Цена за 1 м²", "Price per m²"),
        },
        {
          value: L("20–30 kun", "20–30 дней", "20–30 days"),
          label: L("O'rtacha muddat", "Средний срок", "Average duration"),
        },
        {
          value: L("2 yil", "2 года", "2 years"),
          label: L(
            "Suv o'tkazmaslik kafolati",
            "Гарантия гидроизоляции",
            "Waterproofing warranty"
          ),
        },
      ]),
      iconFeatures: JSON.stringify([
        {
          icon: "Droplets",
          label: L(
            "Gidroizolyatsiya",
            "Гидроизоляция",
            "Waterproofing"
          ),
        },
        {
          icon: "Layers",
          label: L("Plitka yotqizish", "Укладка плитки", "Tile laying"),
        },
        {
          icon: "Bath",
          label: L(
            "Santexnika montaji",
            "Монтаж сантехники",
            "Plumbing installation"
          ),
        },
        {
          icon: "Plug",
          label: L(
            "Issiq pol tizimi",
            "Система тёплого пола",
            "Underfloor heating"
          ),
        },
      ]),
      fractions: JSON.stringify([
        {
          range: L("Hammom", "Ванная", "Bathroom"),
          desc: L(
            "Plitka, gidroizolyatsiya, santexnika, ventilyatsiya",
            "Плитка, гидроизоляция, сантехника, вентиляция",
            "Tiles, waterproofing, plumbing, ventilation"
          ),
        },
        {
          range: L("Oshxona", "Кухня", "Kitchen"),
          desc: L(
            "Fartuk plitka, gaz/elektr plita, ventilyatsiya, suv chiqishi",
            "Фартук, газ/электроплита, вентиляция, водоотвод",
            "Backsplash, gas/electric stove, ventilation, drainage"
          ),
        },
        {
          range: L("Hojatxona", "Туалет", "Toilet"),
          desc: L(
            "Polu-pol plitka, unitaz, yuvinish jihozlari",
            "Плитка пола, унитаз, аксессуары",
            "Floor tiles, toilet, washing fixtures"
          ),
        },
        {
          range: L("Lojiya", "Лоджия", "Loggia"),
          desc: L(
            "Issiqlik izolyatsiya, panoramali oyna, panel",
            "Теплоизоляция, панорамные окна, отделка",
            "Insulation, panoramic windows, panelling"
          ),
        },
      ]),
      contactInfo: L(
        "+998 78 122 75 75 · Tez bajarish",
        "+998 78 122 75 75 · Быстрое исполнение",
        "+998 78 122 75 75 · Fast turnaround"
      ),
      order: 3,
    },
  ];
  for (const s of services) {
    await prisma.service.create({ data: s });
  }
  console.log("✓ Services:", services.length);

  // Testimonials
  const testimonials = [
    {
      slug: "young-couple",
      category: L("Yosh oilalar", "Молодые семьи", "Young families"),
      author: L(
        "Odiljon va Shahnoza",
        "Одилжон и Шахноза",
        "Odiljon & Shahnoza"
      ),
      age: L(
        "Kosmetik remont · 58 m²",
        "Косметический ремонт · 58 м²",
        "Cosmetic renovation · 58 m²"
      ),
      quote: L(
        "Birinchi xonadonimizni 30 kunda yangilab berishdi. Smeta aniq edi, hech qanday qo'shimcha to'lov bo'lmadi.",
        "Нашу первую квартиру обновили за 30 дней. Смета была точной, никаких скрытых доплат.",
        "They refreshed our first apartment in 30 days. The estimate was precise — no hidden charges."
      ),
      result: L(
        "30 kunda topshirildi",
        "Сдано за 30 дней",
        "Delivered in 30 days"
      ),
      avatar:
        "https://optim.tildacdn.one/tild3530-3934-4830-b135-376234653066/-/format/webp/13-min.jpg.webp",
      order: 0,
    },
    {
      slug: "teacher",
      category: L("Muallimalar", "Преподаватели", "Teachers"),
      author: L("Dildora", "Дилдора", "Dildora"),
      age: L(
        "Kapital remont · 74 m²",
        "Капитальный ремонт · 74 м²",
        "Major renovation · 74 m²"
      ),
      quote: L(
        "Eski xonadonni butunlay qaytadan tikladilar — yangi suv, gaz, elektr. Har kun foto-hisobot yuborib turishdi.",
        "Старую квартиру полностью переделали — новые вода, газ, электрика. Каждый день присылали фотоотчёт.",
        "They fully rebuilt the old apartment — new water, gas and wiring. Daily photo reports were sent."
      ),
      result: L("To'liq qaytadan", "Полностью заново", "Fully rebuilt"),
      avatar:
        "https://optim.tildacdn.one/tild3431-3261-4735-b235-623839376365/-/format/webp/14-min.jpg.webp",
      order: 1,
    },
    {
      slug: "investor",
      category: L("Investorlar", "Инвесторы", "Investors"),
      author: L("Anvar", "Анвар", "Anvar"),
      age: L(
        "Ijara uchun · 2 ta xonadon",
        "Под аренду · 2 квартиры",
        "For rent · 2 apartments"
      ),
      quote: L(
        "2 ta xonadonni bir vaqtda kosmetik remont qilib berishdi. Ijara qiymati 35% ga ko'tarildi.",
        "Две квартиры одновременно сделали косметический ремонт. Арендная стоимость выросла на 35%.",
        "Two apartments got a cosmetic refresh at once. The rental value grew by 35%."
      ),
      result: L(
        "+35% ijara o'sishi",
        "+35% к аренде",
        "+35% rent growth"
      ),
      avatar:
        "https://optim.tildacdn.one/tild3866-3837-4230-a432-613561383038/-/format/webp/10-min.jpg.webp",
      order: 2,
    },
    {
      slug: "family",
      category: L(
        "Farzandli oilalar",
        "Семьи с детьми",
        "Families with children"
      ),
      author: L("Malohat opa", "Малохат опа", "Mrs. Malokhat"),
      age: L(
        "Dizaynerlik · 102 m²",
        "Дизайнерский · 102 м²",
        "Designer · 102 m²"
      ),
      quote: L(
        "3D loyiha asosida bolalar xonasi alohida loyihalandi. Ish davomida mol-mulkimiz himoyada bo'ldi.",
        "Детская спроектирована отдельно по 3D-проекту. Имущество было под защитой всё время работ.",
        "The kids' room was designed separately in 3D. Our belongings stayed protected throughout the work."
      ),
      result: L(
        "3D dizayn loyiha",
        "3D дизайн-проект",
        "3D design project"
      ),
      avatar:
        "https://optim.tildacdn.one/tild3335-3738-4566-a437-363434613437/-/format/webp/11-min.jpg.webp",
      order: 3,
    },
    {
      slug: "senior",
      category: L("Nafaqaxo'rlar", "Пенсионеры", "Seniors"),
      author: L("Sobir aka", "Собир ака", "Mr. Sobir"),
      age: L(
        "Hammom yangilash",
        "Обновление ванной",
        "Bathroom refresh"
      ),
      quote: L(
        "Faqat hammom va oshxona yangilashga ariza berdim. 25 kunda topshirib, kafolat berishdi — endi xotirjamman.",
        "Заказал только ванную и кухню. Сдали за 25 дней, дали гарантию — теперь спокоен.",
        "I ordered only bathroom & kitchen. Done in 25 days with warranty — peace of mind."
      ),
      result: L("Sifatli yakuniy", "Качественный финал", "Quality finish"),
      avatar:
        "https://optim.tildacdn.one/tild3636-3739-4935-a363-323231346639/-/format/webp/12-min.jpg.webp",
      order: 4,
    },
  ];
  for (const t of testimonials) {
    await prisma.testimonial.create({ data: t });
  }
  console.log("✓ Testimonials:", testimonials.length);

  // Material brands (brand names stay; type localized)
  const brands = [
    {
      name: "Knauf",
      type: L("Shpaklyovka · gips", "Шпаклёвка · гипс", "Putty · gypsum"),
    },
    {
      name: "Ceresit",
      type: L("Plitka yelimlari", "Клеи для плитки", "Tile adhesives"),
    },
    {
      name: "Volma",
      type: L(
        "Tekislash aralashmalari",
        "Выравнивающие смеси",
        "Levelling mixes"
      ),
    },
    {
      name: "Tikkurila",
      type: L("Premium bo'yoqlar", "Премиум краски", "Premium paints"),
    },
    {
      name: "Kerama Marazzi",
      type: L("Italyan plitka", "Итальянская плитка", "Italian tiles"),
    },
    {
      name: "Grohe",
      type: L(
        "Premium santexnika",
        "Премиум сантехника",
        "Premium plumbing"
      ),
    },
    {
      name: "Schneider Electric",
      type: L("Elektr jihozlari", "Электрооборудование", "Electrical gear"),
    },
    {
      name: "Egger",
      type: L("Yevropa laminat", "Европейский ламинат", "European laminate"),
    },
  ];
  for (let i = 0; i < brands.length; i++) {
    await prisma.materialBrand.create({ data: { ...brands[i], order: i } });
  }
  console.log("✓ Material brands:", brands.length);

  // Equipment
  const equipment = [
    {
      icon: "Layers",
      name: L(
        "Mexanizatsiyalashgan shtukaturka",
        "Механизированная штукатурка",
        "Mechanised plastering"
      ),
      desc: L(
        "Shtukatur eritmasini bosim ostida bir tekis taqsimlovchi avtomatlashgan qurilma. Katta maydonlarda eng tez va sifatli yechim.",
        "Автоматизированное устройство, равномерно распределяющее штукатурный раствор под давлением. Самое быстрое и качественное решение для больших площадей.",
        "Automated rig that evenly distributes plaster under pressure. The fastest, highest-quality solution for large areas."
      ),
    },
    {
      icon: "Hammer",
      name: L(
        "Beton tozalash mashinasi",
        "Машина для шлифовки бетона",
        "Concrete grinder"
      ),
      desc: L(
        "Beton polni tekislash va sifatli yuza tayyorlash uchun zatirovka. Polni laminat yoki plitka uchun mukammal tayyorlaydi.",
        "Затирка для выравнивания бетонного пола и подготовки качественной поверхности. Идеально готовит пол под ламинат или плитку.",
        "Grinder for levelling concrete floors and prepping a quality surface. Prepares the floor perfectly for laminate or tile."
      ),
    },
    {
      icon: "Wrench",
      name: L(
        "Suvli plitka kesish dastgohi",
        "Станок для мокрой резки плитки",
        "Wet tile cutter"
      ),
      desc: L(
        "Plitka ishlarini katta hajmda bajarish uchun. Suv bilan sovutish — chang yo'q, qizish yo'q, tovush ham past.",
        "Для больших объёмов плиточных работ. Водяное охлаждение — без пыли, без перегрева и с низким уровнем шума.",
        "For high-volume tile work. Water cooling — no dust, no overheating, low noise."
      ),
    },
    {
      icon: "Zap",
      name: L(
        "Pnevmosiqim mashinasi",
        "Пневмонагнетатель",
        "Pneumatic pump"
      ),
      desc: L(
        "Eritmani aralashtirib 100 metr balandlikgacha uzatuvchi qurilma. Yuqori qavatlarda tezlikni 5 baravar oshiradi.",
        "Устройство, смешивающее и подающее раствор на высоту до 100 метров. Ускоряет работу на верхних этажах в 5 раз.",
        "Pumps mixed compound up to 100 m. Boosts speed on upper floors by 5×."
      ),
    },
  ];
  for (let i = 0; i < equipment.length; i++) {
    await prisma.equipment.create({ data: { ...equipment[i], order: i } });
  }
  console.log("✓ Equipment:", equipment.length);

  // Portfolio projects (residential + commercial), fully localized
  const projects = [
    {
      slug: "yunusobod-design",
      name: L(
        "Yunusobod · Dizaynerlik",
        "Юнусабад · Дизайнерский",
        "Yunusabad · Designer"
      ),
      tagline: L(
        "Klassik dizaynerlik remont — 102 m²",
        "Классический дизайнерский ремонт — 102 м²",
        "Classic designer renovation — 102 m²"
      ),
      shortDesc: L(
        "Yunusobod 4-kvartalda joylashgan 3 xonali xonadonda to'liq dizaynerlik remont. Lyustralar, marmar plitka, lepnina elementlari bilan yakunlandi.",
        "Полный дизайнерский ремонт в 3-комнатной квартире на 4-квартале Юнусабада. Завершён люстрами, мраморной плиткой и лепниной.",
        "Full designer renovation in a 3-room apartment at Yunusabad 4th quarter. Finished with chandeliers, marble tiles and stucco elements."
      ),
      address: L(
        "Toshkent, Yunusobod tumani, 4-kvartal",
        "Ташкент, Юнусабадский р-н, 4-квартал",
        "Tashkent, Yunusabad district, 4th quarter"
      ),
      landmark: L(
        "Maktab va metro yonida",
        "Рядом со школой и метро",
        "Near school and metro"
      ),
      image:
        "https://optim.tildacdn.one/tild3261-3632-4734-b332-343333653933/-/format/webp/02_3-min.jpg.webp",
      renovationType: L("Dizaynerlik", "Дизайнерский", "Designer"),
      duration: L("90 kun", "90 дней", "90 days"),
      area: "102 m²",
      pricePerSqm: "$135 / m²",
      rooms: L("3 xonali", "3-комнатная", "3-room"),
      tech: L("Toza topshiruv", "Чистовая сдача", "Clean handover"),
      docs: L(
        "Shartnoma · 2 yil kafolat",
        "Договор · 2 года гарантии",
        "Contract · 2-year warranty"
      ),
      price: "$135 / m²",
      apartments: JSON.stringify([
        {
          rooms: L("Yashash xonasi", "Гостиная", "Living room"),
          size: "32 m²",
          plan: L("Klassik", "Классический", "Classic"),
        },
        {
          rooms: L("Yotoq xonasi", "Спальня", "Bedroom"),
          size: "18 m²",
          plan: L("Klassik", "Классический", "Classic"),
        },
        {
          rooms: L("Bolalar xonasi", "Детская", "Kids' room"),
          size: "16 m²",
          plan: L("Yorqin", "Светлый", "Bright"),
        },
        {
          rooms: L(
            "Oshxona·hammom",
            "Кухня·ванная",
            "Kitchen · bathroom"
          ),
          size: "26 m²",
          plan: L("Premium plitka", "Премиум плитка", "Premium tiles"),
        },
      ]),
      amenities: JSON.stringify([
        {
          icon: "Monitor",
          label: L(
            "3D dizayn-loyiha",
            "3D дизайн-проект",
            "3D design project"
          ),
        },
        {
          icon: "Frame",
          label: L(
            "Lepnina va bordyurlar",
            "Лепнина и бордюры",
            "Stucco & borders"
          ),
        },
        {
          icon: "Lightbulb",
          label: L(
            "Premium lyustralar",
            "Премиум люстры",
            "Premium chandeliers"
          ),
        },
        {
          icon: "LayoutGrid",
          label: L("Marmar plitka", "Мраморная плитка", "Marble tiles"),
        },
        {
          icon: "ArrowUpFromLine",
          label: L(
            "Natyajnoy potolok",
            "Натяжной потолок",
            "Stretch ceiling"
          ),
        },
        {
          icon: "Thermometer",
          label: L(
            "Issiq pol tizimi",
            "Тёплый пол",
            "Underfloor heating"
          ),
        },
        {
          icon: "Bath",
          label: L(
            "Premium santexnika",
            "Премиум сантехника",
            "Premium plumbing"
          ),
        },
        {
          icon: "Paintbrush",
          label: L(
            "Dekorativ shpaklyovka",
            "Декоративная шпаклёвка",
            "Decorative putty"
          ),
        },
      ]),
      safety: JSON.stringify([
        {
          icon: "Camera",
          label: L(
            "Foto · video hisobot",
            "Фото · видеоотчёт",
            "Photo · video reports"
          ),
        },
        {
          icon: "Zap",
          label: L(
            "Sertifikatlangan elektr",
            "Сертифицированная электрика",
            "Certified wiring"
          ),
        },
        {
          icon: "Droplets",
          label: L(
            "Suv o'tkazmaslik testi",
            "Тест на гидроизоляцию",
            "Waterproofing test"
          ),
        },
        {
          icon: "Wifi",
          label: L("Smart-uy tayyor", "Smart-дом готов", "Smart-home ready"),
        },
      ]),
      matrix: JSON.stringify([
        {
          icon: "Heart",
          type: L("Yosh oilalar", "Молодые семьи", "Young families"),
          solution: L(
            "Yagona uy uchun investitsiya",
            "Инвестиция в единственное жильё",
            "Investment in the sole home"
          ),
        },
        {
          icon: "Baby",
          type: L(
            "Farzandli oilalar",
            "Семьи с детьми",
            "Families with children"
          ),
          solution: L(
            "Bolalar xonasi alohida loyihalandi",
            "Детская спроектирована отдельно",
            "Kids' room designed separately"
          ),
        },
        {
          icon: "Sprout",
          type: L(
            "Premium ehtiyoji bor",
            "Премиум-запрос",
            "Premium requirement"
          ),
          solution: L(
            "Klassik uslub, sifatli detallar",
            "Классический стиль, качественные детали",
            "Classic style, quality detailing"
          ),
        },
        {
          icon: "TrendingUp",
          type: L(
            "Ijara berish niyatida",
            "Под сдачу в аренду",
            "Planning to rent out"
          ),
          solution: L(
            "Yuqori darajadagi ijara qiymati",
            "Высокая арендная ставка",
            "High rental value"
          ),
        },
      ]),
      advantages: JSON.stringify([
        L(
          "3D loyiha asosida bajarildi",
          "Выполнено по 3D-проекту",
          "Built from a 3D design"
        ),
        L(
          "Faqat sertifikatlangan materiallar",
          "Только сертифицированные материалы",
          "Only certified materials"
        ),
        L(
          "Belgilangan muddatda topshirildi",
          "Сдано в срок",
          "Delivered on schedule"
        ),
      ]),
      paymentOptions: JSON.stringify([
        L("Naqd", "Наличные", "Cash"),
        L("Bo'lib to'lash", "Рассрочка", "Instalments"),
        L("Bosqichli", "Поэтапно", "Staged"),
      ]),
      order: 0,
    },
    {
      slug: "shayxontoxur-capital",
      name: L(
        "Shayxontoxur · Kapital",
        "Шайхантахур · Капитальный",
        "Shaykhantakhur · Major"
      ),
      tagline: L(
        "Kapital remont — 74 m²",
        "Капитальный ремонт — 74 м²",
        "Major renovation — 74 m²"
      ),
      shortDesc: L(
        "Shayxontoxur tumani, Jangox massivida joylashgan 2 xonali xonadon — to'liq demontajdan boshlab yangi kommunikatsiyalar bilan kapital remont.",
        "2-комнатная квартира в массиве Жангох Шайхантахурского р-на — капитальный ремонт от полного демонтажа до новых коммуникаций.",
        "2-room apartment in the Jangokh block of Shaykhantakhur — major renovation from full strip-out to new utilities."
      ),
      address: L(
        "Toshkent, Shayxontoxur tumani, Jangox MFY",
        "Ташкент, Шайхантахурский р-н, махалля Жангох",
        "Tashkent, Shaykhantakhur district, Jangokh mahalla"
      ),
      landmark: L(
        "Markaziy bozor yaqinida",
        "Рядом с центральным рынком",
        "Near the central bazaar"
      ),
      image:
        "https://optim.tildacdn.one/tild3765-6638-4133-b366-356365393664/-/format/webp/03_2-min.jpg.webp",
      renovationType: L("Kapital", "Капитальный", "Major"),
      duration: L("60 kun", "60 дней", "60 days"),
      area: "74 m²",
      pricePerSqm: "$135 / m²",
      rooms: L("2 xonali", "2-комнатная", "2-room"),
      tech: L(
        "Yangi kommunikatsiyalar",
        "Новые коммуникации",
        "New utilities"
      ),
      docs: L(
        "Shartnoma · 2 yil kafolat",
        "Договор · 2 года гарантии",
        "Contract · 2-year warranty"
      ),
      price: "$135 / m²",
      apartments: JSON.stringify([
        {
          rooms: L("Yashash xonasi", "Гостиная", "Living room"),
          size: "24 m²",
          plan: L("Loft uslubida", "В стиле лофт", "Loft style"),
        },
        {
          rooms: L("Yotoq xonasi", "Спальня", "Bedroom"),
          size: "16 m²",
          plan: L("Sokin tonlar", "Спокойные тона", "Calm tones"),
        },
        {
          rooms: L("Oshxona", "Кухня", "Kitchen"),
          size: "12 m²",
          plan: L("Modern", "Современная", "Modern"),
        },
        {
          rooms: L("Hammom", "Ванная", "Bathroom"),
          size: "5 m²",
          plan: L("Plitka", "Плитка", "Tile"),
        },
      ]),
      amenities: JSON.stringify([
        {
          icon: "Zap",
          label: L(
            "To'liq elektr almashtirish",
            "Полная замена электрики",
            "Full electrical rewiring"
          ),
        },
        {
          icon: "Droplets",
          label: L(
            "Yangi suv quvurlari",
            "Новые водопроводные трубы",
            "New water piping"
          ),
        },
        {
          icon: "Thermometer",
          label: L(
            "Issiqlik izolyatsiya",
            "Теплоизоляция",
            "Thermal insulation"
          ),
        },
        {
          icon: "Layers",
          label: L(
            "Pol tekislash · laminat",
            "Выравнивание пола · ламинат",
            "Floor levelling · laminate"
          ),
        },
        {
          icon: "DoorOpen",
          label: L("MDF eshiklar", "Двери МДФ", "MDF doors"),
        },
        {
          icon: "Flame",
          label: L(
            "Mustaqil isitish tizimi",
            "Автономное отопление",
            "Independent heating"
          ),
        },
      ]),
      safety: JSON.stringify([
        {
          icon: "Lock",
          label: L(
            "Sifatli ohanglatish",
            "Качественная защита",
            "Quality lock-up"
          ),
        },
        {
          icon: "Camera",
          label: L(
            "Har kunlik foto-hisobot",
            "Ежедневный фотоотчёт",
            "Daily photo report"
          ),
        },
        {
          icon: "Droplets",
          label: L(
            "Gidroizolyatsiya testi",
            "Тест гидроизоляции",
            "Waterproofing test"
          ),
        },
        {
          icon: "Wifi",
          label: L(
            "Yashirin internet kabel",
            "Скрытый интернет-кабель",
            "Hidden internet cable"
          ),
        },
      ]),
      matrix: JSON.stringify([
        {
          icon: "Heart",
          type: L("Birinchi xonadon", "Первая квартира", "First home"),
          solution: L(
            "To'liq yashashga tayyor",
            "Полностью готова к проживанию",
            "Fully move-in ready"
          ),
        },
        {
          icon: "Baby",
          type: L("Yosh oilalar", "Молодые семьи", "Young families"),
          solution: L(
            "Maktab yaqin, qulay infratuzilma",
            "Школа рядом, удобная инфраструктура",
            "School nearby, convenient infrastructure"
          ),
        },
        {
          icon: "Sprout",
          type: L("Sokin yashash", "Тихое проживание", "Quiet living"),
          solution: L(
            "Issiqlik va shovqin izolyatsiya",
            "Тепло- и шумоизоляция",
            "Heat & sound insulation"
          ),
        },
        {
          icon: "TrendingUp",
          type: L(
            "Ijara investitsiya",
            "Аренда-инвестиция",
            "Rental investment"
          ),
          solution: L(
            "Yuqori talabga ega hudud",
            "Район с высоким спросом",
            "High-demand area"
          ),
        },
      ]),
      advantages: JSON.stringify([
        L(
          "Eski qatlamlar to'liq olib tashlandi",
          "Старые слои полностью сняты",
          "Old layers completely stripped"
        ),
        L(
          "Barcha kommunikatsiyalar yangi",
          "Все коммуникации новые",
          "All utilities replaced"
        ),
        L(
          "60 kunda qo'lga topshirildi",
          "Сдано за 60 дней",
          "Handed over in 60 days"
        ),
      ]),
      paymentOptions: JSON.stringify([
        L("Naqd", "Наличные", "Cash"),
        L("Bo'lib to'lash", "Рассрочка", "Instalments"),
        L("Bosqichli", "Поэтапно", "Staged"),
      ]),
      order: 1,
    },
    {
      slug: "chilonzor-cosmetic",
      name: L(
        "Chilonzor · Kosmetik",
        "Чиланзар · Косметический",
        "Chilonzor · Cosmetic"
      ),
      tagline: L(
        "Kosmetik remont — 58 m²",
        "Косметический ремонт — 58 м²",
        "Cosmetic renovation — 58 m²"
      ),
      shortDesc: L(
        "Chilonzor tumanida 2 xonali xonadon uchun tezkor kosmetik remont — devorlar, polni va shiftni yangilash, oboi va laminat o'rnatildi.",
        "Быстрый косметический ремонт 2-комнатной в Чиланзаре — обновление стен, пола и потолка, обои и ламинат.",
        "Quick cosmetic refresh of a 2-room in Chilonzor — walls, floor and ceiling refreshed, wallpaper and laminate installed."
      ),
      address: L(
        "Toshkent, Chilonzor tumani, 19-kvartal",
        "Ташкент, Чиланзарский р-н, 19-квартал",
        "Tashkent, Chilonzor district, 19th quarter"
      ),
      landmark: L(
        "Stadion yaqinida",
        "Рядом со стадионом",
        "Near the stadium"
      ),
      image:
        "https://optim.tildacdn.one/tild3431-6637-4561-b338-646131366230/-/format/webp/07_2-min.jpg.webp",
      renovationType: L("Kosmetik", "Косметический", "Cosmetic"),
      duration: L("30 kun", "30 дней", "30 days"),
      area: "58 m²",
      pricePerSqm: "$95 / m²",
      rooms: L("2 xonali", "2-комнатная", "2-room"),
      tech: L("Tezkor topshirish", "Быстрая сдача", "Fast handover"),
      docs: L(
        "Shartnoma · 2 yil kafolat",
        "Договор · 2 года гарантии",
        "Contract · 2-year warranty"
      ),
      price: "$95 / m²",
      apartments: JSON.stringify([
        {
          rooms: L("Yashash xonasi", "Гостиная", "Living room"),
          size: "20 m²",
          plan: L("Yangi oboi", "Новые обои", "New wallpaper"),
        },
        {
          rooms: L("Yotoq xonasi", "Спальня", "Bedroom"),
          size: "14 m²",
          plan: L("Yumshoq tonlar", "Мягкие тона", "Soft tones"),
        },
        {
          rooms: L("Oshxona", "Кухня", "Kitchen"),
          size: "10 m²",
          plan: L("Plitka fartuk", "Фартук из плитки", "Tile backsplash"),
        },
        {
          rooms: L("Hammom", "Ванная", "Bathroom"),
          size: "4 m²",
          plan: L("Yangi plitka", "Новая плитка", "New tile"),
        },
      ]),
      amenities: JSON.stringify([
        {
          icon: "Brush",
          label: L(
            "Yangi oboi yopishtirish",
            "Поклейка новых обоев",
            "New wallpaper installation"
          ),
        },
        {
          icon: "Paintbrush",
          label: L(
            "Devor va shift bo'yog'i",
            "Покраска стен и потолка",
            "Wall & ceiling painting"
          ),
        },
        {
          icon: "Layers",
          label: L(
            "Laminat o'rnatish",
            "Укладка ламината",
            "Laminate installation"
          ),
        },
        {
          icon: "Ruler",
          label: L(
            "Plintus o'rnatish",
            "Установка плинтуса",
            "Skirting installation"
          ),
        },
        {
          icon: "Zap",
          label: L(
            "Rozetka almashtirish",
            "Замена розеток",
            "Outlet replacement"
          ),
        },
        {
          icon: "Store",
          label: L(
            "Yakuniy klininglik",
            "Финальный клининг",
            "Final cleaning"
          ),
        },
      ]),
      safety: JSON.stringify([
        {
          icon: "Camera",
          label: L(
            "Sifat tekshiruvi",
            "Контроль качества",
            "Quality control"
          ),
        },
        {
          icon: "Lock",
          label: L(
            "Mol-mulk himoyasi",
            "Защита имущества",
            "Property protection"
          ),
        },
        {
          icon: "Zap",
          label: L(
            "Sertifikatlangan bo'yoq",
            "Сертифицированная краска",
            "Certified paint"
          ),
        },
        {
          icon: "Droplets",
          label: L("Bosim testi", "Опрессовка", "Pressure test"),
        },
      ]),
      matrix: JSON.stringify([
        {
          icon: "Heart",
          type: L("Ijara berish", "Под аренду", "For rent"),
          solution: L(
            "Tez yangilanish, past xarajat",
            "Быстрое обновление, низкая стоимость",
            "Quick refresh, low cost"
          ),
        },
        {
          icon: "Baby",
          type: L("Yosh oilalar", "Молодые семьи", "Young families"),
          solution: L(
            "Yangi uy effekti — kichik byudjetda",
            "Эффект новой квартиры за небольшой бюджет",
            "Feels like a new home on a small budget"
          ),
        },
        {
          icon: "TrendingUp",
          type: L("Sotuv oldi", "Перед продажей", "Pre-sale"),
          solution: L(
            "Bozor qiymatini oshiradi",
            "Повышает рыночную стоимость",
            "Raises market value"
          ),
        },
        {
          icon: "Briefcase",
          type: L("Tezkor ko'chish", "Срочный переезд", "Urgent move-in"),
          solution: L("30 kunda tayyor", "Готово за 30 дней", "Ready in 30 days"),
        },
      ]),
      advantages: JSON.stringify([
        L("Eng tezkor variant", "Самый быстрый вариант", "The fastest option"),
        L(
          "Past byudjetda yuqori effekt",
          "Высокий эффект при малом бюджете",
          "Big effect on a small budget"
        ),
        L("30 kunda topshirildi", "Сдано за 30 дней", "Delivered in 30 days"),
      ]),
      paymentOptions: JSON.stringify([
        L("Naqd", "Наличные", "Cash"),
        L("Bo'lib to'lash", "Рассрочка", "Instalments"),
      ]),
      order: 2,
    },
    {
      slug: "mirzo-bathroom",
      name: L(
        "Mirzo Ulug'bek · Sanuzel",
        "Мирзо-Улугбек · Санузел",
        "Mirzo Ulugbek · Bathroom"
      ),
      tagline: L(
        "Hammom va oshxona maxsus loyihasi — 18 m²",
        "Спецпроект ванной и кухни — 18 м²",
        "Bathroom & kitchen special — 18 m²"
      ),
      shortDesc: L(
        "Mirzo Ulug'bek tumanida hammom va oshxona uchun maxsus loyiha. Premium plitka, gidroizolyatsiya va yashirin santexnika.",
        "Спецпроект ванной и кухни в Мирзо-Улугбекском районе. Премиум плитка, гидроизоляция и скрытая сантехника.",
        "Bathroom & kitchen special in Mirzo Ulugbek. Premium tile, waterproofing and concealed plumbing."
      ),
      address: L(
        "Toshkent, Mirzo Ulug'bek tumani, Buyuk Ipak Yo'li",
        "Ташкент, Мирзо-Улугбекский р-н, Буюк Ипак Йули",
        "Tashkent, Mirzo Ulugbek district, Buyuk Ipak Yuli"
      ),
      landmark: L(
        "Metro Mashinasozlar yonida",
        "Рядом со станцией Машинасозлар",
        "Near Mashinasozlar metro"
      ),
      image:
        "https://optim.tildacdn.one/tild3163-3763-4961-a637-333862663230/-/format/webp/04-min.jpg.webp",
      renovationType: L("Maxsus", "Специальный", "Special"),
      duration: L("25 kun", "25 дней", "25 days"),
      area: "18 m²",
      pricePerSqm: "$220 / m²",
      rooms: L(
        "Hammom + oshxona",
        "Ванная + кухня",
        "Bathroom + kitchen"
      ),
      tech: L("Premium plitka", "Премиум плитка", "Premium tile"),
      docs: L(
        "Shartnoma · 2 yil kafolat",
        "Договор · 2 года гарантии",
        "Contract · 2-year warranty"
      ),
      price: "$220 / m²",
      apartments: JSON.stringify([
        {
          rooms: L("Hammom", "Ванная", "Bathroom"),
          size: "5 m²",
          plan: L("Italyan plitka", "Итальянская плитка", "Italian tile"),
        },
        {
          rooms: L("Hojatxona", "Туалет", "WC"),
          size: "2 m²",
          plan: L("Walk-in dush", "Walk-in душ", "Walk-in shower"),
        },
        {
          rooms: L("Oshxona", "Кухня", "Kitchen"),
          size: "11 m²",
          plan: L(
            "Modulli mebel",
            "Модульная мебель",
            "Modular furniture"
          ),
        },
      ]),
      amenities: JSON.stringify([
        {
          icon: "TreePine",
          label: L("Premium plitka", "Премиум плитка", "Premium tile"),
        },
        {
          icon: "Baby",
          label: L("Issiq pol", "Тёплый пол", "Heated floor"),
        },
        {
          icon: "Briefcase",
          label: L(
            "Yashirin santexnika",
            "Скрытая сантехника",
            "Concealed plumbing"
          ),
        },
        {
          icon: "GraduationCap",
          label: L("LED yoritish", "LED-освещение", "LED lighting"),
        },
        {
          icon: "Car",
          label: L(
            "Sensor jo'mraklar",
            "Сенсорные смесители",
            "Sensor faucets"
          ),
        },
        {
          icon: "Store",
          label: L(
            "Aqlli ventilyatsiya",
            "Умная вентиляция",
            "Smart ventilation"
          ),
        },
      ]),
      safety: JSON.stringify([
        {
          icon: "Camera",
          label: L(
            "Bosim sinov hujjati",
            "Акт опрессовки",
            "Pressure test report"
          ),
        },
        {
          icon: "Droplets",
          label: L(
            "Gidroizolyatsiya 2 qatlam",
            "Гидроизоляция в 2 слоя",
            "Double-layer waterproofing"
          ),
        },
        {
          icon: "Zap",
          label: L(
            "Namlikka chidamli elektr",
            "Влагостойкая электрика",
            "Moisture-resistant wiring"
          ),
        },
        {
          icon: "Wifi",
          label: L(
            "Yashirin kabel kanali",
            "Скрытый кабель-канал",
            "Concealed cable channel"
          ),
        },
      ]),
      matrix: JSON.stringify([
        {
          icon: "Heart",
          type: L(
            "Mavjud xonadon egalari",
            "Владельцы квартиры",
            "Existing owners"
          ),
          solution: L(
            "Faqat sanuzelni yangilash",
            "Обновление только санузла",
            "Bathroom-only refresh"
          ),
        },
        {
          icon: "Baby",
          type: L(
            "Farzandli oilalar",
            "Семьи с детьми",
            "Families with children"
          ),
          solution: L(
            "Xavfsiz va qulay hammom",
            "Безопасная и удобная ванная",
            "Safe and convenient bathroom"
          ),
        },
        {
          icon: "TrendingUp",
          type: L(
            "Premium yondashuv",
            "Премиум подход",
            "Premium approach"
          ),
          solution: L(
            "Yuqori darajali materiallar",
            "Высококачественные материалы",
            "Top-tier materials"
          ),
        },
        {
          icon: "Briefcase",
          type: L("Tezkor xizmat", "Быстрый сервис", "Fast service"),
          solution: L(
            "25 kunda topshirildi",
            "Сдано за 25 дней",
            "Delivered in 25 days"
          ),
        },
      ]),
      advantages: JSON.stringify([
        L(
          "Eng ko'p ehtiyot talab qilingan zona",
          "Самая ответственная зона",
          "The most demanding zone"
        ),
        L(
          "2 yil suv o'tkazmaslik kafolati",
          "2 года гарантии гидроизоляции",
          "2-year waterproofing warranty"
        ),
        L(
          "Premium santexnika brendlari",
          "Премиум-бренды сантехники",
          "Premium plumbing brands"
        ),
      ]),
      paymentOptions: JSON.stringify([
        L("Naqd", "Наличные", "Cash"),
        L("Bo'lib to'lash", "Рассрочка", "Instalments"),
        L("Bosqichli", "Поэтапно", "Staged"),
      ]),
      badge: L("YANGI", "НОВЫЙ", "NEW"),
      order: 3,
    },
    {
      slug: "ofis-yunusobod",
      name: L(
        "Ofis remont · Yunusobod",
        "Ремонт офиса · Юнусабад",
        "Office renovation · Yunusabad"
      ),
      tagline: L(
        "Open-space ofis · 180 m²",
        "Open-space офис · 180 м²",
        "Open-space office · 180 m²"
      ),
      shortDesc: L(
        "Tijorat ofisi uchun zamonaviy yechim — open-space va 3 alohida xona.",
        "Современное решение для офиса — open-space и 3 отдельных кабинета.",
        "A modern office solution — open-space plus 3 separate rooms."
      ),
      address: L(
        "Toshkent, Yunusobod tumani",
        "Ташкент, Юнусабадский р-н",
        "Tashkent, Yunusabad district"
      ),
      landmark: L(
        "Tijorat markaziy zona",
        "Центральная коммерческая зона",
        "Central commercial zone"
      ),
      image:
        "https://optim.tildacdn.one/tild3431-6637-4561-b338-646131366230/-/format/webp/07_2-min.jpg.webp",
      renovationType: L("Tijorat", "Коммерческий", "Commercial"),
      duration: L("50 kun", "50 дней", "50 days"),
      area: "180 m²",
      pricePerSqm: "$140 / m²",
      rooms: L("Ofis", "Офис", "Office"),
      tech: L("LAN tarmog'i", "LAN-сеть", "LAN network"),
      docs: L(
        "Shartnoma · 2 yil kafolat",
        "Договор · 2 года гарантии",
        "Contract · 2-year warranty"
      ),
      price: "$140 / m²",
      apartments: JSON.stringify([]),
      amenities: JSON.stringify([]),
      safety: JSON.stringify([]),
      matrix: JSON.stringify([]),
      advantages: JSON.stringify([]),
      paymentOptions: JSON.stringify([
        L("Naqd", "Наличные", "Cash"),
        L("Bo'lib to'lash", "Рассрочка", "Instalments"),
      ]),
      isCommercial: true,
      commBlocks: L(
        "Open-space ofis · 3 alohida xona",
        "Open-space · 3 отдельных кабинета",
        "Open-space · 3 separate rooms"
      ),
      commUnits: L("180 m² maydon", "180 м² площадь", "180 m² area"),
      commStatus: L("Topshirildi", "Сдано", "Delivered"),
      commSize: "180 m²",
      commBenefits: L(
        "Konditsioner · LAN tarmog'i · LED yoritish",
        "Кондиционер · LAN-сеть · LED-освещение",
        "AC · LAN network · LED lighting"
      ),
      order: 4,
    },
    {
      slug: "restoran-mirobod",
      name: L(
        "Restoran zali · Mirobod",
        "Ресторан · Мирабад",
        "Restaurant hall · Mirobod"
      ),
      tagline: L(
        "Mehmon zali va oshxona · 240 m²",
        "Зал и кухня · 240 м²",
        "Dining hall & kitchen · 240 m²"
      ),
      shortDesc: L(
        "Restoran uchun maxsus loyiha — mehmon zali, oshxona va sanuzellar.",
        "Спецпроект для ресторана — зал, кухня и санузлы.",
        "Special restaurant project — dining hall, kitchen and washrooms."
      ),
      address: L(
        "Toshkent, Mirobod tumani",
        "Ташкент, Мирабадский р-н",
        "Tashkent, Mirobod district"
      ),
      landmark: L(
        "Markaziy yo'l bo'yida",
        "На центральной улице",
        "On the main street"
      ),
      image:
        "https://optim.tildacdn.one/tild3261-3632-4734-b332-343333653933/-/format/webp/02_3-min.jpg.webp",
      renovationType: L("Tijorat", "Коммерческий", "Commercial"),
      duration: L("75 kun", "75 дней", "75 days"),
      area: "240 m²",
      pricePerSqm: "$160 / m²",
      rooms: L("Restoran", "Ресторан", "Restaurant"),
      tech: L("Gaz sertifikat", "Газовый сертификат", "Gas certificate"),
      docs: L(
        "Shartnoma · 2 yil kafolat",
        "Договор · 2 года гарантии",
        "Contract · 2-year warranty"
      ),
      price: "$160 / m²",
      apartments: JSON.stringify([]),
      amenities: JSON.stringify([]),
      safety: JSON.stringify([]),
      matrix: JSON.stringify([]),
      advantages: JSON.stringify([]),
      paymentOptions: JSON.stringify([
        L("Naqd", "Наличные", "Cash"),
        L("Bo'lib to'lash", "Рассрочка", "Instalments"),
      ]),
      isCommercial: true,
      commBlocks: L(
        "Mehmon zali · oshxona · sanuzellar",
        "Зал · кухня · санузлы",
        "Hall · kitchen · washrooms"
      ),
      commUnits: L("240 m² maydon", "240 м² площадь", "240 m² area"),
      commStatus: L("Topshirildi", "Сдано", "Delivered"),
      commSize: "240 m²",
      commBenefits: L(
        "Kuchli ventilyatsiya · gaz sertifikat · dekorativ devorlar",
        "Мощная вентиляция · газовый сертификат · декор-стены",
        "Heavy ventilation · gas certificate · decorative walls"
      ),
      order: 5,
    },
  ];
  for (const p of projects) {
    await prisma.portfolioProject.create({ data: p });
  }
  console.log("✓ Portfolio projects:", projects.length);

  console.log("\n✅ Seed completed. Login: admin / bisma2026");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
