import {DtmplConfig, DtmplData} from "aldehyde/lib/tmpl/interface";
import {HydrocarbonService,TmplConfigAnalysis,TmplDataSource} from "aldehyde";


function DrawBillConstant() {

}
export default DrawBillConstant;

DrawBillConstant.addDTmpl = {
    name: '开票管理添加',
    sourceId: '374940442246815747',
    type: 'dtmpl',
}


DrawBillConstant.addDTmpl_account = {
    key: 'cd89790b4af3404987221c6314dc6092',
    name: '客户名称',
    type: 'rfield',
}

// DrawBillConstant.addDTmpl_account_type = {
//     key: '',
//     name: '客户类型',
//     type: 'field',
// }

DrawBillConstant.ltmpl_acount_type = {
    sourceId: '380839358637056003',
    name: '客户类型',
    type: 'field',
}

DrawBillConstant.addDtmpl_group_order = {
    sourceId: '374941196013576195',
    name: '关系组-充值单价',
    type: 'group',
}



/**
 * 充值管理添加逻辑
 * @param dtmplConfig
 * @param dtmplData
 */
DrawBillConstant.completeDtmplConfig = (dtmplConfig:DtmplConfig, dtmplData:DtmplData) => {

    function  setConfig(fieldMap:object,changedValues,formInstance?)
    {
        let accountFieldId=TmplConfigAnalysis.getFieldId(dtmplConfig,DrawBillConstant.addDTmpl_account.key)
        let acount = TmplConfigAnalysis.getFieldValueOfMstrucId(dtmplConfig, fieldMap, DrawBillConstant.addDTmpl_account.key, "");
        let acountName = TmplConfigAnalysis.getFieldValueTitleOfMstrucId(dtmplConfig, fieldMap, DrawBillConstant.addDTmpl_account.key, "");
        let acountCode = TmplConfigAnalysis.getFieldValueCodeOfMstrucId(dtmplConfig, fieldMap, DrawBillConstant.addDTmpl_account.key, "");

        // for (let field of dtmplConfig.groups[0].fields) {
        //
        // }
        if(""!=acount){
            if(dtmplConfig.groups[1]){
                dtmplConfig.groups[1].defaultCriteriaValue={}


                let acountObj=TmplDataSource.getCache(acountCode);
                if(acountObj && acountObj.fieldMap[DrawBillConstant.ltmpl_acount_type.sourceId]=="散户"){
                    dtmplConfig.groups[1].defaultCriteriaValue['c_374198542481006594']="是";
                    dtmplConfig.groups[1].defaultCriteriaValue['c_380881146521362434']=null;
                    dtmplConfig.groups[1].defaultCriteriaValue['c_380881223830773762']=acountName;
                }else{
                    dtmplConfig.groups[1].defaultCriteriaValue['c_374198542481006594']="否";
                    dtmplConfig.groups[1].defaultCriteriaValue['c_380881146521362434']=acountName;
                    dtmplConfig.groups[1].defaultCriteriaValue['c_380881223830773762']=null;
                }
            }
        }
        for (let field of dtmplConfig.groups[0].fields) {
            if (DrawBillConstant.addDTmpl_account.key == field.mstrucId) {
                console.log("$virtual count",fieldMap["$virtual" + DrawBillConstant.addDtmpl_group_order.sourceId]);
                if (!fieldMap["$virtual" + DrawBillConstant.addDtmpl_group_order.sourceId] ||  fieldMap["$virtual" + DrawBillConstant.addDtmpl_group_order.sourceId] <= 0) {
                    field.disabled = false;
                } else {
                    field.disabled = true;
                }
                field.shouldUpdate = true;
            }
        }
    }
    setConfig(dtmplData?dtmplData.fieldMap:null,null);
    dtmplConfig.onValuesChange=(changedValues,allValues,formInstance)=>{
        setConfig(allValues.fieldMap,changedValues,formInstance);
    }
    return dtmplConfig;
}