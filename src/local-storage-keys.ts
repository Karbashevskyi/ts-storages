/**
 * {
 *   CURRENT: String of current name, // automate add to name as prefix a new data: [versionApp]
 *   PREVIOUS: Array with full name about prev names, e.g. with version app: `[0.0.1]1.0`; template `[versionApp]prevName`,
 *   CHECKED: Boolean, if initial value is "true" when fn will ignore check previous names.
 *   DONT_CHECK_VERSION: Boolean, who say don't check version in the name of key
 * }
 */
import {LocalStorageInterface} from './interfaces/local-storage.interface';

export type StructureType = {[key: string]: {[key: string]: LocalStorageInterface}};

// TODO make const with generic and the generic extend from default StructureType.
export const defaultState = {
    MAIN: {
        VERSION_APP: {
            CURRENT: `0.0`,
            PREVIOUS: [],
            CHECKED: false,
            DONT_CHECK_VERSION: true
        },
        PREV_VERSION_APP: {
            CURRENT: `0.1`,
            PREVIOUS: [],
            CHECKED: false,
            DONT_CHECK_VERSION: true
        },
        USER_ID: {
            CURRENT: `0.2`,
            PREVIOUS: [],
            CHECKED: false,
            DONT_CHECK_VERSION: true
        },
        APPLICATION_NAME: {
            CURRENT: `0.3`,
            PREVIOUS: [],
            CHECKED: false,
            WITH_APPLICATION_NAME: false,
            DONT_CHECK_VERSION: true
        }
    }
}

export class LocalStorageKey {

    static readonly #state: StructureType = defaultState

    /**
     *
     * @param category
     * @param key
     * @param value
     */
    public static set(category: string, key: string, value: LocalStorageInterface): void {
       this.#state[category][key] = value;
    }

    /**
     *
     * @param category
     * @param key
     */
    public static remove(category: string, key: string): void {
       delete this.#state[category][key];
    }

    public static get state(): StructureType {
        return this.#state;
    }

}
