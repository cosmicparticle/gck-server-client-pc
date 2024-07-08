import "core-js/es"; //用于兼容低版本浏览器
import React from "react";
import { createRoot } from "react-dom/client";
import HydrocarbonRouter from "./router";
import "antd/dist/reset.css";
import { loadableReady } from "@loadable/component";
import { HydrocarbonService, ProgramConfig } from "aldehyde";
import ProgramConfigJson from "../public/programConfig.json";
import Welcome from "./components/welcome";
import SaleOrderConstant from "./tmpl/sale-order-constant";
import FinaneRechargeConstant from "./tmpl/finance-recharge-constant";
import PurchaseOrderConstant from "./tmpl/purchase-order-constant";
import SanhuPurchaseOrderConstant from "./tmpl/sanhu-purchase-order-constant";

loadableReady(async () => {
  const root = createRoot(document.getElementById("root"));
  await HydrocarbonService.initProgramConfig(ProgramConfigJson);
 // ProgramConfig.setCustomPage(ProgramConfig.programCode(), Welcome);
  //ProgramConfig.setCustomPage("/laneLoad", LaneLoad);
  ProgramConfig.setAppDtmplConfigFunc(SaleOrderConstant.addDTmpl.sourceId, SaleOrderConstant.completeDtmplConfig);
  ProgramConfig.setAppDtmplConfigFunc(SaleOrderConstant.addDTmpl_supple.sourceId, SaleOrderConstant.completeDtmplConfig_supple);
  ProgramConfig.setAppDtmplConfigFunc(SaleOrderConstant.addDTmpl_retail.sourceId, SaleOrderConstant.completeDtmplConfig);
  ProgramConfig.setAppDtmplConfigFunc(FinaneRechargeConstant.addDTmpl.sourceId, FinaneRechargeConstant.completeDtmplConfig);
  ProgramConfig.setAppDtmplConfigFunc(PurchaseOrderConstant.addDTmpl.sourceId, PurchaseOrderConstant.completeDtmplConfig);
  ProgramConfig.setAppDtmplConfigFunc(SanhuPurchaseOrderConstant.addDTmpl.sourceId, SanhuPurchaseOrderConstant.completeDtmplConfig);
  root.render(<HydrocarbonRouter />);
});
