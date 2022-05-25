"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.get = void 0;
const package_ts_decorators_asserts_1 = require("package-ts-decorators-asserts");
const ts_checkers_1 = require("ts-checkers");
const build_key_1 = require("./build-key");
const check_previous_1 = require("./check-previous");
class Get {
    /**
     *
     * @param object must be LocalStorageItemInterface type
     */
    static get(object) {
        var _a;
        let value = (0, check_previous_1.checkPrevious)(object);
        if (ts_checkers_1.Is.notNullOrUndefined(value)) {
            return value;
        }
        value = localStorage.getItem((0, build_key_1.buildKey)(object));
        if (ts_checkers_1.Is.true((_a = object === null || object === void 0 ? void 0 : object.json) !== null && _a !== void 0 ? _a : true)) {
            try {
                return JSON.parse(value);
            }
            catch (e) {
                return null;
            }
        }
        else {
            return value;
        }
    }
}
__decorate([
    (0, package_ts_decorators_asserts_1.ArgumentsIsNotNullOrUndefined)()
], Get, "get", null);
exports.get = Get.get;
