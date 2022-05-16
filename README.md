# ts-storages

```typescript
export interface LocalStorageInterface {
    current?: string;
    previous?: string[];
    checked?: boolean;
    withApplicationName?: boolean;
    withUserId?: boolean;
    dontCheckVersion?: boolean;
    json?: boolean;
}
```

```typescript
export declare class LocalStorage {
    /**
     *
     * @param name
     */
    static setApplicationName(name: string): void;
    static get applicationName(): string;
    static get applicationVersion(): string | null;
    static get userId(): string;
    static get prevVersionList(): string[];
    static deleteUserData(): void;
    static deleteApplicationData(): void;
    /**
     *
     * @param section must be get from defaultState
     */
    static deleteSection(section: {
        [key: string]: LocalStorageInterface;
    }): void;
    /**
     *
     * @param object must be LocalStorageInterface
     */
    static remove(object: LocalStorageInterface): void;
    /**
     *
     * @param object must be LocalStorageInterface type
     * @param value any type
     */
    static set(object: LocalStorageInterface, value: any): void;
    /**
     *
     * @param object must be LocalStorageInterface type
     */
    static get(object: LocalStorageInterface): any;
    /**
     *
     * @param object
     * @private
     */
    private static mergePrevious;
    /**
     *
     * @param object
     * @param prevVersion
     */
    static buildKey(object: LocalStorageInterface, prevVersion?: string): string;
    /**
     *
     * @param object must by type LocalStorageInterface
     * @private
     */
    private static checkPrevious;
}


```

```typescript
/**
 * {
 *   CURRENT: String of current name, // automate add to name as prefix a new data: [versionApp]
 *   PREVIOUS: Array with full name about prev names, e.g. with version app: `[0.0.1]1.0`; template `[versionApp]prevName`,
 *   CHECKED: Boolean, if initial value is "true" when fn will ignore check previous names.
 *   DONT_CHECK_VERSION: Boolean, who say don't check version in the name of key
 * }
 */
import { LocalStorageInterface } from './interfaces/local-storage.interface';
export declare type StructureType = {
    [key: string]: {
        [key: string]: LocalStorageInterface;
    };
};
export declare const defaultState: {
    APPLICATION: {
        VERSION: {
            current: string;
            previous: never[];
            checked: boolean;
            dontCheckVersion: boolean;
        };
        PREV_VERSION: {
            current: string;
            previous: never[];
            checked: boolean;
            dont_check_version: boolean;
        };
    };
    USER: {
        ID: {
            current: string;
            previous: never[];
            checked: boolean;
            dont_check_version: boolean;
        };
    };
};
export declare class LocalStorageKey {
    #private;
    /**
     *
     * @param category must be string
     * @param key must be string
     * @param value must be LocalStorageInterface
     */
    static setItem(category: string, key: string, value: LocalStorageInterface): void;
    /**
     *
     * @param category must be string
     * @param key must be string
     */
    static removeItem(category: string, key: string): void;
    /**
     *
     * @param state must be StructureType
     */
    static setState(state: StructureType): void;
    /**
     *
     * @param state must be StructureType
     */
    static mergeState(state: StructureType): void;
    static get state(): StructureType;
}

```
