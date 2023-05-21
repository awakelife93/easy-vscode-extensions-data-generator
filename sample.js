try {
  const extensionsDataGenerator = require("./extensionsDataGenerator");
  const options = {
    // Default is false, and this option exports the extensions metadata as it is.
    origin: false,
    // Default is outputs folder in Project root
    exportPath: undefined,
    // The default value of this option is default vscode path, please put your correct path.
    extensionsJsonPath: undefined,
  };

  extensionsDataGenerator(options);
} catch (error) {
  console.error("Generate Extensions Data Json Failed", error);
}
