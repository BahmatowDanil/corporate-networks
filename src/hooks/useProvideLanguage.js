import { useState } from 'react';

import ru from '../dictionaries/ru.json';
import en from '../dictionaries/en.json';

const languages = [
  { id: 1, language: 'Russian' },
  { id: 2, language: 'English' }
];

export const useProvideLanguage = () => {
  const [currentLanguageId, setCurrentLanguageId] = useState(1);
  const [currentDictionary, setCurrentDictionary] = useState(ru);

  const changeLanguage = (id) => {
    if(!languages.some(item => item.id === id))
      return;

    setCurrentLanguageId(id);
    switch(id) {
      case 1:
        setCurrentDictionary(ru);
        break;
      case 2:
        setCurrentDictionary(en);
        break;
      default:
        setCurrentDictionary(ru);
        break;
    }
  };

  return {
    languages,
    currentLanguageId,
    currentDictionary,
    changeLanguage
  };
}