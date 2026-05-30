'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import BlurImage from '../../components/BlurImage';

interface Post {
  id: number;
  title: string;
  date: string;
  category: string;
  image: string;
  content: Array<{ type: string; value: string }>;
}

export default function BlogClient({ post }: { post: Post }) {
  return (
    <div className="editorial-page-v10">
      <nav className="editorial-nav">
        <div className="nav-inner">
          <Link href="/" className="back-link">← НАЗАД К САЙТУ</Link>
          <div className="nav-logo">BISMA GROUP</div>
        </div>
      </nav>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="editorial-hero"
      >
        <Image
          src={post.image}
          alt={post.title}
          fill
          preload
          loading="eager"
          fetchPriority="high"
          sizes="100vw"
          quality={90}
          className="hero-bg"
          style={{ objectFit: 'cover' }}
        />
        <div className="hero-overlay">
          <div className="hero-content">
            <span className="hero-cat">{post.category}</span>
            <h1 className="hero-title">{post.title}</h1>
            <div className="hero-meta">
              <span>{post.date}</span>
              <span className="dot"></span>
              <span>BISMA BUREAU</span>
            </div>
          </div>
        </div>
      </motion.div>

      <article className="editorial-body">
        {post.content.map((item, idx) => (
          <div key={idx} className="content-block">
            {item.type === 'text' && <p className="article-p">{item.value}</p>}
            {item.type === 'image' && (
              <div className="article-img">
                <BlurImage
                  src={item.value}
                  alt="Detail"
                  width={1600}
                  height={1000}
                  sizes="(max-width: 900px) 100vw, 900px"
                  quality={85}
                  style={{ width: '100%', height: 'auto' }}
                />
              </div>
            )}
          </div>
        ))}
      </article>

      <footer className="editorial-footer">
        <div className="footer-line"></div>
        <Link href="/" className="footer-btn">ВЕРНУТЬСЯ НА ГЛАВНУЮ</Link>
      </footer>

      <style jsx>{`
        .editorial-page-v10 { background: #ffffff; color: var(--brand-navy); min-height: 100vh; }
        .editorial-nav { position: fixed; top: 0; width: 100%; height: 80px; background: rgba(255, 255, 255, 0.9); backdrop-filter: blur(20px); z-index: 100; border-bottom: 1px solid rgba(20, 20, 66, 0.05); }
        .nav-inner { max-width: 1700px; margin: 0 auto; height: 100%; display: flex; align-items: center; justify-content: space-between; padding: 0 50px; }
        .back-link { color: #00ccff; font-size: 11px; letter-spacing: 0.2em; font-weight: 700; text-decoration: none; }
        .nav-logo { font-family: var(--font-serif); font-size: 20px; letter-spacing: 0.2em; color: var(--brand-navy); }
        .editorial-hero { position: relative; height: 75vh; width: 100%; overflow: hidden; }
        .hero-bg { width: 100%; height: 100%; object-fit: cover; }
        .hero-overlay { position: absolute; inset: 0; background: linear-gradient(to top, #ffffff 5%, transparent 60%); display: flex; align-items: flex-end; padding: 100px 0; }
        .hero-content { max-width: 1200px; margin: 0 auto; padding: 0 50px; width: 100%; }
        .hero-cat { color: var(--brand-cyan); font-size: 12px; letter-spacing: 0.4em; font-weight: 700; display: block; margin-bottom: 25px; }
        .hero-title { font-family: var(--font-serif); font-size: clamp(2.5rem, 6vw, 5rem); line-height: 1.1; margin-bottom: 40px; font-weight: 300; color: var(--brand-navy); }
        .hero-meta { display: flex; align-items: center; gap: 20px; color: rgba(20, 20, 66, 0.5); font-size: 14px; letter-spacing: 0.1em; }
        .dot { width: 4px; height: 4px; background: var(--brand-cyan); border-radius: 50%; }
        .editorial-body { max-width: 900px; margin: 0 auto; padding: 120px 50px; }
        .article-p { font-size: 20px; line-height: 1.8; color: var(--brand-navy); margin-bottom: 60px; font-weight: 300; }
        .article-img { margin: 80px 0; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 50px rgba(20, 20, 66, 0.1); }
        .article-img img { width: 100%; height: auto; display: block; }
        .editorial-footer { padding: 100px 50px; text-align: center; }
        .footer-line { height: 1px; background: rgba(20, 20, 66, 0.05); max-width: 900px; margin: 0 auto 80px; }
        .footer-btn { background: var(--brand-navy); color: #ffffff; padding: 20px 50px; border-radius: 100px; font-size: 11px; font-weight: 800; letter-spacing: 0.2em; text-decoration: none; display: inline-block; transition: all 0.3s ease; }
        .footer-btn:hover { background: var(--brand-cyan); color: var(--brand-navy); transform: translateY(-5px); box-shadow: 0 10px 20px rgba(0, 204, 255, 0.2); }
        @media (max-width: 768px) { .nav-inner { padding: 0 25px; } .hero-title { font-size: 3rem; } .hero-content { padding: 0 25px; } .article-p { font-size: 17px; } .editorial-body { padding: 80px 25px; } }
      `}</style>
    </div>
  );
}
