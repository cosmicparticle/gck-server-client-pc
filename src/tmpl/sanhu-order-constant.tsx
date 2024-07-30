
import {HydrocarbonService,TmplConfigAnalysis,TmplDataSource} from "aldehyde";
import {message} from "antd";
import {DtmplConfig, DtmplData} from  "aldehyde/lib/tmpl/interface";
import SaleOrderConstant from "./sale-order-constant";
import {BigNumber} from 'bignumber.js'

function SanhuOrderConstant() {

}
export default SanhuOrderConstant;

SanhuOrderConstant.addATmpl = {
    //key: '377098201604071427',
    name: '组合收款',
    sourceId: '377098278913482754',
    type: 'atmpl',
}

SanhuOrderConstant.addAtmpl_ganglang_amount = {
    key: 'd8e48200fa3bd840a446abd1ec79b511',
    name: '刚果法郎金额',
    type: 'field',
}

SanhuOrderConstant.addAtmpl_ganglang_amount = {
    key: '5b29af741d8d073705c7360d3041a31c',
    name: '美元金额',
    type: 'field',
}

SanhuOrderConstant.addAtmpl_usa_amount = {
    key: 'd8e48200fa3bd840a446abd1ec79b511',
    name: '美元金额',
    type: 'field',
}

SanhuOrderConstant.addAtmpl_ganglang_all = {
    key: '32dd912df2d26287e1d4f5a9d5d3be97',
    name: '刚果法郎总金额',
    type: 'field',
}

SanhuOrderConstant.addAtmpl_usa_all = {
    key: 'bb44b093f312115a41ddaf8f3e1d184d',
    name: '美元总金额',
    type: 'field',
}

SanhuOrderConstant.addAtmpl_exchangerate_amount = {
    sourceId: '376774928005636099',
    name: '计算汇率',
    type: 'field',
}





/**
 * 销售订单添加
 * @param dtmplConfig
 * @param dtmplData
 */
SanhuOrderConstant.completeAtmplConfig = (dtmplConfig:DtmplConfig, dtmplData:DtmplData) => {

    function  setConfig(fieldMap:object,changedValues,formInstance?)
    {
        //let usaAmountFieldId=TmplConfigAnalysis.getFieldId(dtmplConfig,SanhuOrderConstant.addAtmpl_usa_amount.key)

        for (let field of dtmplConfig.groups[0].fields) {
            if (SanhuOrderConstant.addAtmpl_ganglang_amount.key == field.mstrucId){
                let usaAcount = TmplConfigAnalysis.getFieldValueOfMstrucId(dtmplConfig, fieldMap, SanhuOrderConstant.addAtmpl_usa_amount.key, null);
                let ganglangAll=TmplConfigAnalysis.getFieldValueOfMstrucId(dtmplConfig, fieldMap,SanhuOrderConstant.addAtmpl_ganglang_all.key,null);
                let usaAll=TmplConfigAnalysis.getFieldValueOfMstrucId(dtmplConfig, fieldMap,SanhuOrderConstant.addAtmpl_usa_all.key,null)
                let exchangerate=dtmplData?.fieldMap[SanhuOrderConstant.addAtmpl_exchangerate_amount.sourceId];
                let ganglangAmountFieldId=TmplConfigAnalysis.getFieldId(dtmplConfig,SanhuOrderConstant.addAtmpl_ganglang_amount.key)
                let usaAmountFieldId=TmplConfigAnalysis.getFieldId(dtmplConfig,SanhuOrderConstant.addAtmpl_usa_amount.key)
                if(usaAcount && usaAcount>0 && exchangerate && formInstance ){
                    let ganglangAcount=0.0;
                    usaAcount=Number(usaAcount).toFixed(2);
                    if(usaAll-usaAcount<0.01){
                        usaAcount=usaAll-0.01;
                        ganglangAcount=exchangerate*0.01;
                    }else{
                        ganglangAcount=ganglangAll-(usaAcount*exchangerate);
                    }
                    let fexGanglangAcount=ganglangAcount.toFixed(2);
                    if(ganglangAcount>Number(fexGanglangAcount)){
                        ganglangAcount=Number(fexGanglangAcount)+0.01;
                    }else{
                        ganglangAcount=Number(fexGanglangAcount);
                    }
                        formInstance.setFieldValue(usaAmountFieldId,usaAcount);
                        formInstance.setFieldValue(ganglangAmountFieldId,ganglangAcount.toFixed(2));
                }

                field.disabled=true;
                field.shouldUpdate=true;
            }
        }

    }
    setConfig(dtmplData?dtmplData.fieldMap:null,null);

    dtmplConfig.onValuesChange=(changedValues,allValues,formInstance)=>{
        setConfig(allValues.fieldMap,changedValues,formInstance);
    }
    return dtmplConfig;
}



