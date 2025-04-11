import {DtmplConfig, DtmplData} from "aldehyde/lib/tmpl/interface";
import {TmplConfigAnalysis, TmplDataSource} from "aldehyde";
import FinaneRechargeConstant from "./finance-recharge-constant";


function BundleRechargeConstant() {

}

export default BundleRechargeConstant;

BundleRechargeConstant.addDTmpl = {
    key: '427982105088925705',
    name: '组合充值添加',
    sourceId: '427982105088925705',
    type: 'dtmpl',
}

BundleRechargeConstant.addDTmpl_customer = {
    key: '008734876182571b3bf6aec07923788b',
    name: '客户名称',
    type: 'rfield',
}

BundleRechargeConstant.addDTmpl_product = {
    key: '9f06525e7711793ad2a2ea8c0be69073',
    name: '产品',
    type: 'field',
}

BundleRechargeConstant.completeDtmplConfig = (dtmplConfig: DtmplConfig, dtmplData: DtmplData) => {

    function setConfig(fieldMap: object, changedValues, formInstance?) {
        console.log(1)
        let customer = TmplConfigAnalysis.getFieldValueOfMstrucId(dtmplConfig, fieldMap, BundleRechargeConstant.addDTmpl_customer.key, "");
        let customertCode = TmplConfigAnalysis.getFieldValueCodeOfMstrucId(dtmplConfig, fieldMap, BundleRechargeConstant.addDTmpl_customer.key, "");

        for (let field of dtmplConfig.groups[0].fields) {
            if (BundleRechargeConstant.addDTmpl_product.key == field.mstrucId) {
                if (customer) {
                    let accountObj = TmplDataSource.getCache(customertCode);
                    if (accountObj) {
                        field.baseCriteria = {"c_376771616585850882": customer}
                    } else {
                        field.baseCriteria = {"c_376771616585850882": "000"}
                    }
                }
                field.shouldUpdate = true;
            }
        }
    }

    setConfig(dtmplData ? dtmplData.fieldMap : null, null);
    dtmplConfig.onValuesChange = (changedValues, allValues, formInstance) => {
        setConfig(allValues.fieldMap, changedValues, formInstance);
    }
    return dtmplConfig;
}




