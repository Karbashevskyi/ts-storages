import {LocalStorage, LocalStorageKey} from '../lib';
import {defaultState} from '../src/local-storage-keys';

describe('Test LocalStorage', () => {

    const applicationName: string = 'ts-storages';
    const version: string = '1.0.0';

    beforeAll(() => {
        const localStorageMock = (function() {
            let store: any = {};
            return {
                getItem: function(key: string) {
                    return store[key];
                },
                setItem: function(key: string, value: any) {
                    store[key] = value.toString();
                },
                clear: function() {
                    store = {};
                },
                removeItem: function(key: string) {
                    delete store[key];
                },
                length: Object.keys(store).length
            };
        })();
        Object.defineProperty(window, 'localStorage', { value: localStorageMock });
        Object.assign(localStorage, localStorageMock);

        LocalStorage.setApplicationName(applicationName);
        LocalStorage.set(defaultState.application.version, version);

    });

    it('Should localStorage empty', () => {
        expect(localStorage.length).toBe(0);
    });

    it('Should localStorage has an applicationName', () => {
        expect(LocalStorage.applicationName).toBe(applicationName);
    });

    it('Should localStorage has an applicationName', () => {
        expect(LocalStorage.applicationVersion).toBe(version);
    });

    it('Should localStorage has an applicationName', () => {
        expect(LocalStorage.userId).toBe(version);
    });

    it('Should add new items to LocalStorageKey', () => {
        LocalStorageKey.mergeState({
            TABLES: {
                EXAMPLE: {
                    current: `T.0`,
                    previous: [],
                    checkedPreviousVersion: true
                }
            }
        });
        expect(LocalStorageKey.state['TABLES']['EXAMPLE'].current).toBe('T.0');
    });

    it('Should add new items to localStorage', () => {
        LocalStorage.set(
            LocalStorageKey.state['TABLES']['EXAMPLE'],
            {
                propertyOne: 'valueOfPropertyOne',
                propertyTwo: 'valueOfPropertyTwo'
            }
        );
        const value: any = LocalStorage.get(LocalStorageKey.state['TABLES']['EXAMPLE']);
        expect(Object.keys(value).length).toBe(2);
    });

});


const get = (args: any) => {
    console.log(args);
    return 'Hello world';
};

class LS<T> {
    private static state: any;

    public get Get(): T {
        return LS.state as T;
    }

    public get Set(): T {
        return LS.state as T;
    }

    public get Remove(): T {
        return LS.state as T;
    }

    public static getInstance<T>(state: any): LS<T> {

        this.state = Object.keys(state).map((key) => {
            return {
                [key]: new Proxy(
                    state[key],
                    {
                        get(target: T, p: string | symbol, receiver: any): any {
                            console.log(target, p);
                            return get((target as any)[p]);
                        },
                        apply(target: any, thisArg: any, argArray: any[]): any {
                            return target(thisArg);
                        }
                    }
                )
            };
        }).reduce((object, item) => Object.assign(object, item), {}) as T;

        return new LS<T>();
    }
}

const defaultState = {
    application: {
        version: {
            current: `A.0`, // A - Application
        },
        prevVersion: {
            current: `A.1`, // A - Application
        },
    },
    user: {
        id: {
            current: `U.0`, // U - User
        },
    },
};

const LocalStorageV2 = LS.getInstance<typeof defaultState>(defaultState);

console.log(defaultState.application.prevVersion.get());
console.log(LocalStorageV2.Set.application.prevVersion('asd'));
// console.log(LocalStorageV2.Get.application.prevVersion);
//console.log(LocalStorageV2.Get.user.id);




