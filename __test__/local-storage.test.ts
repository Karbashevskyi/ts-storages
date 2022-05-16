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
        LocalStorage.set(defaultState.APPLICATION.VERSION, version);

    });

    it('Should localStorage empty', () => {
        expect(localStorage.length).toBe(0);
    });

    it('Should localStorage has an applicationName', () => {
        expect(LocalStorage.applicationName).toBe(applicationName);
    });

    it('Should localStorage has an applicationName', () => {
        expect(LocalStorage.applicationName).toBe(version);
    });

    it('Should add new items to LocalStorageKey', () => {
        LocalStorageKey.mergeState({
            TABLES: {
                EXAMPLE: {
                    current: `T.0`,
                    previous: [],
                    checked: true
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
