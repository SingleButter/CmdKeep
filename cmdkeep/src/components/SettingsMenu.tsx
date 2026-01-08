import { useState, useRef, useEffect } from "react";
import { Settings, Globe, Check } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { Language } from "../i18n/translations";

function SettingsMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setIsOpen(false);
  };

  return (
    <div className="settings-container" ref={menuRef}>
      <button
        className="settings-button"
        onClick={() => setIsOpen(!isOpen)}
        title={t('settings')}
      >
        <Settings size={20} />
        <span>{t('settings')}</span>
      </button>

      {isOpen && (
        <div className="settings-menu">
          <div className="settings-menu-section">
            <div className="settings-menu-header">
              <Globe size={16} />
              <span>{t('language')}</span>
            </div>
            <div className="settings-menu-items">
              <button
                className={`settings-menu-item ${language === 'zh' ? 'active' : ''}`}
                onClick={() => handleLanguageChange('zh')}
              >
                <span>{t('chinese')}</span>
                {language === 'zh' && <Check size={16} />}
              </button>
              <button
                className={`settings-menu-item ${language === 'en' ? 'active' : ''}`}
                onClick={() => handleLanguageChange('en')}
              >
                <span>{t('english')}</span>
                {language === 'en' && <Check size={16} />}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SettingsMenu;
