"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildKey = void 0;
const package_ts_decorators_asserts_1 = require("package-ts-decorators-asserts");
const application_1 = require("./application");
const user_1 = require("./user");
class BuildKey {
    /**
     *
     * @param object
     * @param prevVersion
     */
    static buildKey(object, prevVersion) {
        var _a;
        let key = (_a = object === null || object === void 0 ? void 0 : object.current) !== null && _a !== void 0 ? _a : '';
        if (object === null || object === void 0 ? void 0 : object.checkedPreviousVersion) {
            key = `[${prevVersion !== null && prevVersion !== void 0 ? prevVersion : application_1.applicationVersion}]${key}`;
        }
        if (object === null || object === void 0 ? void 0 : object.withApplicationName) {
            key += `{${application_1.applicationName}}`;
        }
        if (object === null || object === void 0 ? void 0 : object.withUserId) {
            key += `-${user_1.userId}`;
        }
        return key;
    }
}
__decorate([
    (0, package_ts_decorators_asserts_1.ArgumentsIsNotNullOrUndefined)()
], BuildKey, "buildKey", null);
exports.buildKey = BuildKey.buildKey;
