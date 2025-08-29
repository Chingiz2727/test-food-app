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
    TelegramWebviewProxy?: {
      postEvent: (eventName: string, data: string) => void;
    };
  }
}

export default function TelegramInit() {
  useEffect(() => {
    const initTelegram = () => {
      console.log('Initializing Telegram Mini App 2.0...');
      
      // Try the new expand() method first (Mini Apps 2.0)
      if (window.Telegram?.WebApp) {
        const tg = window.Telegram.WebApp;
        console.log('Telegram WebApp detected, trying expand() method...');
        
        tg.ready();
        
        // Try the new expand method directly
        try {
          tg.expand();
          console.log('tg.expand() called successfully');
        } catch (error) {
          console.log('tg.expand() failed, trying alternative methods...');
          
          // Fallback to web_app_expand method
          const expandData = JSON.stringify({
            eventType: 'web_app_expand',
            eventData: {}
          });
          
          window.parent.postMessage(expandData, 'https://web.telegram.org');
          console.log('web_app_expand sent via postMessage');
        }
        
      } 
      // Desktop and Mobile versions
      else if (window.TelegramWebviewProxy?.postEvent) {
        console.log('Desktop/Mobile version detected');
        
        const expandData = JSON.stringify({});
        window.TelegramWebviewProxy.postEvent('web_app_expand', expandData);
        console.log('web_app_expand sent via postEvent');
        
      } 
      // Windows Phone (using type assertion)
      else if ((window as any).external?.notify) {
        console.log('Windows Phone version detected');
        
        const expandData = JSON.stringify({
          eventType: 'web_app_expand',
          eventData: {}
        });
        
        (window as any).external.notify(expandData);
        console.log('web_app_expand sent via external.notify');
        
      } 
      else {
        console.log('Telegram environment not detected, retrying...');
        setTimeout(initTelegram, 1000);
      }
    };

    // Try to initialize immediately
    initTelegram();
    
    // Also try after DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initTelegram);
    }
    
    // And after window load
    window.addEventListener('load', initTelegram);

    return () => {
      document.removeEventListener('DOMContentLoaded', initTelegram);
      window.removeEventListener('load', initTelegram);
    };
  }, []);

  return null;
}
