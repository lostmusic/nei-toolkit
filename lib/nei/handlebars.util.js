/*
 * Handlebars 辅助函数集
 * @author huntbao
 */
'use strict';
let Handlebars = require('handlebars');

/**
 * 不翻译被包裹的内容
 */
Handlebars.registerHelper('raw', function (options) {
    return options.fn();
});

/**
 * 首字母大写
 */
Handlebars.registerHelper('upperFirst', function (str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
});

/**
 * 首字母小写
 */
Handlebars.registerHelper('lowerFirst', function (str) {
    return str.charAt(0).toLowerCase() + str.slice(1);
});

/**
 * 获取字段的名称, 如果它是数组, 默认使用 `[]` 嵌套, 比如二维数组: String[][]
 * 或者使用 `List` 嵌套, 比如二维数组: List<List<String>>
 */
Handlebars.registerHelper('fieldTypeName', function (field, options) {
    var type;
    var arrDim;
    var useList;
    if (field.hasOwnProperty('type')) {
        // 模型中的用法: `{{fieldTypeName this useList=true}}`;
        type = field.type;
        arrDim = field.arrDim;
        if (options.hasOwnProperty('hash')) {
            useList = options.hash.useList;
        }
    } else if (field.hasOwnProperty('hash')) {
        // 接口返回参数中的用法: `{{fieldTypeName type=outputModel arrDim=outputModelArrDim useList=true}}`
        type = field.hash.type;
        arrDim = field.hash.arrDim;
        useList = field.hash.useList;
    }
    if (arrDim) {
        if (useList === true) {
            var name = [];
            var len = arrDim;
            while (len--) {
                name.push('List<');
            }
            name.push(type);
            len = arrDim;
            while (len--) {
                name.push('>');
            }
        } else {
            var name = [type];
            var len = arrDim;
            while (len--) {
                name.push('[]');
            }
        }
        return name.join('');
    } else {
        return type;
    }
});

/**
 * 格式化注释, 在每一行的前面添加 ` * `
 */
Handlebars.registerHelper('prettifyComment', function (str) {
    var lines = str.split('\n');
    return ' * ' + lines.join('\n * ');
});

/**
 * 将换行替换为逗号
 */
Handlebars.registerHelper('noLineBreak', function (str) {
    return str.replace(/\n/g, ',');
});