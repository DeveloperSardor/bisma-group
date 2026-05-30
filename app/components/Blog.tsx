"use client";

import BlurImage from "./BlurImage";
import { Calendar, ArrowRight } from "lucide-react";

const posts = [
  {
    id: 1,
    title: "Kvartira remontidan oldin nimalarni e&#39;tiborga olish kerak — 7 muhim qoida",
    date: "12-aprel, 2026",
    category: "REMONT MASLAHATLARI",
    excerpt:
      "Smeta tuzishdan boshlab material tanlashgacha — birinchi marta remont qilayotganlar uchun mutaxassislardan tavsiyalar.",
    image: "https://optim.tildacdn.one/tild3163-3763-4961-a637-333862663230/-/format/webp/04-min.jpg.webp",
  },
  {
    id: 2,
    title: "Kosmetik vs Kapital vs Dizaynerlik — qaysi remont turi sizga mos?",
    date: "28-mart, 2026",
    category: "TURLAR VA NARXLAR",
    excerpt:
      "Har bir remont turi uchun narxlar, muddatlar va kim uchun mosligi haqida to‘liq qiyosiy tahlil — bizning amaliyot natijalarimiz asosida.",
    image: "https://optim.tildacdn.one/tild3261-3632-4734-b332-343333653933/-/format/webp/02_3-min.jpg.webp",
  },
];

export default function Blog() {
  return (
    <section id="blog" className="bisma-blog-unified">
      <div className="blog-container">
        <header className="blog-header-row">
          <div className="header-left">
            <span className="blog-mini-label">YANGILIKLAR & BLOG</span>
            <h2 className="blog-main-title">
              Remont haqida <span className="title-accent">foydali maslahatlar</span>
            </h2>
          </div>
          <div className="header-right">
            <a href="#contact" className="btn-all-posts">
              XABAR DOR BO&#39;LISH <ArrowRight size={14} style={{ display: "inline-block", marginLeft: 8 }} />
            </a>
          </div>
        </header>

        <div className="blog-grid-v10">
          {posts.map((post) => (
            <div key={post.id} className="blog-card-wrapper">
              <article className="blog-card-v10">
                <div className="blog-img-wrap">
                  <BlurImage
                    src={post.image}
                    alt="Bisma Group news"
                    fill
                    sizes="(max-width: 640px) 100vw, 500px"
                    quality={80}
                    style={{ objectFit: "cover" }}
                    className="blog-img-actual"
                  />
                  <div className="blog-img-overlay">
                    <span className="blog-cat-badge">{post.category}</span>
                  </div>
                </div>
                <div className="blog-info-v10">
                  <div className="blog-date-line">
                    <Calendar size={14} color="#2997ff" />
                    <span>{post.date}</span>
                  </div>
                  <h3
                    className="blog-title-text"
                    dangerouslySetInnerHTML={{ __html: post.title }}
                  />
                  <p className="blog-excerpt">{post.excerpt}</p>
                  <div className="blog-action-line">
                    <a href="#contact" className="read-more-gold">
                      BATAFSIL MA&#39;LUMOT OLIYSH <ArrowRight size={14} />
                    </a>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .bisma-blog-unified {
          color: var(--text-main);
          padding: 120px 0;
          background-color: #ffffff;
        }

        @media (max-width: 768px) {
          .bisma-blog-unified { padding: 80px 0; }
        }

        @media (max-width: 600px) {
          .bisma-blog-unified { padding: 60px 0; }
        }

        .blog-container {
          max-width: 1250px;
          margin: 0 auto;
          padding: 0 40px;
        }

        @media (max-width: 768px) {
          .blog-container { padding: 0 20px; }
        }

        .blog-header-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 60px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
          padding-bottom: 25px;
        }

        @media (max-width: 768px) {
          .blog-header-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 20px;
          }
        }

        .blog-mini-label {
          display: block;
          font-size: 11px;
          letter-spacing: 0.5em;
          color: #2997ff;
          margin-bottom: 18px;
          font-weight: 600;
        }

        @media (max-width: 600px) {
          .blog-mini-label { font-size: 10px; letter-spacing: 0.3em; margin-bottom: 12px; }
        }

        .blog-main-title {
          font-family: var(--font-inter);
          font-size: clamp(1.5rem, 5.5vw, 3.2rem);
          font-weight: 300;
          margin: 0;
          color: var(--text-main);
          line-height: 1.15;
        }

        .title-accent { color: #86868b; font-weight: 500; }

        .btn-all-posts {
          display: inline-flex;
          align-items: center;
          padding: 14px 28px;
          font-size: 11px;
          letter-spacing: 0.1em;
          color: var(--text-main);
          background: transparent;
          border: 1px solid rgba(0, 0, 0, 0.15);
          border-radius: 100px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.4s ease;
          text-decoration: none;
        }

        .btn-all-posts:hover {
          background: #1d1d1f;
          border-color: #1d1d1f;
          color: #2997ff;
        }

        .blog-grid-v10 {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 40px;
        }

        @media (max-width: 768px) {
          .blog-grid-v10 {
            grid-template-columns: 1fr;
            gap: 28px;
          }
        }

        .blog-card-wrapper {
          width: 100%;
        }

        .blog-card-v10 {
          background: #ffffff;
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid rgba(0, 0, 0, 0.06);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.02);
          transition: transform 0.4s ease, box-shadow 0.4s ease;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .blog-card-v10:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.06);
        }

        .blog-img-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 10;
          overflow: hidden;
        }

        .blog-img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.5),
            transparent 60%
          );
          display: flex;
          align-items: flex-start;
          padding: 20px;
          z-index: 2;
          pointer-events: none;
        }

        .blog-cat-badge {
          background: #2997ff;
          color: #1d1d1f;
          padding: 6px 14px;
          font-size: 10px;
          font-weight: 700;
          border-radius: 6px;
          letter-spacing: 0.05em;
        }

        .blog-info-v10 {
          padding: 30px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .blog-date-line {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: rgba(0, 0, 0, 0.5);
          margin-bottom: 14px;
          font-weight: 500;
        }

        .blog-title-text {
          font-family: var(--font-inter);
          font-size: 20px;
          margin-bottom: 15px;
          font-weight: 400;
          line-height: 1.4;
          color: #1d1d1f;
        }

        .blog-excerpt {
          font-size: 14px;
          color: rgba(0, 0, 0, 0.65);
          line-height: 1.7;
          margin-bottom: 24px;
          font-weight: 300;
          flex-grow: 1;
        }

        .blog-action-line {
          border-top: 1px solid rgba(0, 0, 0, 0.05);
          padding-top: 18px;
        }

        .read-more-gold {
          font-size: 11px;
          letter-spacing: 0.1em;
          color: #2997ff;
          font-weight: 700;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          transition: transform 0.3s ease;
        }

        .read-more-gold:hover {
          transform: translateX(4px);
        }
      `}</style>
    </section>
  );
}
