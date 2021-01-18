import React from "react";
import { NavLink } from "react-router-dom";
import { Nav, NavItem, PageSidebar, NavList } from "@patternfly/react-core";

import { Paths } from "Paths";
import { LayoutTheme } from "../LayoutUtils";

export const SidebarApp: React.FC = () => {
  const renderPageNav = () => {
    return (
      <Nav id="nav-primary" aria-label="Nav" theme={LayoutTheme}>
        <NavList title="Global">
          <NavItem>
            <NavLink
              to={Paths.applicationInventory}
              activeClassName="pf-m-current"
            >
              Application inventory
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to={Paths.reports} activeClassName="pf-m-current">
              Report
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to={Paths.controls} activeClassName="pf-m-current">
              Controls
            </NavLink>
          </NavItem>
        </NavList>
      </Nav>
    );
  };

  return <PageSidebar nav={renderPageNav()} theme={LayoutTheme} />;
};
