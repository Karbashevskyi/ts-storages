import {LocalStorageInterface} from './interfaces/local-storage.interface';
import {Is} from 'ts-checkers';
import {Asserts} from 'ts-asserts';

export class LocalStorage {

    public static get applicationName(): string {

        // const version: string = this.get() // TODO get version from localStorage

        return '';

    }

    public static get version(): string {

        // const version: string = this.get() // TODO get version from localStorage

        return '';

    }

    public static get userId(): string {

        // const version: string = this.get() // TODO get version from localStorage

        return '';

    }

    public static get keyOfLastApplicationVersionList(): LocalStorageInterface {

        // const version: string = this.get() // TODO get version from localStorage

        //LocalStorageConst.COMMON.PREV_VERSION_APP

        return {} as any;

    }

    /**
     *
     * @param object
     */
    public static remove(
        object: LocalStorageInterface
    ): void {

        localStorage.removeItem(this.getKey(this.version, object.CURRENT, object?.DONT_CHECK_VERSION));

    }

    /**
     *
     * @param object
     * @param value
     * @param dontUseJsonEncode
     */
    public static set(
        object: LocalStorageInterface,
        value: any,
        dontUseJsonEncode: boolean = false
    ): void {

        if (dontUseJsonEncode) {

            localStorage.setItem(this.getKey(this.version, object.CURRENT, object?.DONT_CHECK_VERSION), value);

        } else {

            localStorage.setItem(this.getKey(this.version, object.CURRENT, object?.DONT_CHECK_VERSION), JSON.stringify(value));

        }

    }

    /**
     *
     * @param object
     * @param dontUseJsonDecode
     */
    public static get(
        object: LocalStorageInterface,
        dontUseJsonDecode: boolean = false
    ): any {

        Asserts.assertNotNullOrUndefined(object);

        if (object?.CHECKED === false) { // Don`t refactoring, it`s special check

            const result = this.mergePrevious(object.CURRENT, object.PREVIOUS, object.DONT_CHECK_VERSION, dontUseJsonDecode);

            object.CHECKED = true;

            if (Is.notNullOrUndefinedOrEmpty(result)) {

                return result;

            }

        }

        const value: any = localStorage.getItem(this.getKey(this.version, object.CURRENT, object?.DONT_CHECK_VERSION));

        if (dontUseJsonDecode) {

            return value;

        } else {

            try {

                return JSON.parse(value);

            } catch (e) {

                return null;

            }

        }

    }

    /**
     *
     * @param currentName
     * @param previous
     * @param dontCheckVersion
     * @param dontUseJsonDecode
     * @private
     */
    private static mergePrevious(
        currentName: string,
        previous: string[],
        dontCheckVersion: boolean = false,
        dontUseJsonDecode: boolean = false
    ): any {

        let result = null;

        if (previous?.length > 0) {

            // Check prev names
            previous.forEach((prev) => {

                const item = localStorage.getItem(prev);

                if (Is.notNullOrUndefinedOrEmpty(item)) {

                    result = item;

                }

                localStorage.removeItem(prev);

            });

            // Check prev version app
            let prevVersionAppList = this.get(this.keyOfLastApplicationVersionList);

            if (Is.notNullOrUndefinedOrEmpty(prevVersionAppList)) {

                try {

                    prevVersionAppList = JSON.parse(prevVersionAppList);

                    if (!Array.isArray(prevVersionAppList)) {

                        prevVersionAppList = [];

                    }

                } catch (e) {

                    prevVersionAppList = [];

                }

                prevVersionAppList.forEach((prevVersionApp: string) => {

                    const key = this.getKey(prevVersionApp, currentName);

                    const item = localStorage.getItem(key);

                    if (Is.notNullOrUndefinedOrEmpty(item)) {

                        result = item;
                        localStorage.removeItem(key);

                    }

                });

            }

            if (Is.notNullOrUndefinedOrEmpty(result)) {

                this.set({
                    CURRENT: currentName,
                    PREVIOUS: [],
                    CHECKED: true,
                    DONT_CHECK_VERSION: dontCheckVersion
                }, result, dontUseJsonDecode);

            }

        }

        return result;

    }

    /**
     *
     * @param prevVersionApp
     * @param currentName
     * @param withOutVersion
     */
    public static getKey(
        prevVersionApp: string,
        currentName: string,
        withOutVersion: boolean = false
    ): string {

        const key = `${currentName}{${this.applicationName}}`;

        if (withOutVersion) {

            return key;

        }

        // TODO global configuration

        return `[${prevVersionApp}]${key}-${this.userId}`;
    }

}
