"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _a, _LocalStorageKey_state;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalStorageKey = exports.defaultState = void 0;
// TODO make const with generic and the generic extend from default StructureType.
exports.defaultState = {
    MAIN: {
        VERSION_APP: {
            CURRENT: `0.0`,
            PREVIOUS: [],
            CHECKED: false,
            DONT_CHECK_VERSION: true,
        },
        PREV_VERSION_APP: {
            CURRENT: `0.1`,
            PREVIOUS: [],
            CHECKED: false,
            DONT_CHECK_VERSION: true,
        },
        USER_ID: {
            CURRENT: `0.2`,
            PREVIOUS: [],
            CHECKED: false,
            DONT_CHECK_VERSION: true,
        },
        APPLICATION_NAME: {
            CURRENT: `0.3`,
            PREVIOUS: [],
            CHECKED: false,
            WITH_APPLICATION_NAME: false,
            DONT_CHECK_VERSION: true,
        },
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
    static get state() {
        return __classPrivateFieldGet(this, _a, "f", _LocalStorageKey_state);
    }
}
exports.LocalStorageKey = LocalStorageKey;
_a = LocalStorageKey;
_LocalStorageKey_state = { value: exports.defaultState };
