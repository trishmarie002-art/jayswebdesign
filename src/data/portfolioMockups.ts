export const MOCKUP_PROJECTS = [
  {
    "id": "mockup-inspirations-pool",
    "name": "Inspirations Pool Service",
    "category": "Pool Cleaning & Maintenance",
    "image": "/portfolio-images/inspirations-pool.png",
    "url": "/portfolio-images/inspirations-pool.png",
    "alt": "Laptop mockup of the Inspirations Pool Service website",
    "featured": true,
    "staticMockup": true
  },
  {
    "id": "mockup-pnf-water",
    "name": "PNF Water Heaters & Softeners",
    "category": "Plumbing & Water Treatment",
    "image": "/portfolio-images/pnf-water.png",
    "url": "/portfolio-images/pnf-water.png",
    "alt": "Laptop mockup of the PNF Water Heaters & Softeners website",
    "featured": true,
    "staticMockup": true
  },
  {
    "id": "mockup-alamo-renovations",
    "name": "Alamo Renovations",
    "category": "Home Remodeling",
    "image": "/portfolio-images/alamo-renovations.png",
    "url": "/portfolio-images/alamo-renovations.png",
    "alt": "Laptop mockup of the Alamo Renovations website",
    "featured": true,
    "staticMockup": true
  },
  {
    "id": "mockup-dash-protective",
    "name": "D.A.S.H. Protective Services",
    "category": "Security Services",
    "image": "/portfolio-images/dash-protective.png",
    "url": "/portfolio-images/dash-protective.png",
    "alt": "Laptop mockup of the D.A.S.H. Protective Services website",
    "featured": true,
    "staticMockup": true
  },
  {
    "id": "mockup-eb3-snow",
    "name": "EB3 Snow Removal & Landscaping",
    "category": "Landscaping & Snow Removal",
    "image": "/portfolio-images/eb3-snow.png",
    "url": "/portfolio-images/eb3-snow.png",
    "alt": "Laptop mockup of the EB3 Snow Removal & Landscaping website",
    "featured": true,
    "staticMockup": true
  }
];

export function mergeMockups<T extends { id: string; name: string; url: string; image: string; category: string; alt: string; featured?: boolean; staticMockup?: boolean }>(projects: T[]) {
  const normalize = (name: string) => name.toLowerCase().replace(/[^a-z0-9]/g, "");
  const matched = new Set<string>();
  const featured = MOCKUP_PROJECTS.map(mockup => {
    const original = projects.find(p => normalize(p.name) === normalize(mockup.name));
    if (original) matched.add(original.id);
    return { ...mockup, url: original?.url || mockup.url };
  });
  return [...featured, ...projects.filter(p => !matched.has(p.id))];
}
