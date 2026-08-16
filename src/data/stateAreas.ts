export interface StateArea {
  slug: string;
  state: string;
  abbreviation: string;
  title: string;
  metaDescription: string;
  heroDescription: string;
  heroImage: string;
  imageAlt: string;
  introduction: string;
  marketHeading: string;
  marketContent: string;
  approachHeading: string;
  approachContent: string;
  cities: string[];
  industries: string[];
  benefits: { title: string; description: string }[];
  faqs: { question: string; answer: string }[];
}

export const stateAreas: StateArea[] = [
  {
    slug: "affordable-web-design-in-california",
    state: "California",
    abbreviation: "CA",
    title: "Affordable Web Design in California",
    metaDescription: "Need affordable web design in California? Jay's Web Design Services builds fast, professional websites for California small businesses.",
    heroDescription: "Get affordable web design in California with a fast, mobile-friendly website created to help your business stand out in competitive local markets and turn more visitors into customers.",
    heroImage: "https://images.unsplash.com/photo-1444723121867-7a241cacace9?q=85&w=2400&auto=format&fit=crop",
    imageAlt: "California city skyline representing affordable web design services in California",
    introduction: "California businesses compete in one of the country's most active digital markets. A neighborhood service company, creative professional, restaurant, retailer, or growing startup needs a website that communicates value quickly. Jay's Web Design Services creates practical, professional websites for California small businesses that want strong design without the overhead of a large agency.",
    marketHeading: "Designed for California's competitive markets",
    marketContent: "Customers in California often compare several businesses before calling or requesting a quote. Your website must load quickly on mobile devices, explain your services clearly, establish credibility, and make the next step easy. We organize every page around the questions customers ask and the actions that matter, whether that means booking a consultation, calling your office, viewing recent work, or purchasing online.",
    approachHeading: "Flexible design for diverse California businesses",
    approachContent: "California markets vary from technology and professional services to construction, hospitality, wellness, food, and retail. We tailor the page structure, images, calls to action, and content to your audience. A Los Angeles creative company needs a different presentation than a Sacramento contractor or San Diego hospitality business. Your website should reflect that difference while remaining affordable, responsive, and search-friendly.",
    cities: ["Los Angeles", "San Diego", "San Jose", "San Francisco", "Sacramento", "Fresno", "Long Beach", "Oakland"],
    industries: ["Professional services", "Construction and home services", "Restaurants and hospitality", "Health and wellness", "Retail and e-commerce", "Creative businesses and startups"],
    benefits: [
      { title: "Mobile-first performance", description: "Fast, responsive layouts for customers searching from phones throughout California." },
      { title: "Clear local messaging", description: "Service and location content organized around the California markets you actually serve." },
      { title: "Practical pricing", description: "A focused website plan that prioritizes useful features instead of unnecessary agency extras." },
    ],
    faqs: [
      { question: "Can you work with a California business remotely?", answer: "Yes. Planning, content collection, reviews, and approvals can be handled efficiently by phone, text, email, and video meeting." },
      { question: "Can my website target more than one California city?", answer: "Yes. We can create a clear service-area structure and add genuinely useful city content as your SEO strategy grows." },
      { question: "Will my California website work on mobile devices?", answer: "Yes. Every website is designed to work across modern phones, tablets, laptops, and desktop screens." },
    ],
  },
  {
    slug: "affordable-web-design-in-florida",
    state: "Florida",
    abbreviation: "FL",
    title: "Affordable Web Design in Florida",
    metaDescription: "Affordable web design in Florida for local businesses. Get a responsive, professional website built to attract customers and generate inquiries.",
    heroDescription: "Choose affordable web design in Florida for a professional website that helps local customers understand your services, trust your business, and contact you from any device.",
    heroImage: "https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?q=85&w=2400&auto=format&fit=crop",
    imageAlt: "Florida coastal city representing affordable web design services in Florida",
    introduction: "Florida's growing population, tourism economy, and expanding local communities create opportunities for businesses that are easy to find and trust online. Jay's Web Design Services builds affordable websites for Florida companies that need a polished presence, straightforward messaging, and convenient ways for customers to call, book, or request information.",
    marketHeading: "Built for Florida's mobile and tourism-driven audience",
    marketContent: "Florida customers and visitors frequently search while traveling, relocating, planning an event, or looking for nearby services. A slow or confusing website can lose that opportunity quickly. We build responsive pages with visible contact options, useful service information, location details, and calls to action that remain easy to use on a phone.",
    approachHeading: "Websites prepared for seasonal and year-round demand",
    approachContent: "Florida businesses may serve permanent residents, seasonal residents, tourists, property owners, or other companies. Your website content should clarify who you help and when your services are available. We can organize seasonal promotions, service areas, galleries, frequently asked questions, booking links, and lead forms around the way your customers make decisions.",
    cities: ["Jacksonville", "Miami", "Tampa", "Orlando", "St. Petersburg", "Hialeah", "Fort Lauderdale", "Tallahassee"],
    industries: ["Tourism and hospitality", "Real estate and property services", "Construction and storm repair", "Restaurants and catering", "Marine and outdoor services", "Health, beauty, and wellness"],
    benefits: [
      { title: "Easy customer contact", description: "Prominent call, text, booking, and quote options for customers ready to act." },
      { title: "Location-focused structure", description: "Clear service areas and city references that support your Florida marketing strategy." },
      { title: "Room to grow", description: "Start with the pages you need and add locations, services, or online features later." },
    ],
    faqs: [
      { question: "Do you design websites for tourism and service businesses in Florida?", answer: "Yes. Websites can be tailored for hospitality, property services, contractors, restaurants, wellness companies, and other Florida industries." },
      { question: "Can you add online booking or estimate requests?", answer: "Yes. We can connect an appropriate booking system or build a lead form that gathers the details your business needs." },
      { question: "Can you redesign my existing Florida business website?", answer: "Yes. We can improve an outdated site's design, mobile experience, messaging, navigation, and lead-generation flow." },
    ],
  },
  {
    slug: "affordable-web-design-in-new-york",
    state: "New York",
    abbreviation: "NY",
    title: "Affordable Web Design in New York",
    metaDescription: "Affordable web design in New York for small businesses that need a fast, credible website without paying a large-agency price.",
    heroDescription: "Get affordable web design in New York with sharp messaging, responsive performance, and a professional customer experience built for demanding local markets.",
    heroImage: "https://images.unsplash.com/photo-1522083165195-3424ed129620?q=85&w=2400&auto=format&fit=crop",
    imageAlt: "New York skyline representing affordable web design services in New York",
    introduction: "New York businesses operate in markets where customers expect speed, professionalism, and clear information. From New York City to Albany, Buffalo, Rochester, and growing suburban communities, a website must establish credibility immediately. Jay's Web Design Services provides an affordable path to a modern site without sacrificing the features customers rely on.",
    marketHeading: "A clear message for fast-moving New York customers",
    marketContent: "People comparing New York businesses may scan several websites in minutes. Strong headings, direct service explanations, trust signals, and visible contact options help them understand why they should choose you. We remove unnecessary clutter and organize your content so visitors can find answers quickly on both mobile and desktop devices.",
    approachHeading: "Professional design without New York agency overhead",
    approachContent: "A small business should not need a corporate budget to look established online. We focus spending on responsive design, useful content, conversion paths, and search-friendly structure. The result is a website suited to your actual operation, whether you serve one borough, several counties, a statewide audience, or clients across the country.",
    cities: ["New York City", "Buffalo", "Yonkers", "Rochester", "Syracuse", "Albany", "New Rochelle", "Mount Vernon"],
    industries: ["Professional and financial services", "Home and building services", "Food and hospitality", "Personal care and wellness", "Retail and e-commerce", "Consultants and creative professionals"],
    benefits: [
      { title: "Immediate credibility", description: "Professional visual design and clear information that help visitors trust your business." },
      { title: "Fast navigation", description: "Simple page structures created for busy New York customers comparing options quickly." },
      { title: "Search-ready foundation", description: "Organized titles, headings, content, links, and mobile performance for long-term SEO work." },
    ],
    faqs: [
      { question: "Do you serve businesses outside New York City?", answer: "Yes. We work remotely with businesses throughout New York State, including upstate, suburban, and rural service areas." },
      { question: "Can the website focus on a specific borough or county?", answer: "Yes. Your content and service-area structure can focus on the exact communities where you accept customers." },
      { question: "Is affordable web design suitable for professional services?", answer: "Yes. A focused website can communicate expertise, services, credentials, and consultation options without unnecessary complexity." },
    ],
  },
  {
    slug: "affordable-web-design-in-georgia",
    state: "Georgia",
    abbreviation: "GA",
    title: "Affordable Web Design in Georgia",
    metaDescription: "Get affordable web design in Georgia with responsive pages, local business content, and clear ways for customers to contact you.",
    heroDescription: "Affordable web design in Georgia gives your small business a modern, mobile-friendly website built to earn trust and support growth in Atlanta and communities statewide.",
    heroImage: "https://images.unsplash.com/photo-1575917649705-5b59aaa12e6b?q=85&w=2400&auto=format&fit=crop",
    imageAlt: "Atlanta Georgia skyline representing affordable web design services in Georgia",
    introduction: "Georgia combines a major metropolitan business center with fast-growing suburbs, established regional cities, and strong local communities. Businesses need websites that feel professional while remaining personal and easy to use. Jay's Web Design Services helps Georgia small businesses create an online presence that fits their budget and supports their next stage of growth.",
    marketHeading: "Made for Georgia's growing business communities",
    marketContent: "Customers throughout Georgia use websites to compare service areas, experience, project examples, reviews, and availability. We turn that information into a clear customer journey. Visitors can quickly learn what you do, whether you serve their community, and how to request a quote or consultation.",
    approachHeading: "Local-business personality with modern performance",
    approachContent: "Georgia customers value both professionalism and personal service. Your website can show the people, story, and quality behind the business while still delivering fast mobile performance and a polished design. We use authentic content, project photos, testimonials, service explanations, and straightforward calls to action to create that balance.",
    cities: ["Atlanta", "Augusta", "Columbus", "Macon", "Savannah", "Athens", "South Fulton", "Sandy Springs"],
    industries: ["Construction and skilled trades", "Logistics and transportation", "Restaurants and event services", "Real estate and property care", "Professional services", "Retail and local makers"],
    benefits: [
      { title: "Small-business focus", description: "A practical process designed around the time and budget constraints of local owners." },
      { title: "Authentic presentation", description: "Content and visuals that communicate the people, experience, and values behind your company." },
      { title: "Conversion-focused pages", description: "Clear calls to action that help visitors call, text, request a quote, or book a consultation." },
    ],
    faqs: [
      { question: "Can you design a website for a Georgia startup?", answer: "Yes. We can create a focused initial website and leave room for additional services, locations, content, and features as the company grows." },
      { question: "Can you showcase completed projects?", answer: "Yes. Project galleries, before-and-after sections, case studies, and testimonials can help establish trust." },
      { question: "Do you provide support after the website launches?", answer: "Ongoing maintenance and update options are available based on the needs of your Georgia business." },
    ],
  },
  {
    slug: "affordable-web-design-in-north-carolina",
    state: "North Carolina",
    abbreviation: "NC",
    title: "Affordable Web Design in North Carolina",
    metaDescription: "Affordable web design in North Carolina for growing small businesses. Get a responsive website with clear content and dependable support.",
    heroDescription: "Get affordable web design in North Carolina with a professional website built for growing companies, mobile customers, and competitive local searches.",
    heroImage: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=85&w=2400&auto=format&fit=crop",
    imageAlt: "North Carolina landscape representing affordable web design services in North Carolina",
    introduction: "North Carolina's technology centers, established industries, coastal communities, and fast-growing cities support a wide range of small businesses. Jay's Web Design Services creates affordable websites that help those companies present their services professionally, reach the right customers, and compete without committing to an oversized agency budget.",
    marketHeading: "Supporting growth across North Carolina",
    marketContent: "A business serving Charlotte may need a polished, high-growth presentation, while a company in Asheville, Wilmington, or a smaller community may depend on clear regional service information. We shape the website around your real coverage area and customer needs instead of forcing every business into the same generic message.",
    approachHeading: "A practical website for the way you operate",
    approachContent: "The best website reflects how customers actually hire you. We can prioritize calls and quote requests for home services, consultations for professional firms, visual portfolios for creative companies, or product and menu information for retailers and restaurants. Every page is designed to make useful information easy to find.",
    cities: ["Charlotte", "Raleigh", "Greensboro", "Durham", "Winston-Salem", "Fayetteville", "Cary", "Wilmington"],
    industries: ["Technology and professional services", "Construction and home improvement", "Manufacturing and logistics", "Hospitality and tourism", "Health and wellness", "Retail and food businesses"],
    benefits: [
      { title: "Statewide flexibility", description: "Content suited to metro, suburban, coastal, mountain, or regional North Carolina markets." },
      { title: "Responsive design", description: "A consistent customer experience across phones, tablets, laptops, and desktops." },
      { title: "Straightforward support", description: "Direct communication and practical guidance before, during, and after launch." },
    ],
    faqs: [
      { question: "Can you target several North Carolina service areas?", answer: "Yes. We can organize the site around legitimate service regions and expand with useful local content over time." },
      { question: "Will the website be built for search engines?", answer: "The site will include crawlable navigation, descriptive metadata, structured headings, mobile performance, and a strong technical foundation. Rankings cannot be guaranteed." },
      { question: "Can I start with a smaller website?", answer: "Yes. We can prioritize the essential pages now and add services, locations, galleries, or other features when the business is ready." },
    ],
  },
];
