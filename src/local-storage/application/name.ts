import {ArgumentsIsNotNullOrUndefined} from "package-ts-decorators-asserts";
import {Asserts} from "ts-asserts";

export class Name {

    static #name: string;

    /**
     *
     * @param name
     */
    @ArgumentsIsNotNullOrUndefined()
    public static setName(name: string) {
        this.#name = name;
    }

    public static getName(): string {
        Asserts.assertString(this.#name);
        return this.#name;
    }

}
