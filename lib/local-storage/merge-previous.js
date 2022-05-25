"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergePrevious = void 0;
const package_ts_decorators_asserts_1 = require("package-ts-decorators-asserts");
const ts_checkers_1 = require("ts-checkers");
const build_key_1 = require("./build-key");
const set_1 = require("./set");
const application_1 = require("./application");
class MergePrevious {
    /**
     *
     * @param object
     * @private
     */
    static mergePrevious(object) {
        var _a;
        let result = null;
        if ((_a = object === null || object === void 0 ? void 0 : object.previous) === null || _a === void 0 ? void 0 : _a.length) {
            // Check prev names
            object.previous.forEach((prev) => {
                const item = localStorage.getItem(prev);
                if (ts_checkers_1.Is.notNullOrUndefinedOrEmpty(item)) {
                    result = item;
                }
                localStorage.removeItem(prev);
            });
            // Check prev version app
            const prevVersionAppList = application_1.applicationPrevVersionList !== null && application_1.applicationPrevVersionList !== void 0 ? application_1.applicationPrevVersionList : [];
            if (Array.isArray(prevVersionAppList)) {
                prevVersionAppList.forEach((prevVersionApp) => {
                    const key = (0, build_key_1.buildKey)(object, prevVersionApp);
                    const item = localStorage.getItem(key);
                    if (ts_checkers_1.Is.notNullOrUndefinedOrEmpty(item)) {
                        result = item;
                        localStorage.removeItem(key);
                    }
                });
            }
            if (ts_checkers_1.Is.notNullOrUndefinedOrEmpty(result)) {
                (0, set_1.set)({
                    current: object === null || object === void 0 ? void 0 : object.current,
                    checkedPreviousVersion: object.checkedPreviousVersion,
                }, result);
            }
        }
        return result;
    }
}
__decorate([
    (0, package_ts_decorators_asserts_1.ArgumentsIsNotNullOrUndefined)()
], MergePrevious, "mergePrevious", null);
exports.mergePrevious = MergePrevious.mergePrevious;
