import { LocalStorageItemInterface } from './interfaces/local-storage-item.interface';
/**
 * {
 *   CURRENT: String of current name, // automate add to name as prefix a new data: [versionApp]
 *   PREVIOUS: Array with full name about prev names, e.g. with version app: `[0.0.1]1.0`; template `[versionApp]prevName`,
 *   CHECKED: Boolean, if initial value is "true" when fn will ignore check previous names.
 *   DONT_CHECK_VERSION: Boolean, who say don't check version in the name of key
 * }
 */
export declare type StructureType = {
    [key: string]: {
        [key: string]: LocalStorageItemInterface;
    };
};
export declare const defaultState: {
    application: {
        version: {
            current: string;
        };
        prevVersion: {
            current: string;
        };
    };
    user: {
        id: {
            current: string;
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
