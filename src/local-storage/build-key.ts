import {ArgumentsIsNotNullOrUndefined} from "package-ts-decorators-asserts";
import {LocalStorageItemInterface} from "../interfaces/local-storage-item.interface";
import {applicationName, applicationVersion} from "./application";
import {userId} from "./user";

class BuildKey {

    /**
     *
     * @param object
     * @param prevVersion
     */
    @ArgumentsIsNotNullOrUndefined()
    public static buildKey(object: LocalStorageItemInterface, prevVersion?: string): string {
        let key: string = object?.current ?? '';

        if (object?.checkedPreviousVersion) {
            key = `[${prevVersion ?? applicationVersion}]${key}`;
        }

        if (object?.withApplicationName) {
            key += `{${applicationName}}`;
        }

        if (object?.withUserId) {
            key += `-${userId}`;
        }

        return key;
    }

}

export const buildKey: typeof BuildKey.buildKey = BuildKey.buildKey;
