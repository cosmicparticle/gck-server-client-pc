import React, { Component } from "react";
import { ConfigProvider, theme } from "antd";
import "dayjs/locale/zh-cn";
import dayjs from "dayjs";
import zhCN from "antd/locale/zh_CN";
import { LocaleProvider, antdLangMp, useLocale } from "aldehyde";

import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.locale("zh-cn");
dayjs.extend(utc);
dayjs.extend(timezone);

const { useToken } = theme;
type Props = {
  children?: React.ReactNode;
};
const Config = (props) => {
  const { token } = useToken();
  const { getLocale } = useLocale();
  return (
    <ConfigProvider
      locale={antdLangMp[getLocale()]}
      componentSize={"small"}
      theme={{
        token: {
          // colorPrimary: "#00b96b",
        },
      }}
    >
      {props.children}
    </ConfigProvider>
  );
};

const App: React.FC<Props> = (props) => {
  return (
    // LocaleProvider 可自由注册配置国际化
    <LocaleProvider>
      <Config>{props.children}</Config>
    </LocaleProvider>
  );
};

export default App;
