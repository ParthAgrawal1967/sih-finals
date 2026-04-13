import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Icon from "../AppIcon";
import { supabase } from "../../lib/supabaseClient";
import { AUDIT_ADMIN_EMAIL } from "../../lib/accessConfig";

const TabNavigation = () => {
  const location = useLocation();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      const { data } = await supabase.auth.getUser();
      const email = data?.user?.email;
      if (email === AUDIT_ADMIN_EMAIL) {
        setIsAdmin(true);
      }
    };
    checkAdmin();
  }, []);

  const tabs = [
    { 
      label: "Simulator", 
      path: "/overview-dashboard", 
      icon: "BarChart3",
      description: "Market intelligence and current state assessment"
    },
    { 
      label: "Forecaster", 
      path: "/tariff-simulation-builder", 
      icon: "Calculator",
      description: "Interactive tariff scenario modeling"
    },
    { 
      label: "Cultivation", 
      path: "/land-cultivation-analysis", 
      icon: "LandPlot",
      description: "State-wise cultivable vs. actual land analysis"
    },
    { 
      label: "Compare", 
      path: "/scenario-comparison", 
      icon: "GitCompare",
      description: "Side-by-side scenario analysis"
    },
    { 
      label: "NMEO-OP", 
      path: "/nmeo-op-progress-tracker", 
      icon: "TrendingUp",
      description: "Mission progress and import monitoring"
    },

    // ⭐ Admin Only Tab - Shows only if isAdmin=true
    ...(isAdmin
      ? [{
          label: "Audit Logs",
          path: "/audit-logs",
          icon: "ShieldAlert",
          description: "View app audit activities and access trails"
        }]
      : [])
  ];

  const isActiveTab = (path) => location?.pathname === path;

  return (
    <div className="bg-white/85 backdrop-blur-md border-b border-border/80 sticky top-16 z-40">
      <div className="px-4 sm:px-6">
        <nav className="flex gap-1 overflow-x-auto scrollbar-hide py-1.5">
          {tabs?.map((tab) => (
            <Link
              key={tab?.path}
              to={tab?.path}
              title={tab?.description}
              className={`group flex items-center space-x-2 px-4 py-2.5 rounded-xl border transition-all duration-200 whitespace-nowrap ${
                isActiveTab(tab?.path)
                  ? "border-[#9fbce2] text-[#34527d] bg-[#e8f0fa] shadow-[0_10px_22px_-18px_rgba(52,82,125,0.9)]"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:bg-[#f1f6fc]"
              }`}
            >
              <Icon
                name={tab?.icon}
                size={18}
                className={`transition-colors duration-200 ${
                  isActiveTab(tab?.path)
                    ? "text-[#4b78c2]"
                    : "text-muted-foreground group-hover:text-foreground"
                }`}
              />
              <span className="font-medium text-sm">{tab?.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default TabNavigation;
