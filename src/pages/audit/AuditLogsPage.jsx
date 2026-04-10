// src/pages/audit/AuditLogsPage.jsx

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import AuditLogs from "./AuditLogs";
import { AUDIT_ADMIN_EMAIL } from "../../lib/accessConfig";
import Header from "../../components/ui/Header";
import TabNavigation from "../../components/ui/TabNavigation";

export default function AuditLogsPage() {
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const checkAccess = async () => {
      setLoading(true);

      const { data, error } = await supabase.auth.getUser();

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      const user = data?.user;

      if (user?.email === AUDIT_ADMIN_EMAIL) {
        setAllowed(true);
      }

      setLoading(false);
    };

    checkAccess();
  }, []);

  if (loading) {
    return (
      <>
        <Header />
        <TabNavigation />
        <div className="min-h-screen flex items-center justify-center bg-background">
          <p className="text-foreground text-lg">Checking access...</p>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <TabNavigation />
        <div className="min-h-screen flex items-center justify-center bg-background">
          <p className="text-red-300 bg-red-500/20 px-4 py-2 rounded-lg">
            Auth error: {error}
          </p>
        </div>
      </>
    );
  }

  if (!allowed) {
    return (
      <>
        <Header />
        <TabNavigation />
        <div className="min-h-screen flex flex-col items-center justify-center bg-background text-center">
          <h2 className="text-2xl font-bold text-red-300 mb-2">
            Access Denied
          </h2>
          <p className="text-slate-200 max-w-md">
            You are not authorized to view audit logs.  
            Please login with the admin account that has permission.
          </p>
        </div>
      </>
    );
  }

  // ✅ Only the allowed email reaches here
  return (
    <>
      <Header />
      <TabNavigation />
      <AuditLogs />
    </>
  );
}
