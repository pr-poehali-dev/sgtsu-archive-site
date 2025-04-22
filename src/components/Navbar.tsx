import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white border-b border-gray-200 py-3 px-4 shadow-sm">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img src="/logo-b.svg" alt="СГЦУ архив" className="h-8" />
          <h1 className="text-xl font-bold text-archive-darkBlue">СГЦУ архив</h1>
        </div>

        <div className="hidden md:flex items-center space-x-6 text-archive-darkBlue">
          <Link to="/" className="hover:text-archive-blue transition-colors">Главная</Link>
          <Link to="/documents" className="hover:text-archive-blue transition-colors">Документы</Link>
          <Link to="/search" className="hover:text-archive-blue transition-colors">Поиск</Link>
          <Link to="/about" className="hover:text-archive-blue transition-colors">О системе</Link>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">Войти</Button>
          <Button size="sm">Регистрация</Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
