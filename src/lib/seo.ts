// SEO Configuration for National Ranking
export const siteConfig = {
  name: "Jay's Web Design Services",
  url: "https://jayswebdesignservices.com",
  title: "Professional Web Design Services | Custom Websites That Convert",
  description:
    "Award-winning web design agency specializing in custom WordPress development, SEO optimization, and conversion-focused websites. Trusted by 100+ businesses nationwide. Get your free quote today.",
  phone: "+1-210-900-1113",
  email: "info@jayswebdesignservices.com",
  address: {
    street: "San Antonio Area",
    city: "San Antonio",
    state: "TX",
    zip: "78201",
    country: "US",
  },
  geo: {
    latitude: 29.4241,
    longitude: -98.4936,
  },
  social: {
    facebook: "https://www.facebook.com/Jayswebdesign",
    twitter: "https://twitter.com/jayswebdesign",
    linkedin: "https://www.linkedin.com/company/jays-web-design-services",
    instagram: "https://www.instagram.com/jayswebdesign",
  },
  logo: "https://jayswebdesignservices.com/logo.png",
  ogImage: "https://jayswebdesignservices.com/og-image.jpg",
};

// Primary keywords for national ranking
export const primaryKeywords = [
  "professional web design services",
  "custom website development",
  "WordPress developer for hire",
  "small business web design",
  "SEO web design agency",
  "responsive website design",
  "ecommerce website development",
  "affordable web design services",
  "business website design",
  "web design company USA",
];

// Long-tail keywords for content strategy
export const longTailKeywords = [
  "best web design company for small business",
  "custom WordPress website development services",
  "professional website design with SEO",
  "affordable responsive web design for startups",
  "how much does professional web design cost",
  "web designer near me with proven results",
  "website redesign services for better conversions",
  "mobile-friendly website design services",
  "local business website design and SEO",
  "WordPress website maintenance and support",
];

// Service-specific schema data
export const services = [
  {
    name: "Custom Web Design",
    description:
      "Bespoke website design tailored to your brand identity and business goals. Mobile-responsive, fast-loading, and conversion-optimized.",
    url: "https://jayswebdesignservices.com/#services",
    provider: siteConfig.name,
  },
  {
    name: "WordPress Development",
    description:
      "Expert WordPress development with custom themes, plugins, and WooCommerce integration. Full ownership and easy content management.",
    url: "https://jayswebdesignservices.com/#services",
    provider: siteConfig.name,
  },
  {
    name: "SEO Optimization",
    description:
      "Comprehensive search engine optimization including technical SEO, content strategy, local SEO, and ongoing performance tracking.",
    url: "https://jayswebdesignservices.com/#services",
    provider: siteConfig.name,
  },
  {
    name: "Website Maintenance",
    description:
      "Professional website maintenance including security updates, performance optimization, backups, and content updates.",
    url: "https://jayswebdesignservices.com/#services",
    provider: siteConfig.name,
  },
  {
    name: "E-commerce Development",
    description:
      "Full-featured online store development with secure payment processing, inventory management, and conversion optimization.",
    url: "https://jayswebdesignservices.com/#services",
    provider: siteConfig.name,
  },
  {
    name: "Logo & Brand Design",
    description:
      "Professional logo design and brand identity packages that establish credibility and create lasting impressions.",
    url: "https://jayswebdesignservices.com/#services",
    provider: siteConfig.name,
  },
];

// FAQ data for schema
export const faqData = [
  {
    question: "How much does professional web design cost?",
    answer:
      "Professional web design costs vary based on project complexity. Basic business websites start around $1,500-$3,000, while custom WordPress sites with e-commerce typically range from $3,000-$10,000. We provide free consultations and detailed quotes tailored to your specific needs.",
  },
  {
    question: "How long does it take to build a website?",
    answer:
      "Most business websites take 2-4 weeks from concept to launch. Complex e-commerce sites or custom applications may take 4-8 weeks. We provide detailed timelines during our initial consultation and keep you updated throughout the process.",
  },
  {
    question: "Do you offer SEO services with web design?",
    answer:
      "Yes, all our websites are built with SEO best practices including proper heading structure, meta tags, schema markup, fast loading speeds, and mobile responsiveness. We also offer ongoing SEO services for businesses wanting to improve their search rankings.",
  },
  {
    question: "Will I be able to update my website myself?",
    answer:
      "Absolutely. We build on WordPress which has an intuitive admin interface. We provide training and documentation so you can easily update content, add blog posts, and manage your site. We're also available for ongoing support if needed.",
  },
  {
    question: "Do you work with clients nationwide?",
    answer:
      "Yes, we serve clients across the entire United States. While we're based in San Antonio, Texas, our remote process allows us to work effectively with businesses anywhere. We use video calls, project management tools, and clear communication to deliver excellent results regardless of location.",
  },
  {
    question: "What makes your web design services different?",
    answer:
      "We focus on conversion-optimized design, not just aesthetics. Every website we build is strategically designed to turn visitors into customers. We combine beautiful design with proven UX principles, fast performance, and SEO optimization to deliver measurable business results.",
  },
];

// Generate Organization schema
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    url: siteConfig.url,
    logo: {
      "@type": "ImageObject",
      url: siteConfig.logo,
      width: 512,
      height: 512,
    },
    image: siteConfig.ogImage,
    description: siteConfig.description,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.state,
      postalCode: siteConfig.address.zip,
      addressCountry: siteConfig.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    sameAs: Object.values(siteConfig.social),
    contactPoint: {
      "@type": "ContactPoint",
      telephone: siteConfig.phone,
      contactType: "customer service",
      availableLanguage: ["English", "Spanish"],
      areaServed: "US",
    },
  };
}

// Generate LocalBusiness schema
export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${siteConfig.url}/#localbusiness`,
    name: siteConfig.name,
    image: siteConfig.logo,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.state,
      postalCode: siteConfig.address.zip,
      addressCountry: siteConfig.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday", "Sunday"],
        opens: "10:00",
        closes: "16:00",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "47",
      bestRating: "5",
      worstRating: "1",
    },
    review: [
      {
        "@type": "Review",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
        },
        author: {
          "@type": "Person",
          name: "Maria Rodriguez",
        },
        reviewBody:
          "Jay transformed our outdated website into a modern, professional site that actually brings in customers. Our leads have increased by 300% since launch.",
      },
      {
        "@type": "Review",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
        },
        author: {
          "@type": "Person",
          name: "John Mitchell",
        },
        reviewBody:
          "Outstanding work on our e-commerce site. The design is beautiful, loads fast, and our conversion rate has doubled. Highly recommend.",
      },
    ],
    areaServed: [
      {
        "@type": "Country",
        name: "United States",
      },
      {
        "@type": "City",
        name: "San Antonio",
      },
      {
        "@type": "State",
        name: "Texas",
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Web Design Services",
      itemListElement: services.map((service, index) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.name,
          description: service.description,
          url: service.url,
          provider: {
            "@type": "Organization",
            name: service.provider,
          },
        },
        position: index + 1,
      })),
    },
  };
}

// Generate WebSite schema
export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.description,
    publisher: {
      "@id": `${siteConfig.url}/#organization`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/blog?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
    inLanguage: "en-US",
  };
}

// Generate FAQ schema
export function generateFAQSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${siteConfig.url}/#faq`,
    mainEntity: faqData.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

// Generate Service schema
export function generateServiceSchema() {
  return services.map((service) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.name,
    name: service.name,
    description: service.description,
    url: service.url,
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: service.name,
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: service.name,
          },
        },
      ],
    },
  }));
}

// Generate BreadcrumbList schema
export function generateBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// Generate Article schema for blog posts
export function generateArticleSchema(article: {
  title: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${article.url}/#article`,
    headline: article.title,
    description: article.description,
    image: article.image,
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    author: {
      "@type": "Person",
      name: article.author,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: siteConfig.logo,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": article.url,
    },
    isPartOf: {
      "@id": `${siteConfig.url}/#website`,
    },
  };
}

// Generate complete schema graph for homepage
export function generateHomePageSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      generateOrganizationSchema(),
      generateLocalBusinessSchema(),
      generateWebSiteSchema(),
      generateFAQSchema(),
      generateBreadcrumbSchema([{ name: "Home", url: siteConfig.url }]),
    ],
  };
}
