import {Is} from "ts-checkers";
import {get} from "../get";
import {defaultState} from "../../local-storage-keys";

export class Version {

    static #version: string | null;

    public static getVersion(): string | null {
        if (Is.nullOrUndefined(this.#version)) {
            this.#version = get(defaultState.application.version);
        }
        return this.#version;
    }

}
