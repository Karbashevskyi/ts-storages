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
