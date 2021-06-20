/**
 * 存储localStoage
 * @param {*} name 
 * @param {*} content 
 */
 export const setStorage = (name, content) => {
    if (!name) return
    if (typeof content !== 'string') {
      content = JSON.stringify(content)
    }
    window.localStorage.setItem(name, content)
  }
  
  /**
   * 获取localStorage
   * @param {*} name 
   */
  export const getStorage = name => {
    if (!name) return
    return window.localStorage.getItem(name)
  }
  
  /**
   * 删除localStorage
   * @param {*} name 
   */
  export const removeStorage = name => {
    if (!name) return
    window.localStorage.removeItem(name)
  }