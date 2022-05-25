"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPrevious = void 0;
const package_ts_decorators_asserts_1 = require("package-ts-decorators-asserts");
const ts_checkers_1 = require("ts-checkers");
const merge_previous_1 = require("./merge-previous");
class CheckPrevious {
    /**
     *
     * @param object must by type LocalStorageItemInterface
     * @private
     */
    static checkPrevious(object) {
        var _a, _b;
        let result = null;
        if (((_a = object === null || object === void 0 ? void 0 : object.previous) === null || _a === void 0 ? void 0 : _a.length) && ts_checkers_1.Is.false((_b = object === null || object === void 0 ? void 0 : object.checkedPreviousVersion) !== null && _b !== void 0 ? _b : false)) {
            result = (0, merge_previous_1.mergePrevious)(object);
            object['checkedPreviousVersion'] = true;
        }
        return result;
    }
}
__decorate([
    (0, package_ts_decorators_asserts_1.ArgumentsIsNotNullOrUndefined)()
], CheckPrevious, "checkPrevious", null);
exports.checkPrevious = CheckPrevious.checkPrevious;
