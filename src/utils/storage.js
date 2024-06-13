/**
 * 存储数据
 */
export const setItem = (key, value) => {
  /**
   * value 分为两种情况
   * 1. 基本数据类型
   * 2. 复杂数据类型
   */
  // 将复杂数据类型的数据转换位 JSON 字符串进行存储
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}

/**
 * 获取数据
 */
export const getItem = (key) => {
  const data = window.localStorage.getItem(key)
  try {
    return JSON.parse(data)
  } catch (error) {
    return data
  }
}

/**
 * 删除数据
 */
export const removeItem = (key) => {
  window.localStorage.removeItem(key)
}
/**
 * 删除所有数据
 */
export const removeAllItem = (key) => {
  window.localStorage.clear()
}
