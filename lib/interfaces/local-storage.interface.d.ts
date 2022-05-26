import { EncryptionEnum } from '../enum/encryptionEnum';
export interface LocalStorageInterface {
    current?: string;
    previous?: string[];
    checked?: boolean;
    withApplicationName?: boolean;
    withUserId?: boolean;
    dontCheckVersion?: boolean;
    encryption?: EncryptionEnum;
    json?: boolean;
}
