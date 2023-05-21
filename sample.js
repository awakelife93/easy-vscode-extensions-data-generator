try {
  const extensionDataGenerator = require("./extensionDataGenerator");
  const options = {
    // Default is false, and this option exports the extensions metadata as it is.
    origin: false,
    // Default is outputs folder in Project root
    exportPath: undefined,
    // The default value of this option is vscode path on mac os, please put your correct path.
    extensionsJsonPath: undefined,
  };

  extensionDataGenerator(options);
} catch (error) {
  console.error("Generate Extensions Data Json Failed", error);
}
