import { useTranslation } from "react-i18next";

const AboutPage = () => {
  // можно указ. name space = translation
  const {t} = useTranslation('about');

  return (
    <div>
      {t('О сайте')}
    </div>
  );
};

export default AboutPage;