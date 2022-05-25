import { LocalStorageItemInterface } from "../interfaces/local-storage-item.interface";
declare class Remove {
    /**
     *
     * @param object must be LocalStorageItemInterface
     */
    static remove(object: LocalStorageItemInterface): void;
}
export declare const remove: typeof Remove.remove;
export {};
