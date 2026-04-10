import { supabase } from "../lib/supabaseClient";

export const signUpUser = async (email, password) => {
  return await supabase.auth.signUp({ email, password });
};

export const loginUser = async (email, password) => {
  return await supabase.auth.signInWithPassword({
    email,
    password
  });
};

export const logoutUser = async () => {
  return await supabase.auth.signOut();
};

export const getCurrentUser = async () => {
  const { data } = await supabase.auth.getSession();
  return data?.session?.user || null;
};
