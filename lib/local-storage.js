"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _a, _LocalStorage_applicationName;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalStorage = void 0;
const ts_checkers_1 = require("ts-checkers");
const local_storage_keys_1 = require("./local-storage-keys");
const package_ts_decorators_asserts_1 = require("package-ts-decorators-asserts");
const ts_asserts_1 = require("ts-asserts");
class LocalStorage {
    // TODO add global configuration of user id and application name and other!
    // TODO applicationName is local, dont save to localStorage
    /**
     *
     * @param name
     */
    static setApplicationName(name) {
        __classPrivateFieldSet(this, _a, name, "f", _LocalStorage_applicationName);
    }
    static get applicationName() {
        ts_asserts_1.Asserts.assertString(__classPrivateFieldGet(this, _a, "f", _LocalStorage_applicationName));
        return __classPrivateFieldGet(this, _a, "f", _LocalStorage_applicationName);
    }
    static get version() {
        return this.get(local_storage_keys_1.defaultState.APPLICATION.VERSION);
    }
    static get userId() {
        return this.get(local_storage_keys_1.defaultState.USER.ID);
    }
    static get prevVersionList() {
        return this.get(local_storage_keys_1.defaultState.APPLICATION.PREV_VERSION);
    }
    /**
     *
     * @param object must be LocalStorageInterface
     */
    static remove(object) {
        localStorage.removeItem(this.buildKey(object));
    }
    /**
     *
     * @param object must be LocalStorageInterface type
     * @param value any type
     * @param dontUseJsonEncode optional argument and type is boolean
     */
    static set(object, value, dontUseJsonEncode = false) {
        if (!dontUseJsonEncode) {
            value = JSON.stringify(value);
        }
        const key = this.buildKey(Object.assign(Object.assign({}, object), ((object === null || object === void 0 ? void 0 : object.dontCheckVersion)
            ? {}
            : {
                version: this.version,
            })));
        localStorage.setItem(key, value);
    }
    /**
     *
     * @param object must be LocalStorageInterface type
     * @param dontUseJsonDecode optional and type is boolean
     */
    static get(object, dontUseJsonDecode = false) {
        // let value: any;
        let value = this.checkPrevious(object, dontUseJsonDecode);
        if (ts_checkers_1.Is.notNullOrUndefined(value)) {
            return value;
        }
        value = localStorage.getItem(this.buildKey(Object.assign(Object.assign({}, object), ((object === null || object === void 0 ? void 0 : object.dontCheckVersion)
            ? {}
            : {
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
     * @param object
     * @param dontUseJsonDecode optional and type is boolean
     * @private
     */
    static mergePrevious(object, dontUseJsonDecode = false) {
        var _b, _c;
        let result = null;
        if ((_b = object === null || object === void 0 ? void 0 : object.previous) === null || _b === void 0 ? void 0 : _b.length) {
            // Check prev names
            object === null || object === void 0 ? void 0 : object.previous.forEach((prev) => {
                const item = localStorage.getItem(prev);
                if (ts_checkers_1.Is.notNullOrUndefinedOrEmpty(item)) {
                    result = item;
                }
                localStorage.removeItem(prev);
            });
            // Check prev version app
            const prevVersionAppList = (_c = this.prevVersionList) !== null && _c !== void 0 ? _c : [];
            if (ts_checkers_1.Is.notNullOrUndefinedOrEmpty(prevVersionAppList)) {
                prevVersionAppList.forEach((prevVersionApp) => {
                    const key = this.buildKey(object, prevVersionApp);
                    const item = localStorage.getItem(key);
                    if (ts_checkers_1.Is.notNullOrUndefinedOrEmpty(item)) {
                        result = item;
                        localStorage.removeItem(key);
                    }
                });
            }
            if (ts_checkers_1.Is.notNullOrUndefinedOrEmpty(result)) {
                this.set({
                    current: object === null || object === void 0 ? void 0 : object.current,
                    previous: [],
                    checked: true,
                    dontCheckVersion: object.dontCheckVersion,
                }, result, dontUseJsonDecode);
            }
        }
        return result;
    }
    /**
     *
     * @param object
     * @param prevVersion
     */
    static buildKey(object, prevVersion) {
        var _b;
        let key = (_b = object === null || object === void 0 ? void 0 : object.current) !== null && _b !== void 0 ? _b : '';
        if (!(object === null || object === void 0 ? void 0 : object.dontCheckVersion)) {
            key = `[${prevVersion !== null && prevVersion !== void 0 ? prevVersion : this.version}]${key}`;
        }
        if (object === null || object === void 0 ? void 0 : object.withApplicationName) {
            key += `{${this.applicationName}}`;
        }
        if (object === null || object === void 0 ? void 0 : object.withUserId) {
            key += `-${this.userId}`;
        }
        return key;
    }
    /**
     *
     * @param object must by type LocalStorageInterface
     * @param dontUseJsonDecode must by type boolean
     * @private
     */
    static checkPrevious(object, dontUseJsonDecode = false) {
        var _b;
        let result = null;
        if (ts_checkers_1.Is.false((_b = object === null || object === void 0 ? void 0 : object.checked) !== null && _b !== void 0 ? _b : true)) {
            // Don`t refactoring, it`s special check
            result = this.mergePrevious(object, dontUseJsonDecode);
            object.checked = true;
        }
        return result;
    }
}
_a = LocalStorage;
_LocalStorage_applicationName = { value: void 0 };
__decorate([
    (0, package_ts_decorators_asserts_1.ArgumentsIsNotNullOrUndefined)()
], LocalStorage, "setApplicationName", null);
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
