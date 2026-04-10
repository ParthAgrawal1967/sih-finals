import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import { logoutUser } from "../../services/authService";

const Header = () => {
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    setIsMoreMenuOpen(false);
    navigate("/login", { replace: true });
  };

  const secondaryNavItems = [
    { label: 'Settings', path: '/settings', icon: 'Settings' },
    { label: 'Help', path: '/help', icon: 'HelpCircle' },
  ];

  const isActivePath = (path) => location?.pathname === path;

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-white/90 backdrop-blur-md shadow-[0_8px_22px_-18px_rgba(27,63,111,0.55)]">
      <div className="flex items-center justify-between h-16 px-6">
        
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-[#4b78c2] to-[#7ea4db] rounded-xl shadow-[0_10px_20px_-14px_rgba(43,93,170,0.9)]">
            <Icon name="Zap" size={24} color="white" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-semibold text-slate-800">PalmTariff-AI</h1>
            <span className="text-xs text-muted-foreground">Government Policy Analytics</span>
          </div>
        </div>

        {/* Desktop Navigation (ONLY Settings + Help) */}
        <nav className="hidden lg:flex items-center space-x-1">
          {secondaryNavItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActivePath(item.path)
                  ? 'bg-[#e8f0fa] text-[#34527d]'
                  : 'text-muted-foreground hover:text-foreground hover:bg-[#f1f6fc]'
              }`}
            >
              <Icon name={item.icon} size={16} />
              <span>{item.label}</span>
            </Link>
          ))}

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="ml-2 bg-red-500 text-white px-3 py-1.5 rounded-lg text-xs hover:bg-red-600 shadow-[0_8px_18px_-14px_rgba(220,38,38,0.95)]"
          >
            Logout
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
            iconName="Menu"
          />
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isMoreMenuOpen && (
        <div className="lg:hidden bg-white/95 border-t border-border px-4 py-3 space-y-2 backdrop-blur">
          {[...secondaryNavItems].map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsMoreMenuOpen(false)}
              className="flex items-center space-x-3 p-3 rounded-xl text-sm hover:bg-[#f1f6fc]"
            >
              <Icon name={item.icon} size={16} />
              <span>{item.label}</span>
            </Link>
          ))}

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 p-3 text-red-600 hover:bg-red-50 w-full rounded-md"
          >
            <Icon name="LogOut" size={16} />
            <span>Logout</span>
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
