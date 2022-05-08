"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _a, _LocalStorageKey_state;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalStorageKey = exports.defaultState = void 0;
const package_ts_decorators_asserts_1 = require("package-ts-decorators-asserts");
// TODO make const with generic and the generic extend from default StructureType.
exports.defaultState = {
    APPLICATION: {
        NAME: {
            CURRENT: `0.0`,
            PREVIOUS: [],
            CHECKED: false,
            WITH_APPLICATION_NAME: false,
            DONT_CHECK_VERSION: true,
        },
        VERSION: {
            CURRENT: `0.1`,
            PREVIOUS: [],
            CHECKED: false,
            DONT_CHECK_VERSION: true,
        },
        PREV_VERSION: {
            CURRENT: `0.2`,
            PREVIOUS: [],
            CHECKED: false,
            DONT_CHECK_VERSION: true,
        }
    },
    USER: {
        ID: {
            CURRENT: `1.0`,
            PREVIOUS: [],
            CHECKED: false,
            DONT_CHECK_VERSION: true,
        }
    },
};
class LocalStorageKey {
    /**
     *
     * @param category must be string
     * @param key must be string
     * @param value must be LocalStorageInterface
     */
    static set(category, key, value) {
        __classPrivateFieldGet(this, _a, "f", _LocalStorageKey_state)[category][key] = value;
    }
    /**
     *
     * @param category must be string
     * @param key must be string
     */
    static remove(category, key) {
        delete __classPrivateFieldGet(this, _a, "f", _LocalStorageKey_state)[category][key];
    }
    /**
     *
     * @param state
     */
    static merge(state) {
        Object.assign(__classPrivateFieldGet(this, _a, "f", _LocalStorageKey_state), state);
    }
    static get state() {
        return __classPrivateFieldGet(this, _a, "f", _LocalStorageKey_state);
    }
}
_a = LocalStorageKey;
_LocalStorageKey_state = { value: exports.defaultState };
__decorate([
    (0, package_ts_decorators_asserts_1.ArgumentsIsNotNullOrUndefined)()
], LocalStorageKey, "set", null);
__decorate([
    (0, package_ts_decorators_asserts_1.ArgumentsIsNotNullOrUndefined)()
], LocalStorageKey, "remove", null);
__decorate([
    (0, package_ts_decorators_asserts_1.ArgumentsIsNotNullOrUndefined)()
], LocalStorageKey, "merge", null);
exports.LocalStorageKey = LocalStorageKey;
