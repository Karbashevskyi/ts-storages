# ts-storages

```typescript
export interface LocalStorageItemInterface {
    current?: string;
    previous?: string[];
    withApplicationName?: boolean;
    withUserId?: boolean;
    checkedPreviousVersion?: boolean;
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
    static user(): void;
    static application(): void;
    /**
     *
     * @param section must be get from defaultState
     */
    static removeSection(section: {
        [key: string]: LocalStorageItemInterface;
    }): void;
    /**
     *
     * @param object must be LocalStorageItemInterface
     */
    static remove(object: LocalStorageItemInterface): void;
    /**
     *
     * @param object must be LocalStorageItemInterface type
     * @param value any type
     */
    static set(object: LocalStorageItemInterface, value: any): void;
    /**
     *
     * @param object must be LocalStorageItemInterface type
     */
    static get(object: LocalStorageItemInterface): any;
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
    static buildKey(object: LocalStorageItemInterface, prevVersion?: string): string;
    /**
     *
     * @param object must by type LocalStorageItemInterface
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
import { LocalStorageItemInterface } from './interfaces/local-storage.interface';
export declare type StructureType = {
    [key: string]: {
        [key: string]: LocalStorageItemInterface;
    };
};
export declare const defaultState: {
    APPLICATION: {
        VERSION: {
            current: string;
            previous: never[];
            checked: boolean;
            checkedPreviousVersion: boolean;
        };
        PREV_VERSION: {
            current: string;
            previous: never[];
            checkedPreviousVersion: boolean;
        };
    };
    USER: {
        ID: {
            current: string;
            previous: never[];
            checkedPreviousVersion: boolean;
        };
    };
};
export declare class LocalStorageKey {
    #private;
    /**
     *
     * @param category must be string
     * @param key must be string
     * @param value must be LocalStorageItemInterface
     */
    static setItem(category: string, key: string, value: LocalStorageItemInterface): void;
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
