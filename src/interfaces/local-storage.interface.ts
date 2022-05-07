export interface LocalStorageInterface {
    CURRENT: string;
    PREVIOUS: string[]; // Write full name of key (like in localStorage: 0.0{Unicard-Impero360} or [1.0.0]1.1{Unicard-Impero360})
    CHECKED: boolean;
    DONT_CHECK_VERSION?: boolean;
}
