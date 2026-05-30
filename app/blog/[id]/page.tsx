import BlogClient from './BlogClient';

const posts = [
  {
    id: 1,
    title: "Kvartira remontidan oldin nimalarni e'tiborga olish kerak — 7 muhim qoida",
    date: '12-aprel, 2026',
    category: 'REMONT MASLAHATLARI',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1600',
    content: [
      { type: 'text', value: 'Birinchi marta kvartira remontiga yondashayotgan har bir uy egasi xuddi shu savollar bilan yuzlashadi: qancha turadi, qancha vaqt kerak, qaysi materiallarni tanlash kerak. Mutaxassislarimiz ko‘p yillik tajribadan kelib chiqib 7 ta asosiy qoidani ajratib olishdi.' },
      { type: 'image', value: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200' },
      { type: 'text', value: 'Birinchidan, smeta tuzishdan oldin albatta o‘lchov olishingiz kerak. Aniq raqamlarsiz har qanday hisob-kitob taxminiy bo‘lib qoladi va keyinchalik narx 20–30% ga oshib ketishi mumkin. Bizda smeta tuzish bepul.' },
      { type: 'image', value: 'https://images.unsplash.com/photo-1556912170-45320c91823a?auto=format&fit=crop&q=80&w=1200' },
      { type: 'text', value: 'Ikkinchidan, materialni o‘zingiz emas, ishonchli kompaniya orqali sotib oling. Sertifikatlangan brendlar (Knauf, Ceresit, Tikkurila) faqat rasmiy hamkorlar orqali sotiladi va saxta material xatari nolga teng.' }
    ]
  },
  {
    id: 2,
    title: 'Kosmetik vs Kapital vs Dizaynerlik — qaysi remont turi sizga mos?',
    date: '28-mart, 2026',
    category: 'TURLAR VA NARXLAR',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1600',
    content: [
      { type: 'text', value: "Remont turini tanlashda asosan 3 ta omilni hisobga olish kerak: byudjet, muddat va yakuniy ko‘rinish. Kosmetik remont — eng tezkor va arzon variant ($80–120/m²), 30 kunda yangi ko‘rinish beradi. Asosan oboi, bo‘yoq, laminat almashtiriladi." },
      { type: 'image', value: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1200' },
      { type: 'text', value: "Kapital remont ($120–150/m²) — eski kommunikatsiyalarni butunlay almashtirish, tekislash va yangi qatlam. 60–90 kun davom etadi. Eski binolarda yashayotganlar uchun ideal." }
    ]
  },
  {
    id: 3,
    title: "Materiallarni tejash sirlari — sifatdan voz kechmasdan 15–20% kamaytirish",
    date: '15-mart, 2026',
    category: 'BYUDJET MASLAHATLARI',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1600',
    content: [
      { type: 'text', value: "Remont xarajatlarining 40–50% materiallarga ketadi. Bisma Group brand bilan to‘g‘ridan-to‘g‘ri shartnomalar tufayli mijozlarimiz ulgurji narxda material oladi va bu 15–20% tejaydi." },
      { type: 'image', value: 'https://images.unsplash.com/photo-1449156001437-3a1621dfbe69?auto=format&fit=crop&q=80&w=1200' },
      { type: 'text', value: "Eng muhim narsa — keraksiz 'lyuks' deb sotilayotgan turli xil dekorativ elementlardan voz kechish. Sifatli oddiy material to‘g‘ri o‘rnatilsa, lyuks effektni beradi." }
    ]
  }
];

export async function generateStaticParams() {
  return posts.map((post) => ({
    id: post.id.toString(),
  }));
}

export default async function BlogPost({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const post = posts.find(p => p.id === Number(resolvedParams.id));

  if (!post) return <div style={{ padding: '200px', textAlign: 'center', color: '#fff' }}>Maqola topilmadi</div>;

  return <BlogClient post={post} />;
}
