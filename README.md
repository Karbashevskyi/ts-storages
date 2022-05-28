# ts-storages
![NPM Latest Version](https://img.shields.io/npm/v/ts-storages)
![Downloads Count](https://img.shields.io/npm/dm/ts-storages.svg)
![Bundle Size](https://packagephobia.now.sh/badge?p=ts-storages)
![Test Status](https://img.shields.io/travis/karbashevskyi/ts-storages/main.svg)
![Last Update Date](https://img.shields.io/github/last-commit/karbashevskyi/ts-storages)
![Project License](https://img.shields.io/github/license/karbashevskyi/ts-storages)

## Installation

```bash
$ npm install ts-storages
```

## Interface of item
```typescript
interface LocalStorageInterface {
    current?: string;
    previous?: string[]; // Write full name of key (like in localStorage: 0.0{Unicard-Impero360} or [1.0.0]1.1{Unicard-Impero360})
    checked?: boolean;
    withApplicationName?: boolean;
    withUserId?: boolean;
    dontCheckVersion?: boolean;
    encryption?: EncryptionEnum;
    json?: boolean; // default true
}
```

## Example of state
```typescript

const state = { [key: string]: { [key: string]: LocalStorageInterface } } {
    APPLICATION: {
        VERSION: {
            current: `A.0`, // A - Application
                previous: [],
                checked: false,
                dontCheckVersion: true,
        },
        PREV_VERSION: {
            current: `A.1`, // A - Application
                previous: [],
                checked: false,
                dontCheckVersion: true,
        },
    },
    USER: {
        ID: {
            current: `U.0`, // U - User
                previous: [],
                checked: false,
        },
        TOKEN: {
            current: `U.1`, // U - User
                previous: [],
                checked: false,
                encryption: EncryptionEnum.BASE64,
        },
    },
};

```

## Examples
```typescript

    LocalStorage.setApplicationName(applicationName);
    LocalStorage.applicationName;
    LocalStorage.applicationVersion;
    LocalStorage.userId;
    LocalStorage.prevVersionList;
    LocalStorage.deleteUserData();
    LocalStorage.deleteApplicationData();

    LocalStorage.get(state.USER.TOKEN);
    LocalStorage.set(state.USER.TOKEN, $veriable);
    LocalStorage.remove(state.USER.TOKEN);

```

## My Social Network Links
[Twitter Profile](https://twitter.com/Karbashevskyi)

[LinkedIn Profile](https://www.linkedin.com/in/ivan-karbashevskyi/)

[GitHub Profile](https://github.com/Karbashevskyi)

[medium.com Profile](https://medium.com/@ivankarbashevskyi)
