/**
 * LocalStorage Utility Module
 * Demonstrates:
 * - ES6 Arrow functions
 * - Default parameters
 * - Error handling with try/catch
 * - JSON serialization / deserialization
 */

export const loadFromStorage = (key, defaultValue) => {
  try {
    const serializedData = localStorage.getItem(key);
    if (serializedData === null) {
      return defaultValue;
    }
    return JSON.parse(serializedData);
  } catch (error) {
    console.error(`Error loading key "${key}" from localStorage:`, error);
    return defaultValue;
  }
};

export const saveToStorage = (key, value) => {
  try {
    const serializedData = JSON.stringify(value);
    localStorage.setItem(key, serializedData);
  } catch (error) {
    console.error(`Error saving key "${key}" to localStorage:`, error);
  }
};
