import {ArgumentsIsNotNullOrUndefined} from "package-ts-decorators-asserts";
import {LocalStorageItemInterface} from "../interfaces/local-storage-item.interface";
import {remove} from "./remove";
import {defaultState} from "../local-storage-keys";

class RemoveSection {


    /**
     *
     * @param section must be get from defaultState
     */
    @ArgumentsIsNotNullOrUndefined()
    public static removeSection(section: { [key: string]: LocalStorageItemInterface }): void {
        Object.values(section).forEach((item: LocalStorageItemInterface) => {
            remove(item);
        });
    }



    public static user(): void {
        removeSection(defaultState.user);
    }

    public static application(): void {
        removeSection(defaultState.application);
    }

}

export const removeSection: typeof RemoveSection.removeSection = RemoveSection.removeSection;
