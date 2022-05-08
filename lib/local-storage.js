"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalStorage = void 0;
const ts_checkers_1 = require("ts-checkers");
const local_storage_keys_1 = require("./local-storage-keys");
const package_ts_decorators_asserts_1 = require("package-ts-decorators-asserts");
class LocalStorage {
    // TODO add global configuration of user id and application name and other!
    static get applicationName() {
        return this.get(local_storage_keys_1.defaultState.MAIN.APPLICATION_NAME);
    }
    static get version() {
        return this.get(local_storage_keys_1.defaultState.MAIN.VERSION_APP);
    }
    static get userId() {
        return this.get(local_storage_keys_1.defaultState.MAIN.USER_ID);
    }
    static get prevVersionList() {
        return this.get(local_storage_keys_1.defaultState.MAIN.PREV_VERSION_APP);
    }
    /**
     *
     * @param object
     */
    static remove(object) {
        var _a;
        localStorage.removeItem(this.buildKey(Object.assign({ currentName: object.CURRENT, withUserId: (_a = object === null || object === void 0 ? void 0 : object.WITH_USER_ID) !== null && _a !== void 0 ? _a : false }, ((object === null || object === void 0 ? void 0 : object.DONT_CHECK_VERSION) ? {} : {
            version: this.version,
        }))));
    }
    /**
     *
     * @param object
     * @param value
     * @param dontUseJsonEncode
     */
    static set(object, value, dontUseJsonEncode = false) {
        var _a, _b;
        if (!dontUseJsonEncode) {
            value = JSON.stringify(value);
        }
        localStorage.setItem(this.buildKey(Object.assign({ currentName: object.CURRENT, withUserId: (_a = object === null || object === void 0 ? void 0 : object.WITH_USER_ID) !== null && _a !== void 0 ? _a : false, withApplicationName: (_b = object === null || object === void 0 ? void 0 : object.WITH_APPLICATION_NAME) !== null && _b !== void 0 ? _b : false }, ((object === null || object === void 0 ? void 0 : object.DONT_CHECK_VERSION) ? {} : {
            version: this.version,
        }))), value);
    }
    /**
     *
     * @param object
     * @param dontUseJsonDecode
     */
    static get(object, dontUseJsonDecode = false) {
        var _a, _b;
        // let value: any;
        let value = this.checkPrevious(object, dontUseJsonDecode);
        if (ts_checkers_1.Is.notNullOrUndefined(value)) {
            return value;
        }
        value = localStorage.getItem(this.buildKey(Object.assign({ currentName: object.CURRENT, withUserId: (_a = object === null || object === void 0 ? void 0 : object.WITH_USER_ID) !== null && _a !== void 0 ? _a : false, withApplicationName: (_b = object === null || object === void 0 ? void 0 : object.WITH_APPLICATION_NAME) !== null && _b !== void 0 ? _b : true }, ((object === null || object === void 0 ? void 0 : object.DONT_CHECK_VERSION) ? {} : {
            version: this.version,
        }))));
        if (dontUseJsonDecode) {
            return value;
        }
        else {
            try {
                return JSON.parse(value);
            }
            catch (e) {
                return null;
            }
        }
    }
    /**
     *
     * @param currentName
     * @param previous
     * @param withApplicationName
     * @param withUserId
     * @param dontCheckVersion
     * @param dontUseJsonDecode
     * @private
     */
    static mergePrevious({ currentName, previous, withApplicationName = true, withUserId = false, dontCheckVersion = false, dontUseJsonDecode = false }) {
        var _a;
        let result = null;
        if (previous === null || previous === void 0 ? void 0 : previous.length) {
            // Check prev names
            previous.forEach((prev) => {
                const item = localStorage.getItem(prev);
                if (ts_checkers_1.Is.notNullOrUndefinedOrEmpty(item)) {
                    result = item;
                }
                localStorage.removeItem(prev);
            });
            // Check prev version app
            let prevVersionAppList = (_a = this.prevVersionList) !== null && _a !== void 0 ? _a : [];
            if (ts_checkers_1.Is.notNullOrUndefinedOrEmpty(prevVersionAppList)) {
                prevVersionAppList.forEach((prevVersionApp) => {
                    const key = this.buildKey({
                        version: prevVersionApp,
                        withUserId: withUserId,
                        withApplicationName: withApplicationName,
                        currentName
                    });
                    const item = localStorage.getItem(key);
                    if (ts_checkers_1.Is.notNullOrUndefinedOrEmpty(item)) {
                        result = item;
                        localStorage.removeItem(key);
                    }
                });
            }
            if (ts_checkers_1.Is.notNullOrUndefinedOrEmpty(result)) {
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
     * @param version
     * @param currentName
     * @param withoutUserId
     */
    static buildKey({ version, currentName, withUserId = false, withApplicationName = true, }) {
        let key = currentName;
        if (ts_checkers_1.Is.notNullOrUndefined(version)) {
            key = `[${version}]${key}`;
        }
        if (withApplicationName) {
            key += `{${this.applicationName}}`;
        }
        if (withUserId) {
            key += `-${this.userId}`;
        }
        // TODO global configuration
        return key;
    }
    /**
     *
     * @param object must by type LocalStorageInterface
     * @param dontUseJsonDecode must by type boolean
     * @private
     */
    static checkPrevious(object, dontUseJsonDecode = false) {
        var _a, _b, _c;
        let result = null;
        if ((object === null || object === void 0 ? void 0 : object.CHECKED) === false) { // Don`t refactoring, it`s special check
            result = this.mergePrevious({
                currentName: object.CURRENT,
                previous: object.PREVIOUS,
                withApplicationName: (_a = object === null || object === void 0 ? void 0 : object.WITH_APPLICATION_NAME) !== null && _a !== void 0 ? _a : false,
                withUserId: (_b = object === null || object === void 0 ? void 0 : object.WITH_USER_ID) !== null && _b !== void 0 ? _b : false,
                dontCheckVersion: (_c = object === null || object === void 0 ? void 0 : object.DONT_CHECK_VERSION) !== null && _c !== void 0 ? _c : false,
                dontUseJsonDecode: dontUseJsonDecode,
            });
            object.CHECKED = true;
        }
        return result;
    }
}
__decorate([
    (0, package_ts_decorators_asserts_1.ArgumentsIsNotNullOrUndefined)()
], LocalStorage, "remove", null);
__decorate([
    (0, package_ts_decorators_asserts_1.ArgumentsIsNotNullOrUndefined)()
], LocalStorage, "set", null);
__decorate([
    (0, package_ts_decorators_asserts_1.ArgumentsIsNotNullOrUndefined)()
], LocalStorage, "get", null);
__decorate([
    (0, package_ts_decorators_asserts_1.ArgumentsIsNotNullOrUndefined)()
], LocalStorage, "mergePrevious", null);
__decorate([
    (0, package_ts_decorators_asserts_1.ArgumentsIsNotNullOrUndefined)()
], LocalStorage, "buildKey", null);
__decorate([
    (0, package_ts_decorators_asserts_1.ArgumentsIsNotNullOrUndefined)()
], LocalStorage, "checkPrevious", null);
exports.LocalStorage = LocalStorage;
