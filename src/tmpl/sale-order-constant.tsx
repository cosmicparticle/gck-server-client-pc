import {DtmplConfig, DtmplData} from "aldehyde/lib/tmpl/interface";
import {HydrocarbonService,TmplConfigAnalysis} from "aldehyde";
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

SaleOrderConstant.addDTmpl_account = {
    key: 'cf24e46b5fc414312a7934d3fe2eecdf',
    name: '账户名',
    sourceId: '371724695005601809',
    type: 'rfield',
}

SaleOrderConstant.addDtmpl_car = {
    key: '9368f98bfdcbd821f821a0bc61532897',
    name: '车牌号',
    sourceId: '371724695005601810',
    type: 'rfield',
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
        let acountCode = TmplConfigAnalysis.getFieldValueOfMstrucId(dtmplConfig, fieldMap, SaleOrderConstant.addDTmpl_account.key, "");
        for (let field of dtmplConfig.groups[0].fields) {
            if (SaleOrderConstant.addDtmpl_car.key == field.mstrucId){
                debugger
                if(""!=acountCode){
                    field.baseCriteria ={"c_374288489833603074":acountCode}
                    field.disabled=false;
                }else{
                    field.disabled=true;
                }
                field.shouldUpdate=true;
                if(changedValues && changedValues.hasOwnProperty(accountFieldId)){
                    formInstance.setFieldValue(carFieldId,null);
                }
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



