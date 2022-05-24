import {ArgumentsIsNotNullOrUndefined} from "package-ts-decorators-asserts";
import {Is} from "ts-checkers";
import {LocalStorageItemInterface} from "../interfaces/local-storage-item.interface";
import {buildKey} from "./build-key";


class Set {

    /**
     *
     * @param object must be LocalStorageItemInterface type
     * @param value any type
     */

    @ArgumentsIsNotNullOrUndefined()
    public static set(object: LocalStorageItemInterface, value: any): void {
        if (Is.true(object?.json ?? true)) {
            try {
                value = JSON.stringify(value);
            } catch (e) {
                value = null;
            }
        }
        const key: string = buildKey(object);
        localStorage.setItem(key, value);
    }

}

export const set: typeof Set.set = Set.set;
