try {
  require("./extensionDataGenerator")();
} catch (error) {
  console.error("Generate Extensions Data Json Failed", error);
}
