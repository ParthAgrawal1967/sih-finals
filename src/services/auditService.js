// src/services/auditService.js
import { supabase } from "../lib/supabaseClient";
import { getCurrentUser } from "./authService";

export const logUserAction = async ({ action, page, payload = {} }) => {
  try {
    const user = await getCurrentUser();

    const ip = await fetch("https://api64.ipify.org?format=json").then(r => r.json());
    const user_agent = navigator.userAgent;

    await supabase.from("audit_logs").insert({
      user_id: user?.id || null,
      email: user?.email || null,
      action,
      page,
      payload,
      ip_address: ip?.ip || "N/A",
      user_agent
    });

  } catch (err) {
    console.error("Audit Log Error:", err);
  }
};
