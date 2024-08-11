import { useTranslation } from "react-i18next";
import { memo } from "react";
import { Page } from "@/widgets/Page";

const AdminPanelPage = memo(() => {
  const { t } = useTranslation();

  return (
    <Page data-testid="AdminPanelPage">
      {t('AdminPanelPage')}
    </Page>
  );
});

export default AdminPanelPage;