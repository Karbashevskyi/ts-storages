import {GuardType} from '@p4ck493/ts-type-guard';
import {is} from '@p4ck493/ts-is';

export namespace Base {

    export class Model<T extends Storage> {

        #storage: T | undefined;

        public get storage(): T {
            if (is.object(this.#storage)) {
                return this.#storage;
            }
            throw new TypeError('Variable storage is empty, use setStorage() method before get storage');
        }

        /**
         *
         * @param storage
         */
        @GuardType([is.object.not.empty])
        public setStorage(storage: T): void {
            this.#storage = storage;
        }

        // TODO implement set method
        // TODO change interface for "key" and "value" argument
        @GuardType([is.object.not.empty, null])
        public set(key: any, value: any): boolean {
            this.storage.setItem(key, value);
            return true;
        }

        // TODO implement get method
        // TODO change interface for "key" argument
        @GuardType([is.object.not.empty])
        public get<T>(key: any): T | null {
            const value: string | null = this.storage.getItem(key);
            if (is.null(value)) {
                return value;
            } else {
                return JSON.parse(value);
            }
        }

        // TODO implement delete method
        // TODO change interface for "key" argument
        @GuardType([is.object.not.empty])
        public delete(key: any): boolean {
            this.storage.removeItem(key);
            return true;
        }

    }
}
