import { LocalStorageItemInterface } from "../interfaces/local-storage-item.interface";
declare class Get {
    /**
     *
     * @param object must be LocalStorageItemInterface type
     */
    static get(object: LocalStorageItemInterface): any;
}
export declare const get: typeof Get.get;
export {};
