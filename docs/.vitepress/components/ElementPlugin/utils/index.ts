/**获取基础类型  String Array Number Boolean Object Undefined等*/
export function getDataType(val: unknown): string {
  return Object.prototype.toString.call(val).slice(8, -1);
}

/**限制其只能输入数字，并不会把string转number，需要handleStrToNum方法 */
export function formatNumber(
  name: string | number,
  value: string,
  object: object,
  precision = 0
) {
  const isMinus = String(value.charAt(0) === "-");
  const numberValue = value
    .replace(/[^\d.]/g, "")
    .replace(new RegExp(`\\.{${precision},}`, "g"), ".")
    .replace(".", "$#$")
    .replace(/\./g, "")
    .replace("$#$", ".")
    .replace(new RegExp(`^(-)*(\\d+)\\.(\\d{${precision},}).*$`), "$1$2.$3")
    .replace(/^\./g, "");

  const minusMap = { true: "-", false: "" };
  const floatValue = parseFloat(minusMap[isMinus] + numberValue);

  if (isNaN(floatValue) && minusMap[isMinus]) {
    object[name] = minusMap[isMinus];
    return;
  }

  const splitArray = numberValue.split(".");
  let strNumber = minusMap[isMinus] + numberValue;
  if (splitArray.length > 1) {
    const fixedStr = precision
      ? splitArray[1].substring(0, precision)
      : splitArray[1];
    if (splitArray.length > precision) {
      strNumber = minusMap[isMinus] + splitArray[0] + "." + fixedStr;
    } else {
      fixedStr &&
        (strNumber = minusMap[isMinus] + splitArray[0] + "." + fixedStr);
    }
  } else {
    strNumber = minusMap[isMinus] + numberValue;
  }
  object[name] = strNumber;
}
/**数字类型表单 change后value转为数字类型*/
export function handleStrToNum(name: string, value: string, object: object) {
  object[name] = isNaN(parseFloat(value)) ? 0 : parseFloat(value);
}
/**
 * 格式化文件大小, 输出成带单位的字符串
 * @param {Number} size 文件大小
 * @param {Number} pointLength 精确到的小数点数
 * @param {Array} [units=[ 'B', 'K', 'M', 'G', 'TB' ]] 单位数组。从字节，到千字节，一直往上指定。
 * 如果单位数组里面只指定了到了K(千字节)，同时文件大小大于M, 此方法的输出将还是显示成多少K.
 */
export function formatSize(
  size: number,
  pointLength?: number,
  units?: string[]
) {
  let unit;
  units = units || ["B", "K", "M", "G", "TB"];
  while ((unit = units.shift()) && size > 1024) {
    size = size / 1024;
  }
  return (
    (unit === "B"
      ? size
      : size.toFixed(pointLength == undefined ? 2 : pointLength)) + unit
  );
}
/**
 * 获取（级联）选择器指定id节点标签名
 * @param {string} id 要寻找的唯一值
 * @param {object} data 列表总数据
 * @param {string} lab  选项标签
 * @param {string} val 选项值
 * @param {string} child 子项字段
 * @return {string} key所在节点标签(中文名)
 */
export function echoCascaderData(
  id: unknown,
  data: unknown[],
  lab = "label",
  val = "value",
  child = "children"
) {
  let value = "";
  function setData(data: unknown[]) {
    if (data.length > 0) {
      for (const item of data) {
        if (item[val] == id) {
          value = item[lab];
          return value;
        } else if (Array.isArray(item[child])) {
          setData(item[child]);
        }
      }
    } else {
      return value;
    }
  }
  setData(data);
  return value;
}
