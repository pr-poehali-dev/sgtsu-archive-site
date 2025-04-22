
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { 
  Search, 
  Filter, 
  FolderPlus, 
  UploadCloud,
  Grid2x2,
  List as ListIcon
} from "lucide-react";
import FileUploadForm from "@/components/FileUploadForm";
import FileListItem from "@/components/FileListItem";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface FileData {
  id: number;
  name: string;
  type: string;
  size: string;
  dateAdded: string;
}

const CloudStorage = () => {
  const [files, setFiles] = useState<FileData[]>([
    { 
      id: 1, 
      name: "Отчет-Q3-2023.pdf", 
      type: "pdf", 
      size: "2.5 МБ", 
      dateAdded: "12.09.2023" 
    },
    { 
      id: 2, 
      name: "Презентация_проекта.pptx", 
      type: "pptx", 
      size: "5.7 МБ", 
      dateAdded: "23.10.2023" 
    },
    { 
      id: 3, 
      name: "Фотографии_мероприятия.zip", 
      type: "zip", 
      size: "45.2 МБ", 
      dateAdded: "05.11.2023" 
    },
    { 
      id: 4, 
      name: "Финансовые_показатели.xlsx", 
      type: "xlsx", 
      size: "1.8 МБ", 
      dateAdded: "18.11.2023" 
    },
    { 
      id: 5, 
      name: "Договор_с_клиентом.docx", 
      type: "docx", 
      size: "750 КБ", 
      dateAdded: "01.12.2023" 
    },
  ]);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [isGridView, setIsGridView] = useState(false);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFileUpload = (fileName: string) => {
    // Определяем тип файла по расширению
    const fileExtension = fileName.split('.').pop() || '';
    
    // Добавляем новый файл в список
    const newFile: FileData = {
      id: files.length + 1,
      name: fileName,
      type: fileExtension,
      size: "1.2 МБ", // Предполагаемый размер
      dateAdded: new Date().toLocaleDateString('ru-RU'),
    };
    
    setFiles([newFile, ...files]);
    setIsUploadDialogOpen(false);
  };

  const handleFileDelete = (fileName: string) => {
    setFiles(files.filter(file => file.name !== fileName));
  };

  const filteredFiles = files.filter(file => 
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStorageUsed = () => {
    // Предполагаем, что размер указан в виде строки, например "2.5 МБ"
    let totalSize = 0;
    
    files.forEach(file => {
      const sizeStr = file.size;
      const sizeValue = parseFloat(sizeStr.split(' ')[0]);
      
      if (sizeStr.includes('МБ')) {
        totalSize += sizeValue;
      } else if (sizeStr.includes('КБ')) {
        totalSize += sizeValue / 1024;
      } else if (sizeStr.includes('ГБ')) {
        totalSize += sizeValue * 1024;
      }
    });
    
    return totalSize.toFixed(2);
  };

  return (
    <div className="min-h-screen flex flex-col bg-archive-light">
      <Navbar />
      
      <div className="container mx-auto px-4 py-6 flex-1">
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-archive-darkBlue">Облачное хранилище СГЦУ</h1>
            
            <div className="flex items-center gap-2">
              <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <UploadCloud className="h-4 w-4" />
                    <span>Загрузить</span>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Загрузка файла</DialogTitle>
                  </DialogHeader>
                  <FileUploadForm onUploadComplete={handleFileUpload} />
                </DialogContent>
              </Dialog>
              
              <Button variant="outline" className="gap-2">
                <FolderPlus className="h-4 w-4" />
                <span>Создать папку</span>
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Боковая панель */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
                <h2 className="font-medium text-archive-darkBlue mb-4">Хранилище</h2>
                
                <div className="space-y-2">
                  <div>
                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-archive-blue rounded-full" 
                        style={{ width: `${Math.min((parseInt(getStorageUsed()) / 100) * 100, 100)}%` }}
                      />
                    </div>
                    <div className="flex justify-between mt-1 text-xs text-archive-gray">
                      <span>{getStorageUsed()} МБ занято</span>
                      <span>100 МБ доступно</span>
                    </div>
                  </div>
                  
                  <Button variant="outline" size="sm" className="w-full text-xs">
                    Увеличить хранилище
                  </Button>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-4">
                <h2 className="font-medium text-archive-darkBlue mb-4">Категории</h2>
                
                <div className="space-y-2">
                  <Link to="/cloud" className="flex items-center gap-2 p-2 rounded-md bg-archive-blue/10 text-archive-blue">
                    <span className="text-sm">Все файлы</span>
                  </Link>
                  <Link to="/cloud" className="flex items-center gap-2 p-2 rounded-md text-archive-gray hover:bg-gray-50">
                    <span className="text-sm">Документы</span>
                  </Link>
                  <Link to="/cloud" className="flex items-center gap-2 p-2 rounded-md text-archive-gray hover:bg-gray-50">
                    <span className="text-sm">Изображения</span>
                  </Link>
                  <Link to="/cloud" className="flex items-center gap-2 p-2 rounded-md text-archive-gray hover:bg-gray-50">
                    <span className="text-sm">Архивы</span>
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Основное содержимое */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-lg shadow-sm p-4">
                <Tabs defaultValue="all" className="space-y-4">
                  <div className="flex justify-between items-center">
                    <TabsList>
                      <TabsTrigger value="all">Все файлы</TabsTrigger>
                      <TabsTrigger value="recent">Недавние</TabsTrigger>
                      <TabsTrigger value="favorites">Избранные</TabsTrigger>
                    </TabsList>
                    
                    <div className="flex items-center gap-2">
                      <Button 
                        variant={isGridView ? "default" : "ghost"} 
                        size="icon" 
                        onClick={() => setIsGridView(true)}
                      >
                        <Grid2x2 className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant={!isGridView ? "default" : "ghost"} 
                        size="icon" 
                        onClick={() => setIsGridView(false)}
                      >
                        <ListIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-archive-gray" />
                      <Input 
                        placeholder="Поиск файлов..." 
                        className="pl-8" 
                        value={searchTerm}
                        onChange={handleSearch}
                      />
                    </div>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <TabsContent value="all" className="space-y-4">
                    {filteredFiles.length === 0 ? (
                      <div className="text-center py-8">
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-archive-light mb-4">
                          <Search className="h-6 w-6 text-archive-blue" />
                        </div>
                        <h3 className="text-archive-darkBlue font-medium mb-1">Ничего не найдено</h3>
                        <p className="text-archive-gray text-sm">
                          {searchTerm ? 
                            `Не найдено файлов, содержащих "${searchTerm}"` : 
                            "В вашем хранилище пока нет файлов"
                          }
                        </p>
                      </div>
                    ) : isGridView ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {filteredFiles.map(file => (
                          <div key={file.id} className="rounded-lg border p-4 bg-white">
                            <FileListItem 
                              name={file.name}
                              type={file.type}
                              size={file.size}
                              dateAdded={file.dateAdded}
                              onDelete={handleFileDelete}
                            />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {filteredFiles.map(file => (
                          <FileListItem 
                            key={file.id}
                            name={file.name}
                            type={file.type}
                            size={file.size}
                            dateAdded={file.dateAdded}
                            onDelete={handleFileDelete}
                          />
                        ))}
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="recent">
                    <div className="text-center py-8">
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-archive-light mb-4">
                        <Clock className="h-6 w-6 text-archive-blue" />
                      </div>
                      <h3 className="text-archive-darkBlue font-medium mb-1">Недавние файлы</h3>
                      <p className="text-archive-gray text-sm">
                        Здесь будут отображаться недавно открытые файлы
                      </p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="favorites">
                    <div className="text-center py-8">
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-archive-light mb-4">
                        <Star className="h-6 w-6 text-archive-blue" />
                      </div>
                      <h3 className="text-archive-darkBlue font-medium mb-1">Избранные файлы</h3>
                      <p className="text-archive-gray text-sm">
                        Здесь будут отображаться файлы, отмеченные как избранные
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Импорт недостающих иконок
import { Clock, Star } from "lucide-react";

export default CloudStorage;
