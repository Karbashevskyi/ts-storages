import {get} from "../get";
import {defaultState} from "../../local-storage-keys";

export class PrevVersion {

    public static getPrevVersionList(): string[] | null {
        return get(defaultState.application.prevVersion);
    }

}
