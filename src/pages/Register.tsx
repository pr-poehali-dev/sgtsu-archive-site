
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import EmailVerificationForm from "@/components/EmailVerificationForm";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "Имя должно содержать минимум 2 символа",
  }),
  email: z.string().email({
    message: "Пожалуйста, введите корректный email адрес",
  }),
  password: z.string().min(8, {
    message: "Пароль должен содержать минимум 8 символов",
  }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Пароли не совпадают",
  path: ["confirmPassword"],
});

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [registrationData, setRegistrationData] = useState<z.infer<typeof formSchema> | null>(null);
  const navigate = useNavigate();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    
    // Имитация отправки запроса на сервер
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsLoading(false);
    setRegistrationData(values);
    setShowVerification(true);
    
    toast({
      title: "Код подтверждения отправлен",
      description: `На вашу почту ${values.email} отправлен 3-значный код для подтверждения аккаунта.`,
    });
  };

  const handleVerificationSuccess = () => {
    // После успешной верификации завершаем регистрацию
    if (registrationData) {
      // Имитация сохранения данных пользователя
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', registrationData.email);
      localStorage.setItem('userName', registrationData.fullName);
      
      toast({
        title: "Успешная регистрация!",
        description: "Добро пожаловать в СГЦУ архив.",
      });

      navigate("/cloud");
    }
  };

  const handleResendCode = () => {
    // Имитация повторной отправки кода
    toast({
      title: "Новый код отправлен",
      description: registrationData ? `Проверьте вашу почту ${registrationData.email}` : "Проверьте вашу почту",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-archive-light">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-archive-darkBlue">
              {showVerification ? "Подтверждение email" : "Регистрация в системе"}
            </CardTitle>
            <CardDescription>
              {showVerification 
                ? "Введите код подтверждения из письма" 
                : "Создайте аккаунт для доступа к СГЦУ архиву"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {showVerification ? (
              <EmailVerificationForm 
                email={registrationData?.email || ""} 
                onVerificationSuccess={handleVerificationSuccess}
                onResendCode={handleResendCode}
              />
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ФИО</FormLabel>
                        <FormControl>
                          <Input placeholder="Иванов Иван Иванович" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
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
                  
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Пароль</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="********" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Подтверждение пароля</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="********" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Регистрация..." : "Зарегистрироваться"}
                  </Button>
                </form>
              </Form>
            )}
          </CardContent>
          <CardFooter className="flex justify-center">
            {!showVerification && (
              <p className="text-sm text-archive-gray">
                Уже есть аккаунт?{" "}
                <Link to="/login" className="text-archive-blue hover:underline">
                  Войти
                </Link>
              </p>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Register;
