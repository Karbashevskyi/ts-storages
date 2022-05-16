import { LocalStorageInterface } from './interfaces/local-storage.interface';
export declare class LocalStorage {
    #private;
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
