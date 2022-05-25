import { LocalStorageItemInterface } from "../interfaces/local-storage-item.interface";
declare class RemoveSection {
    /**
     *
     * @param section must be get from defaultState
     */
    static removeSection(section: {
        [key: string]: LocalStorageItemInterface;
    }): void;
    static user(): void;
    static application(): void;
}
export declare const removeSection: typeof RemoveSection.removeSection;
export {};
