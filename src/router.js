import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import loadable from "@loadable/component";
import { Image, Spin, Typography } from "antd";
import {
  ProgramConfig,
  MainPage,
  HCWelcome,
  RouterLogin,
  LtmplRoute,
  TtmplRoute,
  DtmplRoute,
  ExcelImportRoute,
  HCCustomPageRouter,
  ContextSetter,
} from "aldehyde";
import Logo from "./../public/enhe-logo.png";
const { Text } = Typography;
const Loading = <Spin tip="Loading..."></Spin>;
const App = loadable(() => import("./App"), { fallback: Loading });

export default class HydrocarbonRouter extends React.Component {
  render() {
    let home = ProgramConfig.getCustomPage(ProgramConfig.programCode()) ? (
      React.createElement(
        ProgramConfig.getCustomPage(ProgramConfig.programCode())
      )
    ) : (
      <HCWelcome />
    );
    return (
      <HashRouter>
        <App>
          <Routes>
            <Route path="login" element={<RouterLogin />} />
            <Route path="login/:programCode" element={<RouterLogin />} />
            {/* <Route path="/page/:sourceId/laneLoad" element={<LaneLoad />} /> */}
            <Route path="context-setter" element={<ContextSetter />} />
            <Route
              path="*"
              element={
                <MainPage
                  // sideBarLogo={Logo}
                  footer={"Enterprise Applications ©2022 Created by 恩赫科技"}
                >
                  <Routes>
                    <Route path="/home/:programCode" element={home}>
                      {" "}
                    </Route>
                    <Route path="/home" element={home}>
                      {" "}
                    </Route>
                    <Route
                      path="/page/:sourceId/:pageName"
                      element={<HCCustomPageRouter />}
                      exact
                    />
                    <Route
                      path="/:sourceId/act-table"
                      element={<LtmplRoute />}
                      exact
                    />
                    <Route
                      path="/:sourceId/act-Tree"
                      element={<TtmplRoute />}
                      exact
                    />
                    <Route
                      path="/:sourceId/detail-view"
                      element={<DtmplRoute />}
                      exact
                    />
                    <Route
                      path="/:sourceId/detail-edit"
                      element={<DtmplRoute />}
                      exact
                    />
                    <Route
                      path="/:sourceId/importer"
                      element={<ExcelImportRoute />}
                      exact
                    />
                    <Route path="/" element={home} exact />
                  </Routes>
                </MainPage>
              }
            />
          </Routes>
        </App>
      </HashRouter>
    );
  }
}
