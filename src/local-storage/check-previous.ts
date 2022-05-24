import {ArgumentsIsNotNullOrUndefined} from "package-ts-decorators-asserts";
import {LocalStorageItemInterface} from "../interfaces/local-storage-item.interface";
import {Is} from "ts-checkers";
import {mergePrevious} from "./merge-previous";

class CheckPrevious {

    /**
     *
     * @param object must by type LocalStorageItemInterface
     * @private
     */
    @ArgumentsIsNotNullOrUndefined()
    public static checkPrevious(object: LocalStorageItemInterface): null | any {
        let result: any = null;

        if (object?.previous?.length && Is.false(object?.checkedPreviousVersion ?? false)) {

            result = mergePrevious(object);
            object['checkedPreviousVersion'] = true;

        }

        return result;
    }
}

export const checkPrevious: typeof CheckPrevious.checkPrevious = CheckPrevious.checkPrevious;
