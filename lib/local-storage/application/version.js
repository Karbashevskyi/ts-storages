"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _a, _Version_version;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Version = void 0;
const ts_checkers_1 = require("ts-checkers");
const get_1 = require("../get");
const local_storage_keys_1 = require("../../local-storage-keys");
class Version {
    static getVersion() {
        if (ts_checkers_1.Is.nullOrUndefined(__classPrivateFieldGet(this, _a, "f", _Version_version))) {
            __classPrivateFieldSet(this, _a, (0, get_1.get)(local_storage_keys_1.defaultState.application.version), "f", _Version_version);
        }
        return __classPrivateFieldGet(this, _a, "f", _Version_version);
    }
}
exports.Version = Version;
_a = Version;
_Version_version = { value: void 0 };
