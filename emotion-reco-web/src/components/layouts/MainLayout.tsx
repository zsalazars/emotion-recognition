import { useState } from "react";
import {
  Home,
  Users,
  BarChart3,
  X,
  ChevronLeft,
  User,
  Frown,
  Landmark
} from "lucide-react";
import { Link } from "react-router";
import { Toaster } from "react-hot-toast";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { icon: Home, label: "Dashboard", href: "/dashboard" },
    { icon: Users, label: "Docentes", href: "/docentes" },
    { icon: Landmark, label: "Asignaturas", href: "/asignaturas" },
    { icon: Frown, label: "Emociones", href: "/emociones" },
    { icon: BarChart3, label: "Registros", href: "/registros-emociones" },
  ];

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
          bg-blue-950 shadow-xl transition-all duration-300 ease-in-out
          ${isCollapsed ? 'w-16' : 'w-72'}
          flex-shrink-0
        `}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#2CC5F4]">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <img src={"/logotipo_uac.webp"} alt="Logotipo Universidad Andina del Cusco" width={50} height={50} />
              <span className="text-xl font-semibold text-gray-200">Reconocimiento de Emociones UAC</span>
            </div>
          )}

          {/* Collapse button - desktop */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex items-center justify-center w-8 h-8 rounded-lg text-white hover:bg-gray-200 hover:text-black transition-colors"
          >
            <ChevronLeft className={`w-4 h-4 transition-transform ${isCollapsed ? 'rotate-180' : ''}`} />
          </button>

          {/* Close button - mobile */}
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="lg:hidden flex items-center justify-center w-8 h-8 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* User Profile */}
        {!isCollapsed && (
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r bg-blue-800 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-200 truncate">Juan Pérez</p>
                <p className="text-xs text-gray-400 truncate">juan@empresa.com</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = index === activeIndex;
            return (
              <Link
                key={index}
                to={item.href}
                onClick={() => setActiveIndex(index)}
                className={`
                  flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200
                  ${isActive
                    ? 'bg-[#2CC5F4] text-white shadow-lg'
                    : 'text-gray-200 hover:bg-gray-100 hover:text-gray-800'
                  }
                  ${isCollapsed ? 'justify-center' : ''}
                `}
              >
                <Icon className={`${isCollapsed ? 'w-5 h-5' : 'w-5 h-5'} flex-shrink-0`} />
                {!isCollapsed && (
                  <>
                    <span className="font-medium">{item.label}</span>
                  </>
                )}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">

        {/* Page Content */}
        <main className="p-6 flex-1 overflow-y-auto bg-blue-50">
          {children}
          <Toaster
            position="bottom-right"
            reverseOrder={false}
          />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;