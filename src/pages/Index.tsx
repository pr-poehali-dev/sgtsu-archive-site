import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import FeatureCard from "@/components/FeatureCard";
import { 
  Search, 
  Database, 
  Shield, 
  Users, 
  Clock, 
  FileText 
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import LoginForm from "@/components/LoginForm";

const Index = () => {
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const navigate = useNavigate();

  // Функция для проверки авторизации пользователя
  // В реальном приложении здесь будет проверка токена или сессии
  const isUserLoggedIn = () => {
    // Для демонстрации проверяем по наличию данных в localStorage
    return localStorage.getItem('isLoggedIn') === 'true';
  };

  const handleStartWorkClick = () => {
    if (isUserLoggedIn()) {
      // Если пользователь авторизован, перенаправляем в облачное хранилище
      navigate('/cloud');
    } else {
      // Если не авторизован, показываем диалог входа
      setIsLoginDialogOpen(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Диалог входа */}
      <Dialog open={isLoginDialogOpen} onOpenChange={setIsLoginDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">Вход в систему СГЦУ архив</DialogTitle>
          </DialogHeader>
          <LoginForm 
            onLoginSuccess={() => {
              setIsLoginDialogOpen(false);
              navigate('/cloud');
            }}
          />
        </DialogContent>
      </Dialog>
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-archive-blue/90 to-archive-darkBlue py-20 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Цифровой архив документов СГЦУ</h1>
            <p className="text-xl mb-8 text-blue-100">
              Современная система для хранения, управления и быстрого поиска важной документации
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-white text-archive-darkBlue hover:bg-blue-50"
                onClick={handleStartWorkClick}
              >
                Начать работу
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                Узнать больше
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-archive-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-archive-darkBlue mb-3">Возможности системы</h2>
            <p className="text-archive-gray max-w-2xl mx-auto">
              СГЦУ архив предоставляет полный набор инструментов для эффективного управления документацией
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard 
              title="Быстрый поиск" 
              description="Интеллектуальная система поиска по содержимому и метаданным документов"
              icon={<Search size={24} />}
            />
            <FeatureCard 
              title="Безопасное хранение" 
              description="Надежное хранение данных с резервным копированием и шифрованием"
              icon={<Database size={24} />}
            />
            <FeatureCard 
              title="Защита информации" 
              description="Многоуровневая система защиты с контролем доступа и аудитом действий"
              icon={<Shield size={24} />}
            />
            <FeatureCard 
              title="Совместная работа" 
              description="Удобные инструменты для коллективной работы с документами"
              icon={<Users size={24} />}
            />
            <FeatureCard 
              title="История изменений" 
              description="Отслеживание всех изменений в документах с возможностью возврата к предыдущим версиям"
              icon={<Clock size={24} />}
            />
            <FeatureCard 
              title="Цифровые подписи" 
              description="Поддержка электронных цифровых подписей для юридически значимого документооборота"
              icon={<FileText size={24} />}
            />
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="text-4xl font-bold text-archive-blue mb-2">100,000+</div>
              <p className="text-archive-gray">Документов в архиве</p>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-archive-blue mb-2">50+</div>
              <p className="text-archive-gray">Организаций используют систему</p>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-archive-blue mb-2">99.9%</div>
              <p className="text-archive-gray">Доступность системы</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-archive-darkBlue text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Готовы начать работу с архивом?</h2>
          <p className="mb-8 max-w-2xl mx-auto">
            Присоединяйтесь к организациям, которые уже оптимизировали свою работу с документами
          </p>
          <Button 
            size="lg" 
            className="bg-archive-blue hover:bg-archive-blue/90 text-white"
            onClick={handleStartWorkClick}
          >
            Создать аккаунт
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center gap-2">
                <img src="/logo-b.svg" alt="СГЦУ архив" className="h-6" />
                <div className="flex items-center gap-2">
                  <img 
                    src="https://cdn.poehali.dev/files/70c62a2e-eac7-4f0e-977a-836bf35e9d62.png" 
                    alt="Кит СГЦУ" 
                    className="h-6 w-6 object-contain" 
                  />
                  <span className="font-semibold text-archive-darkBlue">СГЦУ архив</span>
                </div>
              </div>
              <p className="text-sm text-archive-gray mt-2">© 2024 Все права защищены</p>
            </div>
            <div className="flex gap-6 text-sm text-archive-gray">
              <a href="#" className="hover:text-archive-blue">Справка</a>
              <a href="#" className="hover:text-archive-blue">Политика конфиденциальности</a>
              <a href="#" className="hover:text-archive-blue">Условия использования</a>
              <a href="#" className="hover:text-archive-blue">Контакты</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
