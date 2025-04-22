
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UploadCloud, X } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";

interface FileUploadFormProps {
  onUploadComplete: (fileName: string) => void;
}

const FileUploadForm = ({ onUploadComplete }: FileUploadFormProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const clearSelectedFile = () => {
    setSelectedFile(null);
  };

  const simulateUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);
    
    const intervalId = setInterval(() => {
      setUploadProgress((prev) => {
        const newProgress = prev + 5;
        if (newProgress >= 100) {
          clearInterval(intervalId);
          setIsUploading(false);
          if (selectedFile) {
            onUploadComplete(selectedFile.name);
            setSelectedFile(null);
          }
          toast({
            title: "Загрузка завершена",
            description: "Файл успешно загружен в облачное хранилище.",
          });
          return 100;
        }
        return newProgress;
      });
    }, 150);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      toast({
        title: "Файл не выбран",
        description: "Пожалуйста, выберите файл для загрузки.",
        variant: "destructive",
      });
      return;
    }
    
    simulateUpload();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid w-full gap-2">
        <Label htmlFor="file">Загрузить файл</Label>
        
        {!selectedFile ? (
          <div className="border-2 border-dashed border-gray-300 p-6 rounded-lg text-center bg-white hover:bg-gray-50 transition-colors">
            <Input
              id="file"
              type="file"
              className="hidden"
              onChange={handleFileChange}
            />
            <label htmlFor="file" className="cursor-pointer flex flex-col items-center gap-2">
              <UploadCloud className="h-10 w-10 text-archive-blue" />
              <span className="text-archive-darkBlue font-medium">Нажмите для выбора файла</span>
              <span className="text-sm text-archive-gray">или перетащите файл сюда</span>
            </label>
          </div>
        ) : (
          <div className="bg-white p-3 rounded-lg border flex items-center justify-between">
            <div className="flex items-center gap-2 overflow-hidden">
              <div className="w-10 h-10 bg-archive-blue/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-archive-blue text-xs font-medium uppercase">
                  {selectedFile.name.split('.').pop()}
                </span>
              </div>
              <div className="overflow-hidden">
                <div className="text-sm font-medium text-archive-darkBlue truncate">
                  {selectedFile.name}
                </div>
                <div className="text-xs text-archive-gray">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} МБ
                </div>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              type="button" 
              onClick={clearSelectedFile}
              className="flex-shrink-0"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Удалить</span>
            </Button>
          </div>
        )}
      </div>

      {isUploading && (
        <div className="space-y-2">
          <Progress value={uploadProgress} className="h-2" />
          <p className="text-sm text-archive-gray text-center">
            Загрузка... {uploadProgress}%
          </p>
        </div>
      )}

      <Button 
        type="submit" 
        className="w-full"
        disabled={!selectedFile || isUploading}
      >
        {isUploading ? "Загружается..." : "Загрузить в облако"}
      </Button>
    </form>
  );
};

export default FileUploadForm;
