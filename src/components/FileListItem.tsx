
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  MoreVertical, 
  Download, 
  Trash2, 
  FileText, 
  Image, 
  FileArchive, 
  Film, 
  Music, 
  FileSpreadsheet, 
  FileCode,
  File
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/use-toast";

interface FileListItemProps {
  name: string;
  type: string;
  size: string;
  dateAdded: string;
  onDelete: (name: string) => void;
}

const FileListItem = ({ name, type, size, dateAdded, onDelete }: FileListItemProps) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const getFileIcon = (fileType: string) => {
    const extension = fileType.toLowerCase();
    
    switch (extension) {
      case 'pdf':
      case 'doc':
      case 'docx':
      case 'txt':
        return <FileText className="h-5 w-5 text-blue-500" />;
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
      case 'svg':
        return <Image className="h-5 w-5 text-green-500" />;
      case 'zip':
      case 'rar':
      case '7z':
        return <FileArchive className="h-5 w-5 text-yellow-500" />;
      case 'mp4':
      case 'avi':
      case 'mov':
        return <Film className="h-5 w-5 text-red-500" />;
      case 'mp3':
      case 'wav':
        return <Music className="h-5 w-5 text-purple-500" />;
      case 'xls':
      case 'xlsx':
      case 'csv':
        return <FileSpreadsheet className="h-5 w-5 text-green-700" />;
      case 'html':
      case 'css':
      case 'js':
      case 'tsx':
      case 'jsx':
        return <FileCode className="h-5 w-5 text-orange-500" />;
      default:
        return <File className="h-5 w-5 text-gray-500" />;
    }
  };

  const handleDownload = () => {
    toast({
      title: "Загрузка файла",
      description: `Файл ${name} скачивается...`,
    });
  };

  const handleDelete = () => {
    setIsDeleting(true);
    
    // Имитация процесса удаления
    setTimeout(() => {
      setIsDeleting(false);
      onDelete(name);
      toast({
        title: "Файл удален",
        description: `Файл ${name} был успешно удален.`,
      });
    }, 500);
  };

  return (
    <div className="flex items-center justify-between p-3 border rounded-lg bg-white hover:bg-gray-50 transition-colors">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {getFileIcon(type)}
        <div className="min-w-0">
          <div className="font-medium text-archive-darkBlue truncate">{name}</div>
          <div className="text-xs text-archive-gray">{size} • {dateAdded}</div>
        </div>
      </div>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreVertical className="h-4 w-4" />
            <span className="sr-only">Действия</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={handleDownload} className="cursor-pointer">
            <Download className="h-4 w-4 mr-2" />
            <span>Скачать</span>
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={handleDelete} 
            className="text-red-500 hover:text-red-500 focus:text-red-500 cursor-pointer"
            disabled={isDeleting}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            <span>{isDeleting ? "Удаление..." : "Удалить"}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default FileListItem;
