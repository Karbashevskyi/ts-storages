"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.set = void 0;
const package_ts_decorators_asserts_1 = require("package-ts-decorators-asserts");
const ts_checkers_1 = require("ts-checkers");
const build_key_1 = require("./build-key");
class Set {
    /**
     *
     * @param object must be LocalStorageItemInterface type
     * @param value any type
     */
    static set(object, value) {
        var _a;
        if (ts_checkers_1.Is.true((_a = object === null || object === void 0 ? void 0 : object.json) !== null && _a !== void 0 ? _a : true)) {
            try {
                value = JSON.stringify(value);
            }
            catch (e) {
                value = null;
            }
        }
        const key = (0, build_key_1.buildKey)(object);
        localStorage.setItem(key, value);
    }
}
__decorate([
    (0, package_ts_decorators_asserts_1.ArgumentsIsNotNullOrUndefined)()
], Set, "set", null);
exports.set = Set.set;
