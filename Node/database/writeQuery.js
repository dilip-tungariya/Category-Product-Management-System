const writequery = (objparameters) => {
    let query = '';
    let finalQuery = '';
    for (const [key, value] of Object.entries(objparameters)) {
        if (getType(value) == 'string') {
            query += "@" + key + "=" + "N'" + value.replace(/'/g, "''") + "',";
        } else {
            query += "@" + key + "=" + value + ",";
        }

    }
    finalQuery = query.substring(0, query.length - 1);
    return finalQuery;
}

const getType = (function () {
    let objToString = ({}).toString,
        typeMap = {},
        types = [
            "Boolean",
            "Number",
            "String",
            "Function",
            "Array",
            "Date",
            "RegExp",
            "Object",
            "Error"
        ];

    for (let i = 0; i < types.length; i++) {
        typeMap["[object " + types[i] + "]"] = types[i].toLowerCase();
    };

    return function (obj) {
        if (obj == null) {
            return String(obj);
        }
        return typeof obj === "object" || typeof obj === "function" ?
            typeMap[objToString.call(obj)] || "object" :
            typeof obj;
    }
}());

module.exports = writequery;