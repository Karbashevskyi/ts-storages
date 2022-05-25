import { LocalStorageItemInterface } from "../interfaces/local-storage-item.interface";
declare class CheckPrevious {
    /**
     *
     * @param object must by type LocalStorageItemInterface
     * @private
     */
    static checkPrevious(object: LocalStorageItemInterface): null | any;
}
export declare const checkPrevious: typeof CheckPrevious.checkPrevious;
export {};
