import React from "react";
import { useTranslation } from "react-i18next";

import { AppPageSection, PageHeader } from "shared/components";
import { Paths } from "Paths";

import { controlsPage } from "./controls-utils";

export const EditCompanyHeader: React.FC = () => {
  const { t } = useTranslation(controlsPage);

  return (
    <AppPageSection>
      <PageHeader
        title={t("title")}
        breadcrumbs={[]}
        menuActions={[]}
        navItems={[
          {
            title: t("tabs.bussinessServices"),
            path: Paths.controls_bussinessServices,
          },
          {
            title: t("tabs.stakeholders"),
            path: Paths.controls_stakeholders,
          },
          {
            title: t("tabs.stakeholderGroups"),
            path: Paths.controls_stakeholderGroups,
          },
          {
            title: t("tabs.tags"),
            path: Paths.controls_tags,
          },
        ]}
      />
    </AppPageSection>
  );
};
