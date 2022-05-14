export interface LocalStorageInterface {
    current?: string;
    previous?: string[];
    checked?: boolean;
    withApplicationName?: boolean;
    withUserId?: boolean;
    dontCheckVersion?: boolean;
}
