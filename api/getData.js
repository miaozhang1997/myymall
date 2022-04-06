import { SUCC_CODE, TIMEOUT } from "./config";
import { getJSON } from "./ajax";

// 将getJSON封装至函数getData
// 以获取url和options

const getData = (url, options) => {
  return getJSON(url, {
    // 超时时间
    timeoutTime: TIMEOUT,
    ...options,
  })
    .then((response) => {
      // 若状态为成功
      if (response.code !== SUCC_CODE)
        throw new Error(`出错了：$(response.code)`);
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export { getData };
