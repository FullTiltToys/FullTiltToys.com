export const WHOLESALE_BUSINESS_TYPES = [
  "Retail Store",
  "Ecommerce",
  "Distributor",
  "Other",
] as const;

export const WHOLESALE_PRODUCTS = [
  { id: "doodle-disaster", label: "Doodle Disaster" },
  { id: "bulldozer", label: "Bulldozer" },
  { id: "oto", label: "OTO" },
  { id: "other", label: "Other" },
] as const;

export const WHOLESALE_HEAR_ABOUT = [
  "Social media",
  "Search engine",
  "Amazon",
  "Trade show",
  "Referral",
  "Other",
] as const;

export const WHOLESALE_PRODUCT_LABELS = WHOLESALE_PRODUCTS.map(
  (item) => item.label,
);
