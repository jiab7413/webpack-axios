export default {
    /**
     * 存储
     * @param KEY
     * @param VALUE
     * @param TIME
     */
    set(KEY,VALUE,TIME) {
       if (typeof KEY !== 'string') {
           console.log("*STORAGE ERROR* key必须是字符串");
           return;
       }
      if (TIME) {
           if (typeof TIME !== 'number') {
               console.log("*STORAGE ERROR* time必须是数字");
           } else {
               TIME = parseInt(TIME) + (new Date()).getTime();
           }
      } else {
          TIME = null;
      }
      var setValue = {
          value: JSON.stringify(VALUE),
          time: TIME
      };
        localStorage.setItem(KEY, JSON.stringify(setValue));
    },
    /**
     * 获取
     * @param KEY
     * @returns {*}
     */
    get(KEY) {
        var getValue = JSON.parse(localStorage.getItem(KEY));
        if(!getValue){
            return null
        }
        if (getValue.time && getValue.time < (new Date()).getTime()) {
            localStorage.remove(KEY);
            return null;
        } else {
            return JSON.parse(getValue.value)
        }
    },
    /**
     * 删除
     * @param KEY
     */
    remove(KEY) {
        localStorage.removeItem(KEY);
    },
    /**
     * 清空
     */
    clear() {
        localStorage.clear();
    }
}