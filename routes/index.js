const router = require("koa-router")();
const Joi = require("joi");
const validate = require("../middlewares/validators");

router.get("/", async (ctx, next) => {
  //  throw new Error();
  await ctx.render("index", {
    title: "Hello Koa 2!",
  });
});
const loginSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string(), //.pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
  captcha: Joi.string(),
});
router.get("/string", validate("post", loginSchema), async (ctx, next) => {
  ctx.body = "koa2 string";
});

router.get("/json", async (ctx, next) => {
  ctx.verifyParams({
    username: { type: "string", required: true },
    password: { type: "string", required: true },
  });
  ctx.body = {
    title: "koa2 json",
  };
});

module.exports = router;
