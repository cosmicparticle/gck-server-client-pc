import {DtmplConfig, DtmplData} from "aldehyde/lib/tmpl/interface";
import {HydrocarbonService,TmplConfigAnalysis,TmplDataSource} from "aldehyde";
import {message} from "antd";
import SaleOrderConstant from "./sale-order-constant";


function PurchaseOrderConstant() {

}
export default PurchaseOrderConstant;

PurchaseOrderConstant.addDTmpl = {
    key: '374351808388964365',
    name: '采购订单添加页面',
    sourceId: '374351808388964365',
    type: 'dtmpl',
}



PurchaseOrderConstant.addDTmpl_material = {
    key: 'cf0031206ba4982a5dce089b096c87eb',
    name: '原料',
    type: 'rfield',
}
PurchaseOrderConstant.addDTmpl_price = {
    key: '1555c63b22d5356898d656fa97f95f2b',
    name: '单价',
    type: 'field',
}

PurchaseOrderConstant.ltmpl_material_sanhuo = {
    sourceId: '376785603146850307',
    name: '是否杂货',
    type: 'field',
}



/**
 * 采购计划添加
 * @param dtmplConfig
 * @param dtmplData
 */
PurchaseOrderConstant.completeDtmplConfig = (dtmplConfig:DtmplConfig, dtmplData:DtmplData) => {

    function  setConfig(fieldMap:object,changedValues,formInstance?)
    {
        let materialCode = TmplConfigAnalysis.getFieldValueCodeOfMstrucId(dtmplConfig, fieldMap, PurchaseOrderConstant.addDTmpl_material.key, "");
        for (let field of dtmplConfig.groups[0].fields) {

            if (PurchaseOrderConstant.addDTmpl_price.key == field.mstrucId){
                debugger
                let material=TmplDataSource.getCache(materialCode);
                if(material){
                    if(material.fieldMap[PurchaseOrderConstant.ltmpl_material_sanhuo.sourceId]=="是"){
                        field.required=false;
                    }else{
                        field.required=true;
                    }
                }else{
                    field.required=true;
                }

                // if(""==productCode){
                //     field.disabled=true;
                // }
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





