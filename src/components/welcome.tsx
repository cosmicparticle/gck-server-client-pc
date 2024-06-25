import React, { Component } from 'react';
import { Typography,Image,Row ,Col,Card} from 'antd';
import GroupLogo from './../../public/enhe-group-logo.png';
const { Title } = Typography;
interface WelcomeProps {

};

interface WelcomeState {
    devProgramCode: string,
};

export default class Welcome extends React.PureComponent<WelcomeProps, WelcomeState> {

    render(){
        return <Card bodyStyle={{paddingTop:'120px'}}>
            <Row  justify="center"><Col  span={12}><Title>欢迎使用恩赫售后服务平台</Title></Col></Row>
            <Row justify="center"><Col span={6}><Image width={200} preview={false} src={GroupLogo}></Image></Col></Row>
            <Row justify="center"><Col  span={8}><Title level={2}>恩赫集团售后服务平台</Title></Col></Row></Card>
    }
}