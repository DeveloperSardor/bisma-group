-- CreateTable
CREATE TABLE "AdminUser" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdminUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PortfolioProject" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "tagline" TEXT NOT NULL,
    "shortDesc" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "landmark" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "renovationType" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "area" TEXT NOT NULL,
    "pricePerSqm" TEXT NOT NULL,
    "rooms" TEXT NOT NULL,
    "tech" TEXT NOT NULL,
    "docs" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "apartments" TEXT NOT NULL,
    "amenities" TEXT NOT NULL,
    "safety" TEXT NOT NULL,
    "matrix" TEXT NOT NULL,
    "advantages" TEXT NOT NULL,
    "paymentOptions" TEXT NOT NULL,
    "badge" TEXT,
    "isCommercial" BOOLEAN NOT NULL DEFAULT false,
    "commBlocks" TEXT,
    "commUnits" TEXT,
    "commStatus" TEXT,
    "commSize" TEXT,
    "commBenefits" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PortfolioProject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Service" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "shortDesc" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "bigStats" TEXT NOT NULL,
    "iconFeatures" TEXT NOT NULL,
    "iconSpecs" TEXT,
    "variants" TEXT,
    "fractions" TEXT,
    "contactInfo" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Faq" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Faq_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Testimonial" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "age" TEXT NOT NULL,
    "quote" TEXT NOT NULL,
    "result" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Testimonial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MaterialBrand" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MaterialBrand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Equipment" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Equipment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SiteSettings" (
    "id" TEXT NOT NULL DEFAULT 'singleton',
    "heroTitle" TEXT NOT NULL DEFAULT 'Kvartira remontini',
    "heroTitleAccent" TEXT NOT NULL DEFAULT 'g''oyadan topshirishgacha',
    "heroDesc" TEXT NOT NULL DEFAULT 'Bisma Group — Toshkentda yevro-remont xizmatlari. Loyiha, materiallar, ish — barchasi bir qo''lda. 2 yil kafolat, aniq smeta, belgilangan muddat.',
    "phone" TEXT NOT NULL DEFAULT '+998 78 122 75 75',
    "phoneRaw" TEXT NOT NULL DEFAULT '+998781227575',
    "email" TEXT NOT NULL DEFAULT 'info@bismagroup.uz',
    "offices" TEXT NOT NULL DEFAULT '[]',
    "aboutFoundedYear" TEXT NOT NULL DEFAULT '2014',
    "aboutExperienceYears" TEXT NOT NULL DEFAULT '11',
    "aboutProjectsCount" TEXT NOT NULL DEFAULT '500+',
    "aboutWarranty" TEXT NOT NULL DEFAULT '2 yil',
    "telegramUrl" TEXT NOT NULL DEFAULT 'https://t.me/',
    "whatsappUrl" TEXT NOT NULL DEFAULT 'https://wa.me/998781227575',
    "instagramUrl" TEXT NOT NULL DEFAULT 'https://instagram.com/',
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SiteSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactSubmission" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "project" TEXT,
    "type" TEXT,
    "message" TEXT,
    "status" TEXT NOT NULL DEFAULT 'new',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContactSubmission_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AdminUser_username_key" ON "AdminUser"("username");

-- CreateIndex
CREATE UNIQUE INDEX "PortfolioProject_slug_key" ON "PortfolioProject"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Service_slug_key" ON "Service"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Testimonial_slug_key" ON "Testimonial"("slug");
