import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { OTPInput } from "@/components/ui/otp-input";
import { toast } from "@/components/ui/use-toast";

interface EmailVerificationFormProps {
  email: string;
  onVerificationSuccess: () => void;
  onResendCode: () => void;
}

const EmailVerificationForm = ({ 
  email, 
  onVerificationSuccess,
  onResendCode 
}: EmailVerificationFormProps) => {
  const [code, setCode] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(60);
  const [canResend, setCanResend] = useState<boolean>(false);

  // Симуляция ожидаемого кода с сервера - в реальности это будет отправлено на почту
  // и проверяться на сервере
  const expectedCode = "123";
  
  // Обратный отсчет для повторной отправки кода
  useEffect(() => {
    if (countdown > 0 && !canResend) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && !canResend) {
      setCanResend(true);
    }
  }, [countdown, canResend]);

  const handleVerify = async () => {
    setIsLoading(true);
    
    // Имитация проверки кода
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (code === expectedCode) {
      toast({
        title: "Код подтвержден",
        description: "Ваш email успешно подтвержден.",
      });
      setIsLoading(false);
      onVerificationSuccess();
    } else {
      toast({
        title: "Неверный код",
        description: "Пожалуйста, проверьте код и попробуйте снова.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    setIsLoading(true);
    
    // Имитация отправки нового кода
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Код отправлен",
      description: `Новый код подтверждения отправлен на ${email}`,
    });
    
    setIsLoading(false);
    setCanResend(false);
    setCountdown(60);
    onResendCode();
  };

  return (
    <div className="space-y-4">
      <div className="text-center space-y-2">
        <h3 className="text-lg font-medium">Подтверждение электронной почты</h3>
        <p className="text-sm text-archive-gray">
          Мы отправили 3-значный код на адрес <strong>{email}</strong>
        </p>
      </div>
      
      <div className="space-y-4 py-2">
        <div className="flex justify-center">
          <OTPInput
            value={code}
            onChange={setCode}
            maxLength={3}
            containerClassName="group flex items-center justify-center gap-2"
            inputClassName="w-10 h-12 text-center text-xl font-semibold border rounded-md focus:border-archive-blue focus:ring-1 focus:ring-archive-blue"
          />
        </div>
        
        <div className="text-center">
          <Button
            onClick={handleVerify}
            disabled={code.length !== 3 || isLoading}
            className="w-full"
          >
            {isLoading ? "Проверка..." : "Подтвердить код"}
          </Button>
        </div>
        
        <div className="text-center text-sm">
          {canResend ? (
            <Button
              variant="link"
              className="text-archive-blue p-0 h-auto font-normal"
              onClick={handleResendCode}
              disabled={isLoading}
            >
              Отправить код повторно
            </Button>
          ) : (
            <p className="text-archive-gray">
              Запросить новый код через {countdown} сек.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationForm;
