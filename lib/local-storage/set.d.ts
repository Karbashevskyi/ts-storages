import { LocalStorageItemInterface } from "../interfaces/local-storage-item.interface";
declare class Set {
    /**
     *
     * @param object must be LocalStorageItemInterface type
     * @param value any type
     */
    static set(object: LocalStorageItemInterface, value: any): void;
}
export declare const set: typeof Set.set;
export {};
