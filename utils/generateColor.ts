export const generateColor = (category: string) => {
  // Extended color palette
  const colors = [
    "#FF6384", // Red
    "#36A2EB", // Blue
    "#FFCE56", // Yellow
    "#4CAF50", // Green
    "#FF5733", // Orange
    "#C70039", // Dark Red
    "#8E44AD", // Purple
    "#3498DB", // Light Blue
    "#E67E22", // Dark Orange
    "#2ECC71", // Light Green
    "#F1C40F", // Gold
    "#E74C3C", // Bright Red
    "#9B59B6", // Violet
    "#1ABC9C", // Turquoise
    "#D35400", // Pumpkin
    "#27AE60", // Dark Green
  ];

  // Improved hashing algorithm
  const hash = category
    .split("")
    .reduce((acc, char) => (acc << 5) - acc + char.charCodeAt(0), 0);

  // Ensure the index is within the bounds of the colors array
  const index = Math.abs(hash) % colors.length;

  return colors[index];
};
