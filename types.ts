export enum FileCategory {
  IMAGE = 'Изображения',
  AUDIO = 'Аудио',
  VIDEO = 'Видео',
  ARCHIVE = 'Архивы',
  DOCUMENT = 'Документы',
  EXECUTABLE = 'Программы',
  SYSTEM = 'Системные',
  GAME = 'Игры/Valve',
  CODE = 'Код',
  MODEL_3D = '3D Модели',
  FONT = 'Шрифты'
}

export interface ExtensionData {
  extension: string;
  name: string;
  category: string;
  description: string;
  usage: string;
  osSupport: string[];
  pros: string[];
  cons: string[];
  technicalDetails: string;
  technologies: string[];
}

export interface QuickLink {
  ext: string;
  cat: FileCategory;
}