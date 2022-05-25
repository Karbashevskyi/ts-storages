"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Id = void 0;
const get_1 = require("../get");
const local_storage_keys_1 = require("../../local-storage-keys");
class Id {
    static getId() {
        return (0, get_1.get)(local_storage_keys_1.defaultState.user.id);
    }
}
exports.Id = Id;
