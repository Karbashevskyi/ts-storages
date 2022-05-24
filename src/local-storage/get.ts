import {ArgumentsIsNotNullOrUndefined} from "package-ts-decorators-asserts";
import {LocalStorageItemInterface} from "../interfaces/local-storage-item.interface";
import {Is} from "ts-checkers";
import {buildKey} from "./build-key";
import {checkPrevious} from "./check-previous";

class Get {


    /**
     *
     * @param object must be LocalStorageItemInterface type
     */
    @ArgumentsIsNotNullOrUndefined()
    public static get(object: LocalStorageItemInterface): any {
        let value: any = checkPrevious(object);

        if (Is.notNullOrUndefined(value)) {
            return value;
        }

        value = localStorage.getItem(buildKey(object));

        if (Is.true(object?.json ?? true)) {
            try {
                return JSON.parse(value);
            } catch (e) {
                return null;
            }
        } else {
            return value;
        }
    }
}

export const get: typeof Get.get = Get.get;
