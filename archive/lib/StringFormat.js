const g_formatPattern =
'('                         +
    '(\\$\\{)(\\w+)\\}'     +
  '|'                       +
    '\\$([^\\{][^\\$]*)?'   +
  '|'                       +
    '[^\\$]+'               +
')';

var g_formatRegex = new RegExp(g_formatPattern, 'g');

function FormatStringHelper(formatRegex, formatStr, formatData) {
    let resultStr = '';
    let matches = null;

    while ((matches = formatRegex.exec(formatStr)) != null) {
        if (matches[2] === '${') {
            resultStr += formatData[matches[3]];
        } else {
            resultStr += matches[1];
        }
    }
    return resultStr;
}

function FormatString_Safe(formatStr, formatData) {
    let regexObj = new RegExp(g_formatPattern, 'g');

    return FormatStringHelper(regexObj, formatStr, formatData);
}
function FormatString_Unsafe(formatStr, formatData) {
    g_formatRegex.lastIndex = 0;

    return FormatStringHelper(g_formatRegex, formatStr, formatData);
}

module.exports = {
    format: FormatString_Safe,
    formatUnsafe: FormatString_Unsafe
};
