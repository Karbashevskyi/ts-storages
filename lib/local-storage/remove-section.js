"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeSection = void 0;
const package_ts_decorators_asserts_1 = require("package-ts-decorators-asserts");
const remove_1 = require("./remove");
const local_storage_keys_1 = require("../local-storage-keys");
class RemoveSection {
    /**
     *
     * @param section must be get from defaultState
     */
    static removeSection(section) {
        Object.values(section).forEach((item) => {
            (0, remove_1.remove)(item);
        });
    }
    static user() {
        (0, exports.removeSection)(local_storage_keys_1.defaultState.user);
    }
    static application() {
        (0, exports.removeSection)(local_storage_keys_1.defaultState.application);
    }
}
__decorate([
    (0, package_ts_decorators_asserts_1.ArgumentsIsNotNullOrUndefined)()
], RemoveSection, "removeSection", null);
exports.removeSection = RemoveSection.removeSection;
