export default {
    install(Vue) {
      Vue.mixin({
        methods: {
          timeFormatter(row, column, cellValue, index, pattern) {
            if (!cellValue) {
              return '';
            }
            const format = pattern || 'y-m-d h:i:s'
            let date
            if (typeof cellValue === 'object') {
              date = cellValue
            } else {
              // 下面2个 if 考虑到了cellValue可能不是数字类型时间戳以及可能不是毫秒级时间戳
              if ((typeof cellValue === 'string') && (/^[0-9]+$/.test(cellValue))) {
                cellValue = parseInt(cellValue)
              }
              if ((typeof cellValue === 'number') && (cellValue.toString().length === 10)) {
                cellValue = cellValue * 1000
              }
              date = new Date(cellValue)
            }
            const formatObj = {
              y: date.getFullYear(),
              m: date.getMonth() + 1,
              d: date.getDate(),
              h: date.getHours(),
              i: date.getMinutes(),
              s: date.getSeconds(),
              a: date.getDay()
            }
            const time_str = format.replace(/(y|m|d|h|i|s|a)+/g, (result, key) => {
              let value = formatObj[key]
              if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
              if (result.length > 0 && value < 10) {
                value = '0' + value
              }
              return value || 0
            })
            return time_str
          },
        }
      })
    }
  }