import { LocalStorageItemInterface } from "../interfaces/local-storage-item.interface";
declare class BuildKey {
    /**
     *
     * @param object
     * @param prevVersion
     */
    static buildKey(object: LocalStorageItemInterface, prevVersion?: string): string;
}
export declare const buildKey: typeof BuildKey.buildKey;
export {};
