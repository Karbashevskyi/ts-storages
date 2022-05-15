import { LocalStorageInterface } from './interfaces/local-storage.interface';
import { Is } from 'ts-checkers';
import { defaultState } from './local-storage-keys';
import { ArgumentsIsNotNullOrUndefined } from 'package-ts-decorators-asserts';
import { Asserts } from 'ts-asserts';

export class LocalStorage {
  static #applicationName: string;

  // TODO add global configuration of user id and application name and other!
  // TODO applicationName is local, dont save to localStorage
  /**
   *
   * @param name
   */
  @ArgumentsIsNotNullOrUndefined()
  public static setApplicationName(name: string) {
    this.#applicationName = name;
  }

  public static get applicationName(): string {
    Asserts.assertString(this.#applicationName);
    return this.#applicationName;
  }

  public static get version(): string {
    return this.get(defaultState.APPLICATION.VERSION);
  }

  public static get userId(): string {
    return this.get(defaultState.USER.ID);
  }

  public static get prevVersionList(): string[] {
    return this.get(defaultState.APPLICATION.PREV_VERSION);
  }

  /**
   *
   * @param object must be LocalStorageInterface
   */
  @ArgumentsIsNotNullOrUndefined()
  public static remove(object: LocalStorageInterface): void {
    localStorage.removeItem(this.buildKey(object));
  }

  /**
   *
   * @param object must be LocalStorageInterface type
   * @param value any type
   * @param dontUseJsonEncode optional argument and type is boolean
   */
  @ArgumentsIsNotNullOrUndefined()
  public static set(object: LocalStorageInterface, value: any, dontUseJsonEncode: boolean = false): void {
    if (!dontUseJsonEncode) {
      try {
        value = JSON.stringify(value);
      } catch (e) {
        value = null;
      }
    }
    const key: string = this.buildKey(object);
    localStorage.setItem(key, value);
  }

  /**
   *
   * @param object must be LocalStorageInterface type
   * @param dontUseJsonDecode optional and type is boolean
   */
  @ArgumentsIsNotNullOrUndefined()
  public static get(object: LocalStorageInterface, dontUseJsonDecode: boolean = false): any {
    let value: any = this.checkPrevious(object, dontUseJsonDecode);

    if (Is.notNullOrUndefined(value)) {
      return value;
    }

    value = localStorage.getItem(this.buildKey(object));

    if (dontUseJsonDecode) {
      return value;
    } else {
      try {
        return JSON.parse(value);
      } catch (e) {
        return null;
      }
    }
  }

  /**
   *
   * @param object
   * @param dontUseJsonDecode optional and type is boolean
   * @private
   */
  @ArgumentsIsNotNullOrUndefined()
  private static mergePrevious(object: LocalStorageInterface, dontUseJsonDecode: boolean = false): any {
    let result: any = null;

    if (object?.previous?.length) {
      // Check prev names
      object?.previous.forEach((prev) => {
        const item = localStorage.getItem(prev);

        if (Is.notNullOrUndefinedOrEmpty(item)) {
          result = item;
        }

        localStorage.removeItem(prev);
      });

      // Check prev version app
      const prevVersionAppList: string[] = this.prevVersionList ?? [];

      if (Array.isArray(prevVersionAppList)) {
        prevVersionAppList.forEach((prevVersionApp: string) => {
          const key: string = this.buildKey(object, prevVersionApp);

          const item: any = localStorage.getItem(key);

          if (Is.notNullOrUndefinedOrEmpty(item)) {
            result = item;
            localStorage.removeItem(key);
          }
        });
      }

      if (Is.notNullOrUndefinedOrEmpty(result)) {
        this.set(
          {
            current: object?.current,
            previous: [],
            checked: true,
            dontCheckVersion: object.dontCheckVersion,
          },
          result,
          dontUseJsonDecode,
        );
      }
    }

    return result;
  }

  /**
   *
   * @param object
   * @param prevVersion
   */
  @ArgumentsIsNotNullOrUndefined()
  public static buildKey(object: LocalStorageInterface, prevVersion?: string): string {
    let key: string = object?.current ?? '';

    if (!object?.dontCheckVersion) {
      key = `[${prevVersion ?? this.version}]${key}`;
    }

    if (object?.withApplicationName) {
      key += `{${this.applicationName}}`;
    }

    if (object?.withUserId) {
      key += `-${this.userId}`;
    }

    return key;
  }

  /**
   *
   * @param object must by type LocalStorageInterface
   * @param dontUseJsonDecode must by type boolean
   * @private
   */
  @ArgumentsIsNotNullOrUndefined()
  private static checkPrevious(
      object: LocalStorageInterface, dontUseJsonDecode: boolean = false): null | any {
    let result: any = null;

    if (Is.false(object?.checked ?? true)) {
      // Don`t refactoring, it`s special check

      result = this.mergePrevious(object, dontUseJsonDecode);

      object.checked = true;
    }

    return result;
  }
}
