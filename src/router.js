import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import loadable from "@loadable/component";
import { Image, Spin, Typography,Card } from "antd";
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
import Logo from "../src/style/gcklogo.png";
import img1 from "../src/style/gck-picture1.png";
import img3 from "../src/style/gck-picture3.jpg";

const { Text } = Typography;
const Loading = <Spin tip="Loading..."></Spin>;
const App = loadable(() => import("./App"), { fallback: Loading });

const { Meta } = Card;

export default class HydrocarbonRouter extends React.Component {

  loginTheme=<div style={{display: 'flex', justifyContent: 'right', }}>
    <Card  style={{ width:700}} cover={<Image src={img1} preview={false} ></Image>} >
    <Meta title="GCK par Actions Simplifiée"  /></Card></div>

  routerLogin =<RouterLogin  theme={this.loginTheme} centerStyle={{
         background: `url(${img3})`,
         backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
     }} themePosition={'center'} />

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
            <Route path="login" element={this.routerLogin} />
            <Route path="login/:programCode" element={this.routerLogin} />
            {/* <Route path="/page/:sourceId/laneLoad" element={<LaneLoad />} /> */}
            <Route path="context-setter" element={<ContextSetter />} />
            <Route
              path="*"
              element={
                <MainPage
                    leftHeader={ <Image src={Logo} preview={false}  />}
                    leftCollapsedHeader={<h1>GCK</h1>}
                  sideBarLogo={Logo}
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
                    <Route
                        path=":sourceId/report-table"
                        element={<LtmplRoute tableType={"report"} />}
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
