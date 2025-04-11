import {DtmplConfig, DtmplData} from "aldehyde/lib/tmpl/interface";
import {TmplConfigAnalysis, TmplDataSource} from "aldehyde";


function BundleRechargeDetailConstant() {

}

export default BundleRechargeDetailConstant;

BundleRechargeDetailConstant.addDTmpl = {
    key: '427989241177088012',
    name: '组合充值明细添加',
    sourceId: '427989241177088012',
    type: 'dtmpl',
}

BundleRechargeDetailConstant.addDTmpl_bank = {
    key: 'aee0ea67d5cbc8e286b2c48a9f6da86e',
    name: '银行账户',
    type: 'rfield',
}

BundleRechargeDetailConstant.addDTmpl_currency = {
    key: '850cf21c595fccaaf2e121a05ed70885',
    name: '币种',
    type: 'field',
}

BundleRechargeDetailConstant.ltmpl_bank_currency = {
    sourceId: '368800730662608902',
    name: '银行币种',
    type: 'field',
}

BundleRechargeDetailConstant.completeDtmplConfig = (dtmplConfig: DtmplConfig, dtmplData: DtmplData) => {

    function setConfig(fieldMap: object, changedValues, formInstance?) {
        let bankCode = TmplConfigAnalysis.getFieldValueCodeOfMstrucId(dtmplConfig, fieldMap, BundleRechargeDetailConstant.addDTmpl_bank.key, "");
        for (let field of dtmplConfig.groups[0].fields) {
            if (BundleRechargeDetailConstant.addDTmpl_currency.key === field.mstrucId) {
                field.disabled = true;
                let bankObj = TmplDataSource.getCache(bankCode);
                let currencyFieldId = TmplConfigAnalysis.getFieldId(dtmplConfig, BundleRechargeDetailConstant.addDTmpl_currency.key)
                if (bankObj) {
                    formInstance.setFieldValue(currencyFieldId, bankObj.fieldMap[BundleRechargeDetailConstant.ltmpl_bank_currency.sourceId])
                } else {
                    formInstance?.setFieldValue(currencyFieldId, null)
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




