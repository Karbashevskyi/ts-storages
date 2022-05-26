import { LocalStorageInterface } from './interfaces/local-storage.interface';
import { Is } from 'ts-checkers';
import { defaultState } from './local-storage-keys';
import { ArgumentsIsNotNullOrUndefined } from 'package-ts-decorators-asserts';
import { Asserts } from 'ts-asserts';

export class LocalStorage {
  static #applicationName: string;
  static #applicationVersion: string | null;

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

  public static get applicationVersion(): string | null {
    if (Is.nullOrUndefined(this.#applicationVersion)) {
      this.#applicationVersion = this.get(defaultState.APPLICATION.VERSION);
    }
    return this.#applicationVersion;
  }

  public static get userId(): string {
    return this.get(defaultState.USER.ID);
  }

  public static get prevVersionList(): string[] {
    return this.get(defaultState.APPLICATION.PREV_VERSION);
  }

  public static deleteUserData(): void {
    this.deleteSection(defaultState.USER);
  }

  public static deleteApplicationData(): void {
    this.deleteSection(defaultState.USER);
  }

  /**
   *
   * @param section must be get from defaultState
   */
  @ArgumentsIsNotNullOrUndefined()
  public static deleteSection(section: { [key: string]: LocalStorageInterface }): void {
    Object.values(section).forEach((item: LocalStorageInterface) => {
      this.remove(item);
    });
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
   */
  @ArgumentsIsNotNullOrUndefined()
  public static set(object: LocalStorageInterface, value: any): void {
    if (Is.true(object?.json ?? true)) {
      try {
        value = JSON.stringify(value);
      } catch (e) {
        value = null;
      }
    }
    const key: string = this.buildKey(object);
    if (object?.encryption) {
      value = new Buffer(value);
      value = value.toString(object?.encryption);
    }
    localStorage.setItem(key, value);
  }

  /**
   *
   * @param object must be LocalStorageInterface type
   */
  @ArgumentsIsNotNullOrUndefined()
  public static get(object: LocalStorageInterface): any {
    let value: any = this.checkPrevious(object);

    if (Is.notNullOrUndefined(value)) {
      return value;
    }

    value = localStorage.getItem(this.buildKey(object));

    if (object?.encryption) {
      value = new Buffer(value, object?.encryption).toString('ascii');
    }

    if (Is.true(object?.json ?? true)) {
      try {
        value = JSON.parse(value);
      } catch (e) {
        value = null;
      }
    }

    return value;
  }

  /**
   *
   * @param object
   * @private
   */
  @ArgumentsIsNotNullOrUndefined()
  private static mergePrevious(object: LocalStorageInterface): any {
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
      key = `[${prevVersion ?? this.applicationVersion}]${key}`;
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
   * @private
   */
  @ArgumentsIsNotNullOrUndefined()
  private static checkPrevious(object: LocalStorageInterface): null | any {
    let result: any = null;

    if (Is.false(object?.checked ?? true)) {
      // Don`t refactoring, it`s special check

      result = this.mergePrevious(object);

      object.checked = true;
    }

    return result;
  }
}
