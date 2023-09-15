/**
 *  @description 使用 svg-captcha 生成 图形校验码
 * @author mosaic
 */

// const svgCaptcha = require("svg-captcha");
/**
 *
 * @description 生成 图形验证码
 * @return {*}
 */
const getCaptcha = () => {
  const svgCaptcha = require("svg-captcha");
  //  若创建算数式验证码，将create改为createMathExpr
  const newCaptcha = svgCaptcha.create({
    size: 4, // 验证码长度
    fontSize: 40, // 验证码文字尺寸
    noise: 5, // 干扰线条数量 0-5
    width: 120, // 生成svg的宽度
    height: 28, // 生成svg的高度
    color: true, // 验证码字符颜色
    inverse: false, // 翻转颜色
    background: "#fff", // 验证码图片背景颜色
  });

  //	注意 svg-captcha 生成校验码svg后，有两个返回参数，一个data（svg代码），一个text（验证码文字）
  return {
    data: newCaptcha.data,
    text: newCaptcha.text,
  };
};

module.exports = {
  getCaptcha,
};
