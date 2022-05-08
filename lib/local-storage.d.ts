import { LocalStorageInterface } from './interfaces/local-storage.interface';
export declare class LocalStorage {
    static get applicationName(): string;
    static get version(): string;
    static get userId(): string;
    static get prevVersionList(): string[];
    /**
     *
     * @param object
     */
    static remove(object: LocalStorageInterface): void;
    /**
     *
     * @param object
     * @param value
     * @param dontUseJsonEncode
     */
    static set(object: LocalStorageInterface, value: any, dontUseJsonEncode?: boolean): void;
    /**
     *
     * @param object
     * @param dontUseJsonDecode
     */
    static get(object: LocalStorageInterface, dontUseJsonDecode?: boolean): any;
    /**
     *
     * @param currentName
     * @param previous
     * @param withApplicationName
     * @param withUserId
     * @param dontCheckVersion
     * @param dontUseJsonDecode
     * @private
     */
    private static mergePrevious;
    /**
     *
     * @param version
     * @param currentName
     * @param withoutUserId
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
