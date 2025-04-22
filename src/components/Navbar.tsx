
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User, Settings, Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isLoggedIn = location.pathname === "/cloud"; // В реальном приложении это должно проверяться через авторизацию

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white border-b border-gray-200 py-3 px-4 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo-b.svg" alt="СГЦУ архив" className="h-8" />
            <div className="flex items-center gap-2">
              <img 
                src="https://cdn.poehali.dev/files/70c62a2e-eac7-4f0e-977a-836bf35e9d62.png" 
                alt="Кит СГЦУ" 
                className="h-8 w-8 object-contain"
              />
              <h1 className="text-xl font-bold text-archive-darkBlue">СГЦУ архив</h1>
            </div>
          </Link>
        </div>

        {/* Десктопное меню */}
        <div className="hidden md:flex items-center space-x-6 text-archive-darkBlue">
          <Link to="/" className={`hover:text-archive-blue transition-colors ${location.pathname === '/' ? 'text-archive-blue' : ''}`}>
            Главная
          </Link>
          <Link to="/cloud" className={`hover:text-archive-blue transition-colors ${location.pathname === '/cloud' ? 'text-archive-blue' : ''}`}>
            Облако
          </Link>
          <Link to="/about" className="hover:text-archive-blue transition-colors">
            О системе
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-3">
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="h-9 w-9 cursor-pointer">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>ИИ</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Мой аккаунт</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Профиль</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Настройки</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <Link to="/">
                  <DropdownMenuItem className="cursor-pointer text-red-500 hover:text-red-500 focus:text-red-500">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Выйти</span>
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline" size="sm">Войти</Button>
              </Link>
              <Link to="/register">
                <Button size="sm">Регистрация</Button>
              </Link>
            </>
          )}
        </div>

        {/* Мобильное меню */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={toggleMenu}>
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Мобильная навигация */}
      {isMenuOpen && (
        <div className="md:hidden py-4 border-t border-gray-100 mt-3 animate-fade-in">
          <div className="container mx-auto px-4 space-y-4">
            <div className="space-y-2">
              <Link
                to="/"
                className="block py-2 px-3 rounded-md hover:bg-gray-100"
                onClick={toggleMenu}
              >
                Главная
              </Link>
              <Link
                to="/cloud"
                className="block py-2 px-3 rounded-md hover:bg-gray-100"
                onClick={toggleMenu}
              >
                Облако
              </Link>
              <Link
                to="/about"
                className="block py-2 px-3 rounded-md hover:bg-gray-100"
                onClick={toggleMenu}
              >
                О системе
              </Link>
            </div>
            
            <div className="pt-2 border-t border-gray-100">
              {isLoggedIn ? (
                <div className="flex items-center gap-3 py-2">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>ИИ</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium text-archive-darkBlue">Иван Иванов</div>
                    <Link to="/" className="text-sm text-red-500">Выйти</Link>
                  </div>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Link to="/login" className="flex-1">
                    <Button variant="outline" className="w-full" size="sm" onClick={toggleMenu}>
                      Войти
                    </Button>
                  </Link>
                  <Link to="/register" className="flex-1">
                    <Button className="w-full" size="sm" onClick={toggleMenu}>
                      Регистрация
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
