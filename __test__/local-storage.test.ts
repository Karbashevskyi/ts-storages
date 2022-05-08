import {LocalStorage} from '../lib';
import {defaultState} from '../src/local-storage-keys';

describe('Test LocalStorage', () => {

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

    });

    it('Should localStorage empty', () => {
        expect(localStorage.length).toBe(0);
    });

    it('Should localStorage has a applicationName', () => {
        const applicationName = 'ts-storages';
        LocalStorage.set(defaultState.MAIN.APPLICATION_NAME, applicationName);
        expect(LocalStorage.applicationName).toBe(applicationName);
    });

    // TODO make tests

    it('Add new tests', () => {
        expect(true).toBeTruthy();
    });

});
