import {DtmplConfig, DtmplData} from "aldehyde/lib/tmpl/interface";
import {HydrocarbonService,TmplConfigAnalysis,TmplDataSource} from "aldehyde";
import {message} from "antd";
import SaleOrderConstant from "./sale-order-constant";


function SanhuPurchaseOrderConstant() {

}
export default SanhuPurchaseOrderConstant;

SanhuPurchaseOrderConstant.addDTmpl = {
    key: '376736088616378380',
    name: '采购订单添加页面',
    sourceId: '376736088616378380',
    type: 'dtmpl',
}

SanhuPurchaseOrderConstant.addDTmpl_account_s = {
    key: '8a0bdfd828f054b8bd26226b4c19b1b6',
    name: '账户名-散户',
    type: 'rfield',
}

SanhuPurchaseOrderConstant.addDtmpl_product = {
    key: 'e6a0ebb1e4394ffda4bacbb57031afe2',
    name: '产品名',
    type: 'rfield',
}

SanhuPurchaseOrderConstant.addDtmpl_weight = {
    key: '59f5f5ea155867c81135be92ad9a56cc',
    name: '重量',
    type: 'field',
}

SanhuPurchaseOrderConstant.addDtmpl_packages = {
    key: '61cc9fb5f93b96e6dc189c538d47baa0',
    name: '包数',
    type: 'field',
}
SanhuPurchaseOrderConstant.ltmpl_product_type = {
    sourceId:"374554011154292739",
    name: '产品类型',
    type: 'field',
}




/**
 * 散户开单添加
 * @param dtmplConfig
 * @param dtmplData
 */
SanhuPurchaseOrderConstant.completeDtmplConfig = (dtmplConfig:DtmplConfig, dtmplData:DtmplData) => {

    function  setConfig(fieldMap:object,changedValues,formInstance?)
    {
        let accountFieldId=TmplConfigAnalysis.getFieldId(dtmplConfig,SanhuPurchaseOrderConstant.addDTmpl_account_s.key)
        let acount = TmplConfigAnalysis.getFieldValueOfMstrucId(dtmplConfig, fieldMap, SanhuPurchaseOrderConstant.addDTmpl_account_s.key, "");
        let productFieldId=TmplConfigAnalysis.getFieldId(dtmplConfig,SanhuPurchaseOrderConstant.addDtmpl_product.key)
        let productCode = TmplConfigAnalysis.getFieldValueCodeOfMstrucId(dtmplConfig, fieldMap, SanhuPurchaseOrderConstant.addDtmpl_product.key, "");
        for (let field of dtmplConfig.groups[0].fields) {
            if (SanhuPurchaseOrderConstant.addDtmpl_product.key == field.mstrucId){
                if(""!=acount){
                    field.baseCriteria ={"c_376771616585850882":acount}
                    field.disabled=false;
                }else{
                    field.baseCriteria={}
                    field.disabled=true;
                }
                field.shouldUpdate=true;
                if(changedValues && changedValues.hasOwnProperty(accountFieldId)){
                    formInstance.setFieldValue(productFieldId,null);
                }
            }else if(SanhuPurchaseOrderConstant.addDtmpl_weight.key == field.mstrucId){
                let packagesFieldId=TmplConfigAnalysis.getFieldId(dtmplConfig,SanhuPurchaseOrderConstant.addDtmpl_weight.key)
                let product=TmplDataSource.getCache(productCode);

                if(product){
                    if(product.fieldMap[SanhuPurchaseOrderConstant.ltmpl_product_type.sourceId]=="袋装"){
                        formInstance.setFieldValue(packagesFieldId,null);
                        field.disabled=true;
                        field.required=false;
                    }else{
                        field.required=true;
                        field.disabled=false;
                    }
                }
                if(""==productCode){
                    field.disabled=true;
                    field.required=false;
                }
                field.shouldUpdate=true;
            }else if(SanhuPurchaseOrderConstant.addDtmpl_packages.key == field.mstrucId){
                let product=TmplDataSource.getCache(productCode);
                if(product){
                    let packagesFieldId=TmplConfigAnalysis.getFieldId(dtmplConfig,SanhuPurchaseOrderConstant.addDtmpl_packages.key)
                    if(product.fieldMap[SanhuPurchaseOrderConstant.ltmpl_product_type.sourceId]=="袋装"){
                        field.disabled=false;
                        field.required=true;
                    }else{
                        formInstance.setFieldValue(packagesFieldId,null);
                        field.disabled=true;
                        field.required=false;
                    }
                }
                if(""==productCode){
                    field.disabled=true;
                    field.required=false;
                }
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





