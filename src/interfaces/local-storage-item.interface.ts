export interface LocalStorageItemInterface {
  current?: string;
  withApplicationName?: boolean;
  withUserId?: boolean;
  previous?: string[]; // Write full name of key (like in localStorage: 0.0{Unicard-Impero360} or [1.0.0]1.1{Unicard-Impero360})
  checkedPreviousVersion?: boolean; // Set true if you don't want to check previous version
  json?: boolean; // default true
}
