export interface LocalStorageItemInterface {
    current?: string;
    withApplicationName?: boolean;
    withUserId?: boolean;
    previous?: string[];
    checkedPreviousVersion?: boolean;
    json?: boolean;
}
