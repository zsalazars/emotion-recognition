import { useState } from "react";
import {
  Home,
  Users,
  Settings,
  FileText,
  BarChart3,
  Calendar,
  X,
  ChevronLeft,
  User
} from "lucide-react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { icon: Home, label: "Dashboard", href: "/dashboard", active: true },
    { icon: Users, label: "Docentes", href: "/professors" },
    { icon: FileText, label: "Documentos", href: "/documents" },
    { icon: BarChart3, label: "Análisis", href: "/analytics" },
    { icon: Calendar, label: "Calendario", href: "/calendar" },
    { icon: Settings, label: "Configuración", href: "/settings" },
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
          bg-white shadow-xl transition-all duration-300 ease-in-out
          ${isCollapsed ? 'w-16' : 'w-64'}
          flex-shrink-0
        `}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold text-gray-800">Reconocimiento de Emociones UAC</span>
            </div>
          )}

          {/* Collapse button - desktop */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex items-center justify-center w-8 h-8 rounded-lg hover:bg-gray-100 transition-colors"
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
              <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">Juan Pérez</p>
                <p className="text-xs text-gray-500 truncate">juan@empresa.com</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <a
                key={index}
                href={item.href}
                className={`
                  flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200
                  ${item.active
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
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
              </a>
            );
          })}
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">

        {/* Page Content */}
        <main className="p-6 flex-1 overflow-y-auto">
          {children || (
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h1 className="text-2xl font-bold text-gray-800 mb-4">
                ¡Bienvenido al Dashboard!
              </h1>
              <p className="text-gray-600 mb-6">
                Este es tu layout principal con sidebar. Aquí puedes colocar el contenido de tus páginas.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;