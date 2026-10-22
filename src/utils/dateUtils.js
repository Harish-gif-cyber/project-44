/**
 * Date and Time Utility Module
 * Demonstrates:
 * - ES6 Template literals
 * - Arrow functions
 * - Destructuring
 * - Date parsing and comparison
 */

export const formatDate = (dateString) => {
  if (!dateString) return "No due date";
  try {
    const [year, month, day] = dateString.split("-");
    const date = new Date(Number(year), Number(month) - 1, Number(day));
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  } catch {
    return dateString;
  }
};

export const formatTimestamp = (timestamp) => {
  if (!timestamp) return "";
  try {
    const date = new Date(timestamp);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true
    });
  } catch {
    return timestamp;
  }
};

export const isDueToday = (dueDateString) => {
  if (!dueDateString) return false;
  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  return dueDateString === todayStr;
};

export const isOverdue = (dueDateString, completed = false) => {
  if (!dueDateString || completed) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const [year, month, day] = dueDateString.split("-").map(Number);
  const targetDate = new Date(year, month - 1, day);
  targetDate.setHours(0, 0, 0, 0);
  
  return targetDate.getTime() < today.getTime();
};
