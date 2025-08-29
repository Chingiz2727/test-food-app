const NS = "food-stadium";
const k = (key: string) => `${NS}-${key}`;

export function save<T>(key: string, value: T) {
    localStorage.setItem(k(key), JSON.stringify(value));
  }
  
  export function load<T>(key: string, fallback: T): T {
    const raw = localStorage.getItem(k(key));
    if (!raw) return fallback;
    try { return JSON.parse(raw) as T; } catch { return fallback; }
  }
  
  export function remove(key: string) {
    localStorage.removeItem(k(key));
  }