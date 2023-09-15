function schema(method, schemas) {
  async function validateSchema(ctx, next) {
    let data = null;
    if (method === "get") {
      data = await ctx.request.query;
    } else {
      data = await ctx.request.body;
    }
    const { error } = schemas.validate(data);
    if (error) {
      ctx.body = {
        code: 500,
        msg: error.message,
      };
      return;
    }
    await next();
  }

  return validateSchema;
}
module.exports = schema;
