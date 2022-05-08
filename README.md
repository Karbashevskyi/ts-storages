# ts-storages

```typescript
export declare class LocalStorage {
    static get applicationName(): string;
    static get version(): string;
    static get userId(): string;
    static get prevVersionList(): string[];
    /**
     *
     * @param object must be LocalStorageInterface
     */
    static remove(object: LocalStorageInterface): void;
    /**
     *
     * @param object must be LocalStorageInterface type
     * @param value any type
     * @param dontUseJsonEncode optional argument and type is boolean
     */
    static set(object: LocalStorageInterface, value: any, dontUseJsonEncode?: boolean): void;
    /**
     *
     * @param object must be LocalStorageInterface type
     * @param dontUseJsonDecode optional and type is boolean
     */
    static get(object: LocalStorageInterface, dontUseJsonDecode?: boolean): any;
    /**
     *
     * @param currentName must be string type
     * @param previous must be array of string type
     * @param withApplicationName optional and type is boolean
     * @param withUserId optional and type is boolean
     * @param dontCheckVersion optional and type is boolean
     * @param dontUseJsonDecode optional and type is boolean
     * @private
     */
    private static mergePrevious;
    /**
     *
     * @param version must be string
     * @param currentName must be string
     * @param withoutUserId optional and type is boolean
     * @param withApplicationName optional and type is boolean
     */
    static buildKey({ version, currentName, withUserId, withApplicationName, }: {
        currentName: string;
        version?: string;
        withUserId?: boolean;
        withApplicationName?: boolean;
    }): string;
    /**
     *
     * @param object must by type LocalStorageInterface
     * @param dontUseJsonDecode must by type boolean
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
        NAME: {
            CURRENT: string;
            PREVIOUS: never[];
            CHECKED: boolean;
            WITH_APPLICATION_NAME: boolean;
            DONT_CHECK_VERSION: boolean;
        };
        VERSION: {
            CURRENT: string;
            PREVIOUS: never[];
            CHECKED: boolean;
            DONT_CHECK_VERSION: boolean;
        };
        PREV_VERSION: {
            CURRENT: string;
            PREVIOUS: never[];
            CHECKED: boolean;
            DONT_CHECK_VERSION: boolean;
        };
    };
    USER: {
        ID: {
            CURRENT: string;
            PREVIOUS: never[];
            CHECKED: boolean;
            DONT_CHECK_VERSION: boolean;
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
    static set(category: string, key: string, value: LocalStorageInterface): void;
    /**
     *
     * @param category must be string
     * @param key must be string
     */
    static remove(category: string, key: string): void;
    /**
     *
     * @param state
     */
    static merge(state: StructureType): void;
    static get state(): StructureType;
}

```
