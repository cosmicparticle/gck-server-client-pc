import {DtmplConfig, DtmplData} from "aldehyde/lib/tmpl/interface";
import {HydrocarbonService,TmplConfigAnalysis,TmplDataSource} from "aldehyde";
import {message} from "antd";
import SanhuPurchaseOrderConstant from "./sanhu-purchase-order-constant";


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

FinaneRechargeConstant.addDTmpl_account_type = {
    key: 'cf8cfacd00ffa117be32479090f108cb',
    name: '客户类型',
    type: 'field',
}

FinaneRechargeConstant.addDtmpl_bank = {
    key: '11a1bb0bcbfa0161a8f59323bfefff85',
    name: '银行账户',
    type: 'rfield',
}


FinaneRechargeConstant.addDtmpl_currency = {
    key: '1e5ae541b6a7f9da2bf23b2dc56ca372',
    name: '币种',
    type: 'field',
}

FinaneRechargeConstant.ltmpl_acount_type = {
    sourceId: '375462643698016259',
    name: '客户类型',
    type: 'field',
}

FinaneRechargeConstant.ltmpl_bank_currency = {
    sourceId: '368800730662608902',
    name: '银行币种',
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
        let bankCode= TmplConfigAnalysis.getFieldValueCodeOfMstrucId(dtmplConfig, fieldMap, FinaneRechargeConstant.addDtmpl_bank.key, undefined);
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
            }else if(FinaneRechargeConstant.addDTmpl_account_type.key == field.mstrucId){
                let acountObj=TmplDataSource.getCache(acountCode);
                let accoutTypeFieldId=TmplConfigAnalysis.getFieldId(dtmplConfig,FinaneRechargeConstant.addDTmpl_account_type.key)
                if(acountObj ){
                    formInstance.setFieldValue(accoutTypeFieldId,acountObj.fieldMap[FinaneRechargeConstant.ltmpl_acount_type.sourceId])
                }

                field.shouldUpdate=true;
            }else if(FinaneRechargeConstant.addDtmpl_currency.key == field.mstrucId){

                let bankObj=TmplDataSource.getCache(bankCode);
                let currencyFieldId=TmplConfigAnalysis.getFieldId(dtmplConfig,FinaneRechargeConstant.addDtmpl_currency.key)
                if(bankObj && bankCode != field['preBankCode']){
                    formInstance.setFieldValue(currencyFieldId,bankObj.fieldMap[FinaneRechargeConstant.ltmpl_bank_currency.sourceId])
                }
                field['preBankCode']=bankCode;
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




