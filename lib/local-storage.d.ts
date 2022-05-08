import { LocalStorageInterface } from './interfaces/local-storage.interface';
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
