const fs = require("fs");
const path = require("path");

const FOLDER_PATH = path.join(__dirname, "outputs");
const ERRORS = {
  IS_EMPTY_EXTENSIONS_DATA: "IS_EMPTY_EXTENSIONS_DATA",
  IS_WRONG_NAME_FORMAT: "IS_WRONG_EXTENSION_NAME_FORMAT",
};

const createExportFolder = () => {
  if (!fs.existsSync(FOLDER_PATH)) fs.mkdirSync(FOLDER_PATH);
};

const createExtensionsDataJson = (extensionData) => {
  if (!extensionData) throw new Error(ERRORS.IS_EMPTY_EXTENSIONS_DATA);

  fs.writeFileSync(
    path.join(FOLDER_PATH, `${new Date()}_extensions_data.json`),
    JSON.stringify(extensionData)
  );
};

const exportExtensionsDataJson = (extensionData) => {
  createExportFolder();
  createExtensionsDataJson(extensionData);
};

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
        return ERRORS.IS_WRONG_NAME_FORMAT;
      }

      return {
        extensionName: extensionFullNameSplit[1],
        extensionVersion: extensionMetaData.version,
      };
    })
    .filter((extensionData) => extensionData !== ERRORS.IS_WRONG_NAME_FORMAT);
};

try {
  const extensionsMetaData = getExtensionsMetaData();
  const extensionData = getExtensionData(extensionsMetaData);

  exportExtensionsDataJson(extensionData);
} catch (error) {
  console.error("Generate Extensions Name List Failed", error);
}
