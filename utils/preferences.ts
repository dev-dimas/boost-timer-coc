const getLanguagePreferences = async (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (localStorage.getItem('isEnglish') === 'true') {
      resolve(true);
    } else if (localStorage.getItem('isEnglish') === 'false') {
      resolve(false);
    } else {
      localStorage.setItem('isEnglish', 'false');
      resolve(false);
    }
  });
};

export { getLanguagePreferences };
