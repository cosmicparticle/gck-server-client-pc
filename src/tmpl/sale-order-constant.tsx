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


SaleOrderConstant.addDTmpl_account = {
    key: 'd36df1a16fa982461d4a482dbd14ec74',
    name: '账户名',
    type: 'rfield',
}
SaleOrderConstant.addDTmpl_account_s = {
    key: '45c48391d355dcff4c18a0a6373171d8',
    name: '账户名-散户',
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

SaleOrderConstant.addDtmpl_sanhu = {
    key: 'e4f63eef5e6a1b5e9769e84596952003',
    name: '是否散户',
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
        let productFieldId=TmplConfigAnalysis.getFieldId(dtmplConfig,SaleOrderConstant.addDtmpl_product.key)
        let sanhuFieldId=TmplConfigAnalysis.getFieldId(dtmplConfig,SaleOrderConstant.addDtmpl_sanhu.key)
        let driverFieldId=TmplConfigAnalysis.getFieldId(dtmplConfig,SaleOrderConstant.addDtmpl_driver.key)
        let sanhu = TmplConfigAnalysis.getFieldValueOfMstrucId(dtmplConfig, fieldMap, SaleOrderConstant.addDtmpl_sanhu.key, "");
        let acount_j = TmplConfigAnalysis.getFieldValueOfMstrucId(dtmplConfig, fieldMap, SaleOrderConstant.addDTmpl_account.key, "");
        let acount=acount_j;
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
                if(""!=acount_j){
                    field.baseCriteria ={"c_376771616585850882":acount_j}
                    field.disabled=false;
                }else if("" != acount ){
                    field.baseCriteria={}
                    field.disabled=false;
                }else {
                    field.baseCriteria={}
                    field.disabled=true;
                }
                field.shouldUpdate=true;
                if(changedValues && changedValues.hasOwnProperty(accountFieldId)){
                    formInstance.setFieldValue(productFieldId,null);
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
            }else if(SaleOrderConstant.addDtmpl_receiptype.key == field.mstrucId){
                 let receiptypeFieldId=TmplConfigAnalysis.getFieldId(dtmplConfig,SaleOrderConstant.addDtmpl_receiptype.key)
                 let product=TmplDataSource.getCache(productCode);
                 if(product && !formInstance.getFieldValue(receiptypeFieldId)){
                     if(product.fieldMap[SaleOrderConstant.ltmpl_product_isDelivery.sourceId]=="是"){
                         formInstance.setFieldValue(receiptypeFieldId,"配送");
                     }else{
                         formInstance.setFieldValue(receiptypeFieldId,"自提");
                     }
                 }
                 field.required=true;
                 // if(""==productCode){
                 //     field.disabled=true;
                 // }
                 field.shouldUpdate=true;
             } else if(SaleOrderConstant.addDtmpl_weight.key == field.mstrucId){
                let weightFieldId=TmplConfigAnalysis.getFieldId(dtmplConfig,SaleOrderConstant.addDtmpl_weight.key)
                let product=TmplDataSource.getCache(productCode);
                if(product){
                    if(product.fieldMap[SaleOrderConstant.ltmpl_product_type.sourceId]=="袋装"){
                        formInstance.setFieldValue(weightFieldId,null);
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
                    field.required=false;
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

SaleOrderConstant.completeDtmplConfig_supple = (dtmplConfig:DtmplConfig, dtmplData:DtmplData) => {

    //let mstrucGroupId1 = HydrogenConstant.getFieldValueCodeOfMstrucId(dtmplConfig, dtmplData, HydrogenConstant.criteriaMstrucGroupId1_mstruc.key);
    // console.log('待修的', dtmplConfig);
    // console.log('待修的', dtmplData);
    function  setConfig(fieldMap:object,changedValues,formInstance?)
    {
        let accountFieldId=TmplConfigAnalysis.getFieldId(dtmplConfig,SaleOrderConstant.addDTmpl_account.key)
        let carFieldId=TmplConfigAnalysis.getFieldId(dtmplConfig,SaleOrderConstant.addDtmpl_car.key)
        let productFieldId=TmplConfigAnalysis.getFieldId(dtmplConfig,SaleOrderConstant.addDtmpl_product.key)
        let sanhuFieldId=TmplConfigAnalysis.getFieldId(dtmplConfig,SaleOrderConstant.addDtmpl_sanhu.key)
        let driverFieldId=TmplConfigAnalysis.getFieldId(dtmplConfig,SaleOrderConstant.addDtmpl_driver.key)
        let sanhu = TmplConfigAnalysis.getFieldValueOfMstrucId(dtmplConfig, fieldMap, SaleOrderConstant.addDtmpl_sanhu.key, "");
        let acount = TmplConfigAnalysis.getFieldValueOfMstrucId(dtmplConfig, fieldMap, SaleOrderConstant.addDTmpl_account.key, "");
        let acountCode = TmplConfigAnalysis.getFieldValueCodeOfMstrucId(dtmplConfig, fieldMap, SaleOrderConstant.addDTmpl_account.key, "");
        if(""==acount){
            acount = TmplConfigAnalysis.getFieldValueOfMstrucId(dtmplConfig, fieldMap, SaleOrderConstant.addDTmpl_account_s.key, "");
            acountCode = TmplConfigAnalysis.getFieldValueCodeOfMstrucId(dtmplConfig, fieldMap, SaleOrderConstant.addDTmpl_account_s.key, "");
        }

        let product = TmplConfigAnalysis.getFieldValueOfMstrucId(dtmplConfig, fieldMap, SaleOrderConstant.addDtmpl_product.key, "");
        let productCode = TmplConfigAnalysis.getFieldValueCodeOfMstrucId(dtmplConfig, fieldMap, SaleOrderConstant.addDtmpl_product.key, "");
        for (let field of dtmplConfig.groups[0].fields) {
            if (SaleOrderConstant.addDTmpl_account_s.key == field.mstrucId){
                let accountFieldId_s=TmplConfigAnalysis.getFieldId(dtmplConfig,SaleOrderConstant.addDTmpl_account_s.key)
                let receiptypeFieldId=TmplConfigAnalysis.getFieldId(dtmplConfig,SaleOrderConstant.addDtmpl_receiptype.key)
                if( "是" == sanhu){
                    field.disabled=false;
                    field.required=true;
                    formInstance.setFieldValue(receiptypeFieldId,"自提");
                }else{
                    field.required=false;
                    field.disabled=true;
                }
                if(changedValues && changedValues.hasOwnProperty(sanhuFieldId)){
                    formInstance.setFieldValue(accountFieldId_s,null);
                }
                field.shouldUpdate=true;
            }else if (SaleOrderConstant.addDTmpl_account.key == field.mstrucId){
                let accountFieldId_z=TmplConfigAnalysis.getFieldId(dtmplConfig,SaleOrderConstant.addDTmpl_account.key)
                if( "否" == sanhu){
                    field.disabled=false;
                    field.required=true;

                }else{
                    field.required=false;
                    field.disabled=true;
                }
                if(changedValues && changedValues.hasOwnProperty(sanhuFieldId)){
                    formInstance.setFieldValue(accountFieldId_z,null);
                }
                field.shouldUpdate=true;
            }else if (SaleOrderConstant.addDtmpl_car.key == field.mstrucId){

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
                if( "否" == sanhu ){
                    if(""!=acount){
                        field.baseCriteria ={"c_376771616585850882":acount}
                        field.disabled=false;
                    }else{
                        field.baseCriteria={}

                        field.disabled=true;
                    }
                    if(changedValues && changedValues.hasOwnProperty(accountFieldId)){
                        formInstance.setFieldValue(productFieldId,null);
                    }
                }else{
                    field.baseCriteria ={}
                    field.disabled=false;
                }
                field.shouldUpdate=true;

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
                    field.required=false;
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
                    field.required=false;
                }
                field.shouldUpdate=true;
            }else if(SaleOrderConstant.addDtmpl_receiptype.key == field.mstrucId){
                let receiptypeFieldId=TmplConfigAnalysis.getFieldId(dtmplConfig,SaleOrderConstant.addDtmpl_receiptype.key)
                let product=TmplDataSource.getCache(productCode);
                if(product && !formInstance.getFieldValue(receiptypeFieldId)){
                    if(product.fieldMap[SaleOrderConstant.ltmpl_product_isDelivery.sourceId]=="是"){
                        formInstance.setFieldValue(receiptypeFieldId,"配送");
                    }else{
                        formInstance.setFieldValue(receiptypeFieldId,"自提");
                    }
                }
                field.required=true;
                // if(""==productCode){
                //     field.disabled=true;
                // }
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




