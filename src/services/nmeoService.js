const API_BASE = import.meta.env.VITE_REACT_API_BASE_URL || "http://127.0.0.1:8000";

export const fetchNmeoStatewiseData = async () => {
  const res = await fetch(`${API_BASE}/nmeo-op/statewise`);
  if (!res.ok) {
    throw new Error(`Failed to fetch NMEO-OP statewise data (${res.status})`);
  }
  return res.json();
};
