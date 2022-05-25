import { LocalStorageItemInterface } from "../interfaces/local-storage-item.interface";
interface LocalStorageMethodInterface {
    item?: (object: LocalStorageItemInterface, value?: any) => any;
}
interface LocalStorageInterface {
    get?: LocalStorageMethodInterface;
    set?: any;
    remove?: any;
}
export declare const LocalStorage: LocalStorageInterface;
export {};
