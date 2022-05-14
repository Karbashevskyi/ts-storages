import { LocalStorageInterface } from './interfaces/local-storage.interface';
export declare class LocalStorage {
    #private;
    /**
     *
     * @param name
     */
    static setApplicationName(name: string): void;
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
     * @param object
     * @param dontUseJsonDecode optional and type is boolean
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
     * @param dontUseJsonDecode must by type boolean
     * @private
     */
    private static checkPrevious;
}
