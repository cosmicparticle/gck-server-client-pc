import {DtmplConfig, DtmplData} from "aldehyde/lib/tmpl/interface";
import {HydrocarbonService,TmplConfigAnalysis,TmplDataSource} from "aldehyde";
import {message} from "antd";


function SaleOrderConstant() {

}
export default SaleOrderConstant;

SaleOrderConstant.addDTmpl = {
    key: '371724695005601823',
    name: '销售订单添加页面',
    sourceId: '371724695005601823',
    type: 'dtmpl',
}
SaleOrderConstant.addDTmpl_supple = {
    key: '369676998480273450',
    name: '销售订单手工补录',
    sourceId: '369676998480273450',
    type: 'dtmpl',
}

SaleOrderConstant.addDTmpl_retail = {
    key: '373014675548053526',
    name: '销售散户下单',
    sourceId: '373014675548053526',
    type: 'dtmpl',
}


SaleOrderConstant.addDTmpl_account_s = {
    key: 'cf24e46b5fc414312a7934d3fe2eecdf',
    name: '账户名-散户',
    type: 'rfield',
}
SaleOrderConstant.addDTmpl_account = {
    key: '45c48391d355dcff4c18a0a6373171d8',
    name: '账户名',
    type: 'rfield',
}

SaleOrderConstant.addDtmpl_car = {
    key: '9368f98bfdcbd821f821a0bc61532897',
    name: '车牌号',
    type: 'rfield',
}

SaleOrderConstant.addDtmpl_product = {
    key: '082064389d56e06c31680092cb2a0128',
    name: '产品名',
    type: 'rfield',
}


SaleOrderConstant.addDtmpl_weight = {
    key: '78505fa91e0beb4dee93ff0cf487234a',
    name: '重量',
    type: 'field',
}

SaleOrderConstant.addDtmpl_packages = {
    key: '24304a08a6e4b885b8cac3758ae32d4c',
    name: '包数',
    type: 'field',
}

SaleOrderConstant.addDtmpl_receiptype = {
    key: '3d55a28f9ca007c35297c8bed41ddfbb',
    name: '收货类型',
    type: 'field',
}

SaleOrderConstant.addDtmpl_driver = {
    key: 'eaa2c11c51aff4bade0a3f2cdd89087b',
    name: '司机',
    type: 'rfield',
}
SaleOrderConstant.addDtmpl_dvpoint = {
    key: 'da3504059b11063df5909be7a49e71a7',
    name: '送货点',
    type: 'rfield',
}

SaleOrderConstant.ltmpl_product_type = {
    sourceId:"374554011154292739",
    name: '产品类型',
    type: 'field',
}

SaleOrderConstant.ltmpl_product_isDelivery = {
    sourceId:"374397000034852867",
    name: '需要配送',
    type: 'field',
}


/**
 * 销售订单添加
 * @param dtmplConfig
 * @param dtmplData
 */
SaleOrderConstant.completeDtmplConfig = (dtmplConfig:DtmplConfig, dtmplData:DtmplData) => {

    //let mstrucGroupId1 = HydrogenConstant.getFieldValueCodeOfMstrucId(dtmplConfig, dtmplData, HydrogenConstant.criteriaMstrucGroupId1_mstruc.key);
    // console.log('待修的', dtmplConfig);
    // console.log('待修的', dtmplData);
    function  setConfig(fieldMap:object,changedValues,formInstance?)
    {
        let accountFieldId=TmplConfigAnalysis.getFieldId(dtmplConfig,SaleOrderConstant.addDTmpl_account.key)
        let carFieldId=TmplConfigAnalysis.getFieldId(dtmplConfig,SaleOrderConstant.addDtmpl_car.key)
        let driverFieldId=TmplConfigAnalysis.getFieldId(dtmplConfig,SaleOrderConstant.addDtmpl_driver.key)
        let acount = TmplConfigAnalysis.getFieldValueOfMstrucId(dtmplConfig, fieldMap, SaleOrderConstant.addDTmpl_account.key, "");
        let acountCode = TmplConfigAnalysis.getFieldValueCodeOfMstrucId(dtmplConfig, fieldMap, SaleOrderConstant.addDTmpl_account.key, "");
        if(""==acount){
            acount = TmplConfigAnalysis.getFieldValueOfMstrucId(dtmplConfig, fieldMap, SaleOrderConstant.addDTmpl_account_s.key, "");
            acountCode = TmplConfigAnalysis.getFieldValueCodeOfMstrucId(dtmplConfig, fieldMap, SaleOrderConstant.addDTmpl_account_s.key, "");
        }

        let product = TmplConfigAnalysis.getFieldValueOfMstrucId(dtmplConfig, fieldMap, SaleOrderConstant.addDtmpl_product.key, "");
        let productCode = TmplConfigAnalysis.getFieldValueCodeOfMstrucId(dtmplConfig, fieldMap, SaleOrderConstant.addDtmpl_product.key, "");
        for (let field of dtmplConfig.groups[0].fields) {
            if (SaleOrderConstant.addDtmpl_car.key == field.mstrucId){

                if(""!=acount){
                    field.baseCriteria ={"c_374288489833603074":acount}
                    field.disabled=false;
                    field.required=true;
                }else{
                    field.baseCriteria={}
                    field.required=false;
                    field.disabled=true;
                }
                let receiptype=TmplConfigAnalysis.getFieldValueOfMstrucId(dtmplConfig, fieldMap, SaleOrderConstant.addDtmpl_receiptype.key, "");
                if(receiptype=="配送"){
                    field.disabled=true;
                    field.required=false;
                }
                field.shouldUpdate=true;
                if(changedValues && changedValues.hasOwnProperty(accountFieldId)){
                    formInstance.setFieldValue(carFieldId,null);
                }
            }else if (SaleOrderConstant.addDtmpl_product.key == field.mstrucId){
                if(""!=acount){
                    field.baseCriteria ={"c_375142365839269890":acount}
                    field.disabled=false;
                }else{
                    field.baseCriteria={}

                    field.disabled=true;
                }
                field.shouldUpdate=true;
                if(changedValues && changedValues.hasOwnProperty(accountFieldId)){
                    formInstance.setFieldValue(carFieldId,null);
                }
            }else if (SaleOrderConstant.addDtmpl_driver.key == field.mstrucId){

                if(""!=acount){
                    field.baseCriteria ={"c_374682600327651330":acount}
                    field.disabled=false;
                }else{
                    field.baseCriteria={}

                    field.disabled=true;
                }
                field.shouldUpdate=true;
                if(changedValues && changedValues.hasOwnProperty(accountFieldId)){
                    formInstance.setFieldValue(driverFieldId,null);
                }
            } else if(SaleOrderConstant.addDtmpl_weight.key == field.mstrucId){
                let packagesFieldId=TmplConfigAnalysis.getFieldId(dtmplConfig,SaleOrderConstant.addDtmpl_weight.key)
                let product=TmplDataSource.getCache(productCode);
                if(product){
                    if(product.fieldMap[SaleOrderConstant.ltmpl_product_type.sourceId]=="袋装"){
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
                }
                field.shouldUpdate=true;
            }else if(SaleOrderConstant.addDtmpl_packages.key == field.mstrucId){
                let product=TmplDataSource.getCache(productCode);
                if(product){
                    let packagesFieldId=TmplConfigAnalysis.getFieldId(dtmplConfig,SaleOrderConstant.addDtmpl_packages.key)
                    if(product.fieldMap[SaleOrderConstant.ltmpl_product_type.sourceId]=="袋装"){
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
                }
                field.shouldUpdate=true;
            }else if(SaleOrderConstant.addDtmpl_receiptype.key == field.mstrucId){
                let product=TmplDataSource.getCache(productCode);
                if(product){
                    let rtypeFieldId=TmplConfigAnalysis.getFieldId(dtmplConfig,SaleOrderConstant.addDtmpl_receiptype.key)
                    if(product.fieldMap[SaleOrderConstant.ltmpl_product_isDelivery.sourceId]=="是"){
                        field.disabled=true;
                        formInstance.setFieldValue(rtypeFieldId,"配送");
                    }else{
                        field.disabled=false;
                    }
                }
                field.shouldUpdate=true;
            }else if(SaleOrderConstant.addDtmpl_dvpoint.key == field.mstrucId){
                let pointFieldId=TmplConfigAnalysis.getFieldId(dtmplConfig,SaleOrderConstant.addDtmpl_dvpoint.key)
                let receiptype=TmplConfigAnalysis.getFieldValueOfMstrucId(dtmplConfig, fieldMap, SaleOrderConstant.addDtmpl_receiptype.key, "");
                if(receiptype=="配送"){
                    field.disabled=false;
                    field.required=true;
                }else{
                    field.disabled=true;
                    field.required=false;
                    if(formInstance){
                        formInstance.setFieldValue(pointFieldId,null);
                    }

                }
                field.shouldUpdate=true;
            }
        }

    }
    setConfig(dtmplData?dtmplData.fieldMap:null,null);
    dtmplConfig.onValuesChange=(changedValues,allValues,formInstance)=>{
        // let mstrucGroupId2FieldId = HydrogenConstant.getFieldId(dtmplConfig, CriteriaConstant.criteriaMstrucGroupId2_mstruc.key);
        // let dataSourceFieldId = HydrogenConstant.getFieldId(dtmplConfig, CriteriaConstant.criteriaPointMstrucId_mstruc.key);
        setConfig(allValues.fieldMap,changedValues,formInstance);
        // if(changedValues[mstrucGroupId2FieldId] && dataSourceFieldId){//修改了，把数据源的值置空
        //     formInstance.setFieldValue(dataSourceFieldId,[]);
        // }
    }
    return dtmplConfig;
}



