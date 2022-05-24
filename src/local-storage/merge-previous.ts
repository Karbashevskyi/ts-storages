import {ArgumentsIsNotNullOrUndefined} from "package-ts-decorators-asserts";
import {LocalStorageItemInterface} from "../interfaces/local-storage-item.interface";
import {Is} from "ts-checkers";
import {buildKey} from "./build-key";
import {set} from "./set";
import {applicationPrevVersionList} from "./application";

class MergePrevious {

    /**
     *
     * @param object
     * @private
     */
    @ArgumentsIsNotNullOrUndefined()
    public static mergePrevious(object: LocalStorageItemInterface): any {
        let result: any = null;

        if (object?.previous?.length) {
            // Check prev names
            object.previous.forEach((prev) => {
                const item = localStorage.getItem(prev);

                if (Is.notNullOrUndefinedOrEmpty(item)) {
                    result = item;
                }

                localStorage.removeItem(prev);
            });

            // Check prev version app
            const prevVersionAppList: string[] = applicationPrevVersionList ?? [];

            if (Array.isArray(prevVersionAppList)) {
                prevVersionAppList.forEach((prevVersionApp: string) => {
                    const key: string = buildKey(object, prevVersionApp);

                    const item: any = localStorage.getItem(key);

                    if (Is.notNullOrUndefinedOrEmpty(item)) {
                        result = item;
                        localStorage.removeItem(key);
                    }
                });
            }

            if (Is.notNullOrUndefinedOrEmpty(result)) {
                set(
                    {
                        current: object?.current,
                        checkedPreviousVersion: object.checkedPreviousVersion,
                    },
                    result,
                );
            }
        }

        return result;
    }

}

export const mergePrevious: typeof MergePrevious.mergePrevious = MergePrevious.mergePrevious;
