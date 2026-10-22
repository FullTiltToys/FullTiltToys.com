export const WHOLESALE_BUSINESS_TYPES = [
  "Retail Store",
  "Ecommerce",
  "Distributor",
  "Other",
] as const;

export const WHOLESALE_PRODUCTS = [
  { id: "doodle-disaster", label: "Doodle Disaster | The Art of Miscommunication" },
  { id: "bulldozer", label: "Bulldozer | It's Time to Play Dirty" },
  { id: "oto", label: "OTO | Curiously Controllable" },
  { id: "oto-stainless", label: "OTO Stainless" },
  { id: "non-stop-tops", label: "NST | Non-Stop Tops" },
  { id: "non-stop-tops-steel", label: "NST STEEL | Non-Stop Tops Metal Edition" },
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
