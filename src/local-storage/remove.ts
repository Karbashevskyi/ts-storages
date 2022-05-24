import {ArgumentsIsNotNullOrUndefined} from "package-ts-decorators-asserts";
import {LocalStorageItemInterface} from "../interfaces/local-storage-item.interface";
import {buildKey} from "./build-key";

class Remove {


    /**
     *
     * @param object must be LocalStorageItemInterface
     */
    @ArgumentsIsNotNullOrUndefined()
    public static remove(object: LocalStorageItemInterface): void {
        localStorage.removeItem(buildKey(object));
    }
}

export const remove: typeof Remove.remove = Remove.remove;
