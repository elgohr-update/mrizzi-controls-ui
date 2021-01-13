import React from "react";
import { BrowserRouter } from "react-router-dom";

import "./App.scss";

import { DefaultLayout } from "./layout";

import NotificationsPortal from "@redhat-cloud-services/frontend-components-notifications/cjs/NotificationPortal";
import "@redhat-cloud-services/frontend-components-notifications/index.css";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <DefaultLayout>hello</DefaultLayout>
      <NotificationsPortal />
    </BrowserRouter>
  );
};

export default App;
