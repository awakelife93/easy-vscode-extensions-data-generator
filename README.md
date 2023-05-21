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
  ...
];
```

### Description

### Options

```javascript
// default value
const options = {
  // Default is false, and this option exports the extensions metadata as it is.
  origin: false,
  // Default is outputs folder in Project root
  exportPath: undefined,
  // The default value of this option is default vscode path, please put your correct path.
  extensionsJsonPath: undefined,
};

extensionDataGenerator(options);
```

## Author

```
2023.05.19
Author: Hyunwoo Park
```

## Sample Check

```
1. yarn sample or npm run sample
```

#
