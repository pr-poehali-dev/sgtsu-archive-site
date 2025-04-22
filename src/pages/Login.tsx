import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import LoginForm from "@/components/LoginForm";

// Схема только для email - шаг первый входа
const emailSchema = z.object({
  email: z.string().email({
    message: "Пожалуйста, введите корректный email адрес",
  }),
});

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [checkingEmail, setCheckingEmail] = useState(true);
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();
  
  const form = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  const checkEmail = async (values: z.infer<typeof emailSchema>) => {
    setIsLoading(true);
    
    try {
      // В реальном приложении здесь будет запрос к серверу для проверки существования email
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Симуляция проверки email
      // В реальном приложении это будет ответ от сервера
      const emailExists = true; // Предположим, что email существует
      
      if (emailExists) {
        setUserEmail(values.email);
        setCheckingEmail(false);
      } else {
        toast({
          title: "Email не найден",
          description: "Пользователь с таким email не зарегистрирован",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось проверить email",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginSuccess = () => {
    navigate("/cloud");
  };

  const handleBackToEmail = () => {
    setCheckingEmail(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-archive-light">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-archive-darkBlue">Вход в систему</CardTitle>
            <CardDescription>
              {checkingEmail 
                ? "Введите email для входа в СГЦУ архив" 
                : `Вход для пользователя ${userEmail}`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {checkingEmail ? (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(checkEmail)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="example@mail.ru" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Проверка..." : "Продолжить"}
                  </Button>
                </form>
              </Form>
            ) : (
              <div className="space-y-4">
                <LoginForm onLoginSuccess={handleLoginSuccess} />
                <div className="text-center">
                  <Button 
                    variant="link" 
                    onClick={handleBackToEmail}
                    className="text-archive-gray text-sm p-0"
                  >
                    Войти с другим email
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
