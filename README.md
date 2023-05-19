# Easy vscode extensions data generator

## [Note]

- For those who are out of sync with vscode
  - This project is a project created to extract extensions information that may be installed differently for each device without synchronizing vscode settings.

```javascript
Example Output
[
  { extensionName: "auto-close-tag", extensionVersion: "0.5.14" },
  { extensionName: "code-spell-checker", extensionVersion: "2.20.4" },
  { extensionName: "material-icon-theme", extensionVersion: "4.27.0" },
  { extensionName: "npm-intellisense", extensionVersion: "1.4.4" },
  { extensionName: "vscode-color", extensionVersion: "0.4.5" },
  { extensionName: "npm", extensionVersion: "1.3.0" },
];
```

### Description

- This module basically uses the path based on the Mac operating system as a default value. Modify the path value to match your operating system.

```javascript
const getExtensionsMetaData = () => {
  const currentExtensionsPath = ""; // Just enter your vscode extensions.json path here.
  const defaultExtensionsPathForMac = `${process.env.HOME}/.vscode/extensions/extensions.json`;
  const extensionsMetaDataJson = fs.readFileSync(
    currentExtensionsPath || defaultExtensionsPathForMac,
    "utf8"
  );
  return JSON.parse(extensionsMetaDataJson);
};
```

## Author

```
2023.05.19
Author: Hyunwoo Park
```

## Getting Started

```
1. yarn or npm start
```

#
