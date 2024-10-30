
import {DtmplConfig, DtmplData, LtmplConfig} from "aldehyde/lib/tmpl/interface";


function ProcurementDeliveryConstant() {

}
export default ProcurementDeliveryConstant;

ProcurementDeliveryConstant.Ltmpl = {
    name: '采购配送列表模板',
    sourceId: '367388854653329418',
    type: 'ltmpl',
}



ProcurementDeliveryConstant.lTmpl_criteria_material = {
    sourceId: '376026280846204930',
    key:"c_376026280846204930",
    name: '原料',
    type: 'rfield',
}
ProcurementDeliveryConstant.lTmpl_criteria_supplier = {
    sourceId: '386574413435019266',
    key:"c_386574413435019266",
    name: '供应商',
    type: 'rfield',
}




/**
 * 销售订单添加
 * @param dtmplConfig
 * @param dtmplData
 */
ProcurementDeliveryConstant.completeCtmplConfig = (ltmplConfig:LtmplConfig, data:Object) => {

    function  setConfig(fieldMap:object,changedValues,formInstance?) {

        for (let criteria of ltmplConfig.criterias) {
            if(criteria.id==ProcurementDeliveryConstant.lTmpl_criteria_supplier.sourceId){
                let mar=changedValues?  changedValues[ProcurementDeliveryConstant.lTmpl_criteria_material.key]:null;
                if(changedValues && changedValues.hasOwnProperty(ProcurementDeliveryConstant.lTmpl_criteria_material.key)){
                    //关联物料
                    criteria.baseCriteria ={"c_387832703561277442":mar}

                    if(formInstance.getFieldValue(ProcurementDeliveryConstant.lTmpl_criteria_supplier.key)){
                        formInstance.setFieldValue(ProcurementDeliveryConstant.lTmpl_criteria_supplier.key,null);
                    }
                }
                criteria.shouldUpdate=true;
            }
        }

    }
    setConfig(data,null);
    ltmplConfig.onCriteriaValuesChange=(changedValues,allValues,formInstance)=>{
        setConfig(allValues,changedValues,formInstance);
    }
    return ltmplConfig;
}





