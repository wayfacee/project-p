import { useTranslation } from "react-i18next";
import { Page } from "@/widgets/Page/Page";

const AboutPage = () => {
  // можно указ. name space = translation
  const {t} = useTranslation('about');

  return (
    <Page data-testid='AboutPage'>
      {t('О сайте')}
    </Page>
  );
};

export default AboutPage;