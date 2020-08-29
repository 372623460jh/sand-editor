/**
 * image schema
 */
function createSchema(options) {
  return {
    inlines: {
      [options.type]: {
        isVoid: true,
      },
    },
  };
}

export default createSchema;
