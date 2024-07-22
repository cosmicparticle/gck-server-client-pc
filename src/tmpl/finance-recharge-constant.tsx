import {DtmplConfig, DtmplData} from "aldehyde/lib/tmpl/interface";
import {HydrocarbonService,TmplConfigAnalysis,TmplDataSource} from "aldehyde";
import {message} from "antd";


function FinaneRechargeConstant() {

}
export default FinaneRechargeConstant;

FinaneRechargeConstant.addDTmpl = {
    key: '367384158106591257',
    name: '充值管理添加',
    sourceId: '367384158106591257',
    type: 'dtmpl',
}


FinaneRechargeConstant.addDTmpl_account = {
    key: '5c323badd01355f62faffde57d722913',
    name: '客户名',
    type: 'rfield',
}

FinaneRechargeConstant.addDtmpl_bank = {
    key: '11a1bb0bcbfa0161a8f59323bfefff85',
    name: '银行账户',
    type: 'rfield',
}

FinaneRechargeConstant.ltmpl_acount_type = {
    sourceId: '375462643698016259',
    name: '客户类型',
    type: 'field',
}


/**
 * 充值管理添加逻辑
 * @param dtmplConfig
 * @param dtmplData
 */
FinaneRechargeConstant.completeDtmplConfig = (dtmplConfig:DtmplConfig, dtmplData:DtmplData) => {


    function  setConfig(fieldMap:object,changedValues,formInstance?)
    {
        let accountFieldId=TmplConfigAnalysis.getFieldId(dtmplConfig,FinaneRechargeConstant.addDTmpl_account.key)
        let bankFieldId=TmplConfigAnalysis.getFieldId(dtmplConfig,FinaneRechargeConstant.addDtmpl_bank.key)

        let acount = TmplConfigAnalysis.getFieldValueOfMstrucId(dtmplConfig, fieldMap, FinaneRechargeConstant.addDTmpl_account.key, "");
        let acountCode = TmplConfigAnalysis.getFieldValueCodeOfMstrucId(dtmplConfig, fieldMap, FinaneRechargeConstant.addDTmpl_account.key, "");

        for (let field of dtmplConfig.groups[0].fields) {
            if(FinaneRechargeConstant.addDtmpl_bank.key == field.mstrucId){
                let acountObj=TmplDataSource.getCache(acountCode);
                if(acountObj){
                    if(acountObj.fieldMap[FinaneRechargeConstant.ltmpl_acount_type.sourceId]=="散户"){
                        field.baseCriteria ={"c_375244178039021570":'是'}
                        //field.disabled=true;
                    }else{
                        field.baseCriteria={}
                    }
                    field.disabled=false;
                }else{
                    field.disabled=true;
                }
                if(changedValues && changedValues.hasOwnProperty(accountFieldId)){
                    formInstance.setFieldValue(bankFieldId,null);
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




