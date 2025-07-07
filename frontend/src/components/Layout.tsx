import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { BookOpen } from "lucide-react";
// import { Plus } from "lucide-react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <h1 className="ml-3 text-xl font-semibold text-gray-900">
                Gestión Académica
              </h1>
              <span className="ml-2 text-sm text-gray-500">
                Instituto Tecnológico San Juan
              </span>
            </div>

            <nav className="flex space-x-4">
              <Link
                to="/cursos"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === "/" || location.pathname === "/cursos"
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                Cursos
              </Link>
              {/* <Link
                to="/cursos/nuevo"
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                <Plus className="h-4 w-4 mr-1" />
                Nuevo Curso
              </Link> */}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
