
import {HydrocarbonService,TmplConfigAnalysis,TmplDataSource} from "aldehyde";
import {message} from "antd";
import {DtmplConfig, DtmplData} from  "aldehyde/lib/tmpl/interface";
import SaleOrderConstant from "./sale-order-constant";
import {BigNumber} from 'bignumber.js'

function CarManageConstant() {

}
export default CarManageConstant;

CarManageConstant.addDTmpl = {
    name: '默认详情-外部',
    sourceId: '374552353296916484',
    type: 'dtmpl',
}

CarManageConstant.addDtmpl_acount = {
    key: '894bd1d8299fef0a3dd20b479beeb965',
    name: '客户',
    type: 'rfield',
}






/**
 * 销售订单添加
 * @param dtmplConfig
 * @param dtmplData
 */
CarManageConstant.completeDtmplConfig = (dtmplConfig:DtmplConfig, dtmplData:DtmplData) => {

    function  setConfig(fieldMap:object,changedValues,formInstance?)
    {
        //let usaAmountFieldId=TmplConfigAnalysis.getFieldId(dtmplConfig,SanhuOrderConstant.addAtmpl_usa_amount.key)

        for (let field of dtmplConfig.groups[0].fields) {
            if (CarManageConstant.addDtmpl_acount.key == field.mstrucId){




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



