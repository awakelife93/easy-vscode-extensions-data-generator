const fs = require("fs");
const path = require("path");

const EXPORT_FOLDER_PATH = path.join(__dirname, "outputs");
const ERRORS = {
  IS_EMPTY_EXTENSIONS_DATA: "IS_EMPTY_EXTENSIONS_DATA",
  IS_WRONG_NAME_FORMAT: "IS_WRONG_EXTENSION_NAME_FORMAT",
};

const createExportFolder = () => {
  if (!fs.existsSync(EXPORT_FOLDER_PATH)) fs.mkdirSync(EXPORT_FOLDER_PATH);
};

const createExtensionsDataJson = (extensionData) => {
  fs.writeFileSync(
    path.join(EXPORT_FOLDER_PATH, `${new Date()}_extensions_data.json`),
    JSON.stringify(extensionData)
  );
};

const exportExtensionsDataJson = (extensionData) => {
  if (extensionData.length < 1)
    throw new Error(ERRORS.IS_EMPTY_EXTENSIONS_DATA);

  createExportFolder();
  createExtensionsDataJson(extensionData);
};

const getExtensionsMetaData = () => {
  const currentExtensionsPath = "";
  const defaultExtensionsPathForMac = `${process.env.HOME}/.vscode/extensions/extensions.json`;
  const extensionsMetaDataJsonString = fs.readFileSync(
    currentExtensionsPath || defaultExtensionsPathForMac,
    "utf8"
  );

  return JSON.parse(extensionsMetaDataJsonString);
};

const getExtensionData = (extensionsMetaData) => {
  return extensionsMetaData
    .map((extensionMetaData) => {
      const extensionFullName = extensionMetaData.identifier.id;
      const extensionFullNameSplit = extensionFullName.split("."); // ex: streetsidesoftware.code-spell-checker -> ["streetsidesoftware", "code-spell-checker"]

      if (extensionFullNameSplit.length < 2) {
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
  console.error("Generate Extensions Data Json Failed", error);
}
