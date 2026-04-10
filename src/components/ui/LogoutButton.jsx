import { supabase } from "../../lib/supabaseClient";

export const LogoutButton = () => {
  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  return (
    <button onClick={handleLogout} className="text-red-500">
      Logout
    </button>
  );
};
