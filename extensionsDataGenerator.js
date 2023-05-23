const fs = require("fs");
const path = require("path");
const os = require("os");

const ERRORS = {
  IS_EMPTY_EXTENSIONS_DATA: "IS_EMPTY_EXTENSIONS_DATA",
  IS_WRONG_NAME_FORMAT: "IS_WRONG_EXTENSION_NAME_FORMAT",
  IS_EMPTY_DEFAULT_EXTENSIONS_JSON_PATH:
    "IS_EMPTY_DEFAULT_EXTENSIONS_JSON_PATH",
};

const defaultExtensionsJsonPathByOS = () => {
  const platform = os.platform();
  const pathByPlatform = {
    win32: path.join(
      process.env.HOME ?? process.env.USERPROFILE ?? process.env.HOMEPATH,
      ".vscode",
      "extensions",
      "extensions.json"
    ),
    linux: path.join(
      process.env.HOME,
      ".vscode",
      "extensions",
      "extensions.json"
    ),
    darwin: path.join(
      process.env.HOME,
      ".vscode",
      "extensions",
      "extensions.json"
    ),
  };

  const extensionsJsonPath = pathByPlatform[platform];

  if (!extensionsJsonPath) {
    throw new Error(ERRORS.IS_EMPTY_DEFAULT_EXTENSIONS_JSON_PATH);
  }

  return extensionsJsonPath;
};

const createExportFolder = (exportPath) => {
  if (!fs.existsSync(exportPath)) fs.mkdirSync(exportPath);
};

const createExtensionsDataJson = (extensionsData, exportPath) => {
  fs.writeFileSync(
    path.join(exportPath, `${new Date()}_extensions_data.json`),
    JSON.stringify(extensionsData)
  );
};

const exportExtensionsDataJson = (extensionsData, exportPath) => {
  if (extensionsData.length < 1)
    throw new Error(ERRORS.IS_EMPTY_EXTENSIONS_DATA);

  createExportFolder(exportPath);
  createExtensionsDataJson(extensionsData, exportPath);
};

const getExtensionsMetaData = (extensionsJsonPath) => {
  const extensionsMetaDataJsonString = fs.readFileSync(
    extensionsJsonPath,
    "utf8"
  );

  return JSON.parse(extensionsMetaDataJsonString);
};

const getExtensionsData = (extensionsMetaData) => {
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
        extensionInstalledTimestamp:
          extensionMetaData.metadata.installedTimestamp,
      };
    })
    .filter((extensionData) => extensionData !== ERRORS.IS_WRONG_NAME_FORMAT);
};

const extensionsDataGenerator = ({
  origin = false,
  exportPath = undefined,
  extensionsJsonPath = undefined,
} = {}) => {
  const _exportPath = exportPath ?? path.join(__dirname, "outputs");
  const _extensionsJsonPath =
    extensionsJsonPath ?? defaultExtensionsJsonPathByOS();

  const extensionsMetaData = getExtensionsMetaData(_extensionsJsonPath);
  const extensionsData = origin
    ? extensionsMetaData
    : getExtensionsData(extensionsMetaData);

  exportExtensionsDataJson(extensionsData, _exportPath);
};

module.exports = extensionsDataGenerator;
