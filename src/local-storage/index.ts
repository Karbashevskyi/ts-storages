import {get} from "./get";
import {LocalStorageItemInterface} from "../interfaces/local-storage-item.interface";
import {defaultState, StructureType} from "../local-storage-keys";
import {remove} from "./remove";
import {set} from "./set";

// TODO add proxy for set method, serve two cases for using: call (apply) and get (get).
// TODO add proxy for get method, serve two cases for using: call (apply) and get (get).
// TODO add proxy for remove method, serve two cases for using: call (apply) and get (get).

interface LocalStorageMethodInterface {
    item?: (object: LocalStorageItemInterface, value?: any) => any;
}

interface LocalStorageInterface {
    get?: LocalStorageMethodInterface;
    set?: any;
    remove?: any;
}


const items: typeof defaultState = new Proxy(defaultState, {
    get(target: typeof defaultState, p: string | symbol, receiver: any): any {
        return get((target as any)[p]);
    }
});

export const LocalStorage: LocalStorageInterface = {
    get: {
        item(object: LocalStorageItemInterface): any {
            return get(object);
        },
        ...items
    },
    set: {
        item(object: LocalStorageItemInterface, value: any): any {
            return set(object, value);
        },
        ...items
    },
    remove: {
        item(object: LocalStorageItemInterface): any {
            return remove(object);
        },
        ...items
    }
};

// LocalStorage.get.item(defaultState.application.name);
// LocalStorage.get.user.id;
// LocalStorage.get.application.version;
