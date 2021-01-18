import React from "react";

import { AppPageSection, PageHeader } from "shared/components";
import { Paths } from "Paths";

export const EditCompanyHeader: React.FC = () => {
  return (
    <AppPageSection>
      <PageHeader
        title="Controls"
        breadcrumbs={[]}
        menuActions={[]}
        navItems={[
          {
            title: "Bussiness services",
            path: Paths.controls_bussinessServices,
          },
          {
            title: "Stakeholders",
            path: Paths.controls_stakeholders,
          },
          {
            title: "Stakeholder groups",
            path: Paths.controls_stakeholderGroups,
          },
          {
            title: "Tags",
            path: Paths.controls_tags,
          },
        ]}
      />
    </AppPageSection>
  );
};
