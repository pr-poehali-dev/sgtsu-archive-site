import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  email: z.string().email({
    message: "Пожалуйста, введите корректный email адрес",
  }),
  password: z.string().min(1, {
    message: "Пароль не может быть пустым",
  }),
  rememberMe: z.boolean().default(false),
});

interface LoginFormProps {
  onLoginSuccess: () => void;
}

const LoginForm = ({ onLoginSuccess }: LoginFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    
    // Имитация процесса входа
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Сохраняем статус авторизации в localStorage (в реальном приложении это будет токен)
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userEmail', values.email);
    
    setIsLoading(false);
    onLoginSuccess();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
        
        <div className="flex items-center justify-between">
          <FormField
            control={form.control}
            name="rememberMe"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2 space-y-0">
                <FormControl>
                  <Checkbox 
                    checked={field.value} 
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="text-sm font-normal">Запомнить меня</FormLabel>
              </FormItem>
            )}
          />
          
          <Link to="/forgot-password" className="text-sm text-archive-blue hover:underline">
            Забыли пароль?
          </Link>
        </div>
        
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Вход..." : "Войти"}
        </Button>
        
        <div className="text-center mt-4">
          <p className="text-sm text-archive-gray">
            Нет аккаунта?{" "}
            <Link to="/register" className="text-archive-blue hover:underline">
              Зарегистрироваться
            </Link>
          </p>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
