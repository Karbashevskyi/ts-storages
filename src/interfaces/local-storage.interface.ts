import {EncryptionEnum} from '../enum/encryptionEnum';

export interface LocalStorageInterface {
  current?: string;
  previous?: string[]; // Write full name of key (like in localStorage: 0.0{Unicard-Impero360} or [1.0.0]1.1{Unicard-Impero360})
  checked?: boolean;
  withApplicationName?: boolean;
  withUserId?: boolean;
  dontCheckVersion?: boolean;
  encryption?: EncryptionEnum;
  json?: boolean; // default true
}
