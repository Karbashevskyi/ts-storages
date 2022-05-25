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
var _a, _Name_name;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Name = void 0;
const package_ts_decorators_asserts_1 = require("package-ts-decorators-asserts");
const ts_asserts_1 = require("ts-asserts");
class Name {
    /**
     *
     * @param name
     */
    static setName(name) {
        __classPrivateFieldSet(this, _a, name, "f", _Name_name);
    }
    static getName() {
        ts_asserts_1.Asserts.assertString(__classPrivateFieldGet(this, _a, "f", _Name_name));
        return __classPrivateFieldGet(this, _a, "f", _Name_name);
    }
}
_a = Name;
_Name_name = { value: void 0 };
__decorate([
    (0, package_ts_decorators_asserts_1.ArgumentsIsNotNullOrUndefined)()
], Name, "setName", null);
exports.Name = Name;
