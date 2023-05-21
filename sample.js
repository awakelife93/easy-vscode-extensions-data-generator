try {
  const extensionDataGenerator = require("./extensionDataGenerator");
  extensionDataGenerator({
    origin: false, // Default is false, and this option exports the extensions metadata as it is.
    exportPath: undefined, // Default is outputs folder in Project root
    extensionsJsonPath: undefined, // The default value of this option is vscode path on mac os, please put your correct path.
  });
} catch (error) {
  console.error("Generate Extensions Data Json Failed", error);
}
