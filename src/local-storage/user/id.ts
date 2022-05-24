import {get} from "../get";
import {defaultState} from "../../local-storage-keys";

export class Id {

    public static getId(): string {
        return get(defaultState.user.id);
    }

}
