export function formatDate(date) {
  const d = new Date(date); // convert string → Date
  return d.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true, // shows AM/PM, remove if you want 24h format
  });
}
