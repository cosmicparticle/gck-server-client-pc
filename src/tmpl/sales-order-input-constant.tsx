import {DtmplConfig, DtmplData} from "aldehyde/lib/tmpl/interface";
import {TmplConfigAnalysis, TmplDataSource} from "aldehyde";


function SaleOrderInputConstant() {

}

export default SaleOrderInputConstant;

SaleOrderInputConstant.addDTmpl = {
    key: '369676998480273450',
    name: '销售订单手工补录添加页面',
    sourceId: '369676998480273450',
    type: 'dtmpl',
}

SaleOrderInputConstant.addDtmpl_is_retail = {
    key: 'e4f63eef5e6a1b5e9769e84596952003',
    sourceId: '369676998480273459',
    name: '是否散户下单',
    type: 'rfield',
}

SaleOrderInputConstant.addDtmpl_customer = {
    key: 'd36df1a16fa982461d4a482dbd14ec74',
    sourceId: '380848648651317251',
    name: '客户',
    type: 'rfield',
}

SaleOrderInputConstant.addDtmpl_retail = {
    key: 'afd699a264a9878ca96683dd93a6ada9',
    sourceId: '380848659388735491',
    name: '散户',
    type: 'rfield',
}

SaleOrderInputConstant.addDtmpl_product = {
    key: '082064389d56e06c31680092cb2a0128',
    sourceId: '369676998480273439',
    name: '产品名',
    type: 'rfield',
}

SaleOrderInputConstant.addDtmpl_weight = {
    key: '78505fa91e0beb4dee93ff0cf487234a',
    sourceId: '369676998480273446',
    name: '重量',
    type: 'field',
}

SaleOrderInputConstant.addDtmpl_packages = {
    key: '24304a08a6e4b885b8cac3758ae32d4c',
    sourceId: '369676998480273458',
    name: '包数',
    type: 'field',
}

SaleOrderInputConstant.addDtmpl_car = {
    key: '9368f98bfdcbd821f821a0bc61532897',
    sourceId: '369676998480273445',
    name: '车牌号',
    type: 'field',
}

SaleOrderInputConstant.ltmpl_product_type = {
    sourceId: "374554011154292739",
    name: '产品类型',
    type: 'field',
}

SaleOrderInputConstant.addDtmpl_first_weighing = {
    key: "cb56cc4c18786687445db0ddda681a1f",
    sourceId: "369892833471799299",
    name: '一磅重量',
    type: 'field',
}

SaleOrderInputConstant.addDtmpl_second_weighing = {
    key: "dde50595c7f71c9757bf1b5649c8582d",
    sourceId: "369893022450360331",
    name: '二磅重量',
    type: 'field',
}


/**
 * 销售订单添加
 * @param dtmplConfig
 * @param dtmplData
 */
SaleOrderInputConstant.completeDtmplConfig = (dtmplConfig: DtmplConfig, dtmplData: DtmplData) => {

    function setConfig(fieldMap: object, changedValues, formInstance?) {
        let isRetail = fieldMap[SaleOrderInputConstant.addDtmpl_is_retail.sourceId];
        let customerCode = fieldMap[SaleOrderInputConstant.addDtmpl_customer.sourceId];
        let retailCode = fieldMap[SaleOrderInputConstant.addDtmpl_retail.sourceId];
        let productId = TmplConfigAnalysis.getFieldValueCodeOfMstrucId(dtmplConfig, fieldMap, SaleOrderInputConstant.addDtmpl_product.key, "");
        let productType;
        if (productId) {
            let product = TmplDataSource.getCache(productId);
            productType = product ? product.fieldMap[SaleOrderInputConstant.ltmpl_product_type.sourceId] : undefined;
        }
        let secondWeighingFieldId = TmplConfigAnalysis.getFieldId(dtmplConfig, SaleOrderInputConstant.addDtmpl_second_weighing.key)
        let packagesFieldId = TmplConfigAnalysis.getFieldId(dtmplConfig, SaleOrderInputConstant.addDtmpl_packages.key)
        let weightFieldId = TmplConfigAnalysis.getFieldId(dtmplConfig, SaleOrderInputConstant.addDtmpl_weight.key)
        // 袋数
        let bags = undefined;
        // 一磅重量
        let firstWeighingWeight = undefined;
        for (let field of dtmplConfig.groups[0].fields) {
            if (SaleOrderInputConstant.addDtmpl_customer.key === field.mstrucId) {
                let customerFieldId = TmplConfigAnalysis.getFieldId(dtmplConfig, SaleOrderInputConstant.addDtmpl_customer.key)
                field.disabled = isRetail == null || isRetail === "是";
                field.required = !field.disabled;
                if (field.disabled && changedValues) {
                    // 将选择的内容清空
                    formInstance.setFieldValue(customerFieldId, null);
                }
                field.shouldUpdate = true;
            }
            if (SaleOrderInputConstant.addDtmpl_retail.key === field.mstrucId) {
                let retailFieldId = TmplConfigAnalysis.getFieldId(dtmplConfig, SaleOrderInputConstant.addDtmpl_retail.key)
                field.disabled = isRetail == null || isRetail === "否";
                field.required = !field.disabled;
                if (field.disabled && changedValues) {
                    // 将选择的内容清空
                    formInstance.setFieldValue(retailFieldId, null);
                }
                field.shouldUpdate = true;
            }
            if (SaleOrderInputConstant.addDtmpl_weight.key === field.mstrucId) {
                field.disabled = productId == null || productType !== "散装";
                if (field.disabled && formInstance) {
                    formInstance.setFieldValue(weightFieldId, null);
                }
                field.shouldUpdate = true;
            }
            if (SaleOrderInputConstant.addDtmpl_packages.key === field.mstrucId) {
                bags = fieldMap[SaleOrderInputConstant.addDtmpl_packages.sourceId];
                field.disabled = productId == null || productType !== "袋装";
                if (field.disabled && formInstance) {
                    formInstance.setFieldValue(packagesFieldId, null);
                }
                field.shouldUpdate = true;
            }
            if (SaleOrderInputConstant.addDtmpl_car.key === field.mstrucId) {
                let carFieldId = TmplConfigAnalysis.getFieldId(dtmplConfig, SaleOrderInputConstant.addDtmpl_car.key)
                if (customerCode || retailCode) {
                    // 选择了客户，且客户配置了所在区域，重新获取收货点信息
                    field.baseCriteria = {'c_374288489833603074': isRetail === "是" ? retailCode : customerCode}
                } else {
                    // 有选择客户，但是客户没有设置区域，或者没选择客户，收货点信息清空
                    field.baseCriteria = {'c_374288489833603074': '000'}
                    if (changedValues && changedValues.hasOwnProperty(carFieldId)) {
                        // 将选择的内容清空
                        formInstance.setFieldValue(carFieldId, null);
                    }
                }
                field.shouldUpdate = true;
            }
        }
        for (let field of dtmplConfig.groups[1].fields) {
            if (SaleOrderInputConstant.addDtmpl_first_weighing.key == field.mstrucId) {
                firstWeighingWeight = fieldMap[SaleOrderInputConstant.addDtmpl_first_weighing.sourceId];
            }
        }
        for (let field of dtmplConfig.groups[2].fields) {
            if (SaleOrderInputConstant.addDtmpl_second_weighing.key == field.mstrucId) {
                if (bags && bags > 0 && firstWeighingWeight && firstWeighingWeight > 0) {
                    let secondWeighingWeight = bags * 0.05 + firstWeighingWeight;
                    // 将选择的内容清空
                    formInstance.setFieldValue(secondWeighingFieldId, secondWeighingWeight);
                    field.shouldUpdate = true;
                }
            }
        }

    }

    setConfig(dtmplData ? dtmplData.fieldMap : null, null);
    dtmplConfig.onValuesChange = (changedValues, allValues, formInstance) => {
        setConfig(allValues.fieldMap, changedValues, formInstance);
    }
    return dtmplConfig;
}



