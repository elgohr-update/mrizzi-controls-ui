import React from "react";
import { NavLink } from "react-router-dom";
import { Nav, NavItem, PageSidebar, NavGroup } from "@patternfly/react-core";

import { Paths } from "Paths";
import { LayoutTheme } from "../LayoutUtils";

export const SidebarApp: React.FC = () => {
  const renderPageNav = () => {
    return (
      <Nav id="nav-primary-simple" aria-label="Nav" theme={LayoutTheme}>
        <NavGroup title="Global">
          <NavItem>
            <NavLink to={Paths.companyList} activeClassName="pf-m-current">
              Menu1
            </NavLink>
          </NavItem>
        </NavGroup>
        <NavGroup title="Company">
          <NavItem>
            <NavLink to={Paths.documentList} activeClassName="pf-m-current">
              Menu2
            </NavLink>
          </NavItem>
        </NavGroup>
      </Nav>
    );
  };

  return <PageSidebar nav={renderPageNav()} theme={LayoutTheme} />;
};
