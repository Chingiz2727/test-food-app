import { useEffect } from 'react';

declare global {
  interface Window {
    Telegram?: {
      WebApp: {
        ready: () => void;
        expand: () => void;
        close: () => void;
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
    if (window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      
      // Инициализация приложения
      tg.ready();
      
      // Включение полноэкранного режима
      tg.expand();
      
      // Настройка основной кнопки (если нужна)
      // tg.MainButton.text = "Заказать";
      // tg.MainButton.show();
      
      console.log('Telegram Web App initialized');
    }
  }, []);

  return null; // Компонент не рендерит ничего
}
