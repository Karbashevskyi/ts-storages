"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalStorage = void 0;
const get_1 = require("./get");
const local_storage_keys_1 = require("../local-storage-keys");
const remove_1 = require("./remove");
const set_1 = require("./set");
const items = new Proxy(local_storage_keys_1.defaultState, {
    get(target, p, receiver) {
        return (0, get_1.get)(target[p]);
    }
});
exports.LocalStorage = {
    get: Object.assign({ item(object) {
            return (0, get_1.get)(object);
        } }, items),
    set: Object.assign({ item(object, value) {
            return (0, set_1.set)(object, value);
        } }, items),
    remove: Object.assign({ item(object) {
            return (0, remove_1.remove)(object);
        } }, items)
};
// LocalStorage.get.item(defaultState.application.name);
// LocalStorage.get.user.id;
// LocalStorage.get.application.version;
