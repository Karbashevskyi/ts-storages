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
