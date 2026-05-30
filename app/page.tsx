import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Portfolio from "./components/Portfolio";
import About from "./components/About";
import Footer from "./components/Footer";
import {
  getSiteSettings,
  getServices,
  getPortfolio,
  getTestimonials,
  getFaqs,
  parseOffices,
} from "../lib/data";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [settings, services, projects, testimonials, faqs] = await Promise.all([
    getSiteSettings(),
    getServices(),
    getPortfolio(6),
    getTestimonials(),
    getFaqs(),
  ]);

  const offices = parseOffices(settings.offices);

  return (
    <main>
      <Navbar phone={settings.phone} phoneRaw={settings.phoneRaw} />
      <Hero
        title={settings.heroTitle}
        accent={settings.heroTitleAccent}
        desc={settings.heroDesc}
        phone={settings.phone}
        projectsCount={settings.aboutProjectsCount}
        experience={settings.aboutExperienceYears}
        warranty={settings.aboutWarranty}
      />
      <Services items={services} />
      <Portfolio items={projects} />
      <About
        founded={settings.aboutFoundedYear}
        experience={settings.aboutExperienceYears}
        projects={settings.aboutProjectsCount}
        warranty={settings.aboutWarranty}
        testimonials={testimonials}
      />
      <Footer
        faqs={faqs}
        offices={offices}
        phone={settings.phone}
        phoneRaw={settings.phoneRaw}
        email={settings.email}
        telegram={settings.telegramUrl}
        whatsapp={settings.whatsappUrl}
        instagram={settings.instagramUrl}
      />
    </main>
  );
}
