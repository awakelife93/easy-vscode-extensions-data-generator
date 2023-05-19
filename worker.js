const fs = require("fs");

const getExtensionsMetaData = () => {
  const currentExtensionsPath = "";
  const defaultExtensionsPathForMac = `${process.env.HOME}/.vscode/extensions/extensions.json`;
  const extensionsMetaDataJson = fs.readFileSync(
    currentExtensionsPath || defaultExtensionsPathForMac,
    "utf8"
  );
  return JSON.parse(extensionsMetaDataJson);
};

const getExtensionData = (extensionsMetaData) => {
  return extensionsMetaData
    .map((extensionMetaData) => {
      const extensionFullName = extensionMetaData.identifier.id;
      // ex: streetsidesoftware.code-spell-checker
      const extensionFullNameSplit = extensionFullName.split(".");

      if (!extensionFullNameSplit.length || extensionFullNameSplit.length < 2) {
        return "IS_WRONG_NAME_FORMAT";
      }

      return {
        extensionName: extensionFullNameSplit[1],
        extensionVersion: extensionMetaData.version,
      };
    })
    .filter((extensionData) => extensionData !== "IS_WRONG_NAME_FORMAT");
};

try {
  const extensionsMetaData = getExtensionsMetaData();
  const extensionData = getExtensionData(extensionsMetaData);

  console.log("output ====>", extensionData);
} catch (error) {
  console.error("Generate Extensions Name List Failed", error);
}
