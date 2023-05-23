# Easy vscode extensions data generator

## [Note]

- For those who are out of sync with vscode

  - This project is a project created to extract extensions information that may be installed differently for each device without synchronizing vscode settings.

- Example Output

```json
[
  {
    "extensionName": "auto-close-tag",
    "extensionVersion": "0.5.14",
    "extensionInstallTimestamp": 1683018107952
  },
  {
    "extensionName": "code-spell-checker",
    "extensionVersion": "2.20.4",
    "extensionInstallTimestamp": 1683018140623
  },
  {
    "extensionName": "material-icon-theme",
    "extensionVersion": "4.27.0",
    "extensionInstallTimestamp": 1683018160937
  },
  // ...
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

extensionsDataGenerator(options);
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
