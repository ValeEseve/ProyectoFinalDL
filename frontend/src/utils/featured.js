export const getFeatured = (items, count = 4) => {
  if (!Array.isArray(items)) return [];
  
  return [...items]
    .sort(() => 0.5 - Math.random())
    .slice(0, count);
};
