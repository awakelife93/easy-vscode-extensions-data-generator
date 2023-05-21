const fs = require("fs");
const path = require("path");
const os = require("os");

const ERRORS = {
  IS_EMPTY_EXTENSIONS_DATA: "IS_EMPTY_EXTENSIONS_DATA",
  IS_WRONG_NAME_FORMAT: "IS_WRONG_EXTENSION_NAME_FORMAT",
};

const defaultExtensionsJsonPathByOS = () => {
  const platform = os.platform();
  // todo: add many os...
  const pathByPlatform = {
    darwin: `${process.env.HOME}/.vscode/extensions/extensions.json`,
  };

  return (
    pathByPlatform[platform] ??
    `${process.env.HOME}/.vscode/extensions/extensions.json`
  );
};

const createExportFolder = (exportPath) => {
  if (!fs.existsSync(exportPath)) fs.mkdirSync(exportPath);
};

const createExtensionsDataJson = (extensionData, exportPath) => {
  fs.writeFileSync(
    path.join(exportPath, `${new Date()}_extensions_data.json`),
    JSON.stringify(extensionData)
  );
};

const exportExtensionsDataJson = (extensionData, exportPath) => {
  if (extensionData.length < 1)
    throw new Error(ERRORS.IS_EMPTY_EXTENSIONS_DATA);

  createExportFolder(exportPath);
  createExtensionsDataJson(extensionData, exportPath);
};

const getExtensionsMetaData = (extensionsJsonPath) => {
  const extensionsMetaDataJsonString = fs.readFileSync(
    extensionsJsonPath,
    "utf8"
  );

  return JSON.parse(extensionsMetaDataJsonString);
};

const getExtensionData = (extensionsMetaData) => {
  return extensionsMetaData
    .map((extensionMetaData) => {
      const extensionFullName = extensionMetaData.identifier.id;
      const extensionFullNameSplit = extensionFullName.split(".");
      // ex: streetsidesoftware.code-spell-checker -> ["streetsidesoftware", "code-spell-checker"]

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

const extensionDataGenerator = ({
  origin = false,
  exportPath = undefined,
  extensionsJsonPath = undefined,
} = {}) => {
  if (!exportPath) {
    const defaultExportPath = path.join(__dirname, "outputs");
    exportPath = defaultExportPath;
  }

  if (!extensionsJsonPath) {
    extensionsJsonPath = defaultExtensionsJsonPathByOS();
  }

  const extensionsMetaData = getExtensionsMetaData(extensionsJsonPath);
  const extensionData = origin
    ? extensionsMetaData
    : getExtensionData(extensionsMetaData);
  exportExtensionsDataJson(extensionData, exportPath);
};

module.exports = extensionDataGenerator;
