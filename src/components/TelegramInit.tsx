import { useEffect } from 'react';

declare global {
  interface Window {
    Telegram?: {
      WebApp: {
        ready: () => void;
        expand: () => void;
        close: () => void;
        isExpanded: boolean;
        viewportHeight: number;
        viewportStableHeight: number;
        MainButton: {
          text: string;
          show: () => void;
          hide: () => void;
          onClick: (callback: () => void) => void;
        };
        themeParams: {
          bg_color?: string;
          text_color?: string;
          hint_color?: string;
          link_color?: string;
          button_color?: string;
          button_text_color?: string;
        };
      };
    };
  }
}

export default function TelegramInit() {
  useEffect(() => {
    const initTelegram = () => {
      if (window.Telegram?.WebApp) {
        const tg = window.Telegram.WebApp;
        
        console.log('Telegram Web App found, initializing...');
        
        // Инициализация приложения
        tg.ready();
        
        // Проверяем текущее состояние
        console.log('Current viewport height:', tg.viewportHeight);
        console.log('Is expanded:', tg.isExpanded);
        
        // Пытаемся развернуть с задержкой
        setTimeout(() => {
          try {
            tg.expand();
            console.log('Expand called');
            
            // Проверяем результат
            setTimeout(() => {
              console.log('After expand - viewport height:', tg.viewportHeight);
              console.log('After expand - is expanded:', tg.isExpanded);
            }, 100);
          } catch (error) {
            console.error('Error expanding:', error);
          }
        }, 500);
        
      } else {
        console.log('Telegram Web App not found, retrying...');
        // Повторная попытка через 1 секунду
        setTimeout(initTelegram, 1000);
      }
    };

    // Запускаем инициализацию
    initTelegram();
    
    // Также пробуем через DOMContentLoaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initTelegram);
    }
    
    // И через window.onload
    window.addEventListener('load', initTelegram);

    return () => {
      document.removeEventListener('DOMContentLoaded', initTelegram);
      window.removeEventListener('load', initTelegram);
    };
  }, []);

  return null;
}
