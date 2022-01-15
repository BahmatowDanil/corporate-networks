import { useProvideLanguage } from '../hooks/useProvideLanguage';
import { LanguageContext } from '../contexts/LanguageContext';

export const ProvideLanguage = ({ children }) => {
  const language = useProvideLanguage();
    
  return (
    <LanguageContext.Provider value={language}>
      {children}
    </LanguageContext.Provider>
  );
}