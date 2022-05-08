import { LocalStorageInterface } from './interfaces/local-storage.interface';
import { Is } from 'ts-checkers';
import { defaultState } from './local-storage-keys';
import { ArgumentsIsNotNullOrUndefined } from 'package-ts-decorators-asserts';

export class LocalStorage {
  // TODO add global configuration of user id and application name and other!
  public static get applicationName(): string {
    return this.get(defaultState.APPLICATION.NAME);
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
    localStorage.removeItem(
      this.buildKey({
        currentName: object.CURRENT,
        withUserId: object?.WITH_USER_ID ?? false,
        ...(object?.DONT_CHECK_VERSION
          ? {}
          : {
              version: this.version,
            }),
      }),
    );
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
      value = JSON.stringify(value);
    }

    const key: string = this.buildKey({
      currentName: object.CURRENT,
      withUserId: object?.WITH_USER_ID ?? false,
      withApplicationName: object?.WITH_APPLICATION_NAME ?? true,
      ...(object?.DONT_CHECK_VERSION
        ? {}
        : {
            version: this.version,
          }),
    });

    localStorage.setItem(key, value);
  }

  /**
   *
   * @param object must be LocalStorageInterface type
   * @param dontUseJsonDecode optional and type is boolean
   */
  @ArgumentsIsNotNullOrUndefined()
  public static get(object: LocalStorageInterface, dontUseJsonDecode: boolean = false): any {
    // let value: any;
    let value: any = this.checkPrevious(object, dontUseJsonDecode);

    if (Is.notNullOrUndefined(value)) {
      return value;
    }

    value = localStorage.getItem(
      this.buildKey({
        currentName: object.CURRENT,
        withUserId: object?.WITH_USER_ID ?? false,
        withApplicationName: object?.WITH_APPLICATION_NAME ?? true,
        ...(object?.DONT_CHECK_VERSION
          ? {}
          : {
              version: this.version,
            }),
      }),
    );

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
   * @param currentName must be string type
   * @param previous must be array of string type
   * @param withApplicationName optional and type is boolean
   * @param withUserId optional and type is boolean
   * @param dontCheckVersion optional and type is boolean
   * @param dontUseJsonDecode optional and type is boolean
   * @private
   */
  @ArgumentsIsNotNullOrUndefined()
  private static mergePrevious({
    currentName,
    previous,
    withApplicationName = true,
    withUserId = false,
    dontCheckVersion = false,
    dontUseJsonDecode = false,
  }: {
    currentName: string;
    previous: string[];
    withApplicationName?: boolean;
    withUserId?: boolean;
    dontCheckVersion?: boolean;
    dontUseJsonDecode?: boolean;
  }): any {
    let result: any = null;

    if (previous?.length) {
      // Check prev names
      previous.forEach((prev) => {
        const item = localStorage.getItem(prev);

        if (Is.notNullOrUndefinedOrEmpty(item)) {
          result = item;
        }

        localStorage.removeItem(prev);
      });

      // Check prev version app
      const prevVersionAppList: string[] = this.prevVersionList ?? [];

      if (Is.notNullOrUndefinedOrEmpty(prevVersionAppList)) {
        prevVersionAppList.forEach((prevVersionApp: string) => {
          const key: string = this.buildKey({
            version: prevVersionApp,
            withUserId,
            withApplicationName,
            currentName,
          });

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
            CURRENT: currentName,
            PREVIOUS: [],
            CHECKED: true,
            DONT_CHECK_VERSION: dontCheckVersion,
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
   * @param version must be string
   * @param currentName must be string
   * @param withoutUserId optional and type is boolean
   * @param withApplicationName optional and type is boolean
   */
  @ArgumentsIsNotNullOrUndefined()
  public static buildKey({
    version,
    currentName,
    withUserId = false,
    withApplicationName = true,
  }: {
    currentName: string;
    version?: string;
    withUserId?: boolean;
    withApplicationName?: boolean;
  }): string {
    let key: string = currentName;

    if (Is.notNullOrUndefined(version)) {
      key = `[${version}]${key}`;
    }

    if (withApplicationName) {
      key += `{${this.applicationName}}`;
    }

    if (withUserId) {
      key += `-${this.userId}`;
    }

    // TODO global configuration

    return key;
  }

  /**
   *
   * @param object must by type LocalStorageInterface
   * @param dontUseJsonDecode must by type boolean
   * @private
   */
  @ArgumentsIsNotNullOrUndefined()
  private static checkPrevious(object: LocalStorageInterface, dontUseJsonDecode: boolean = false): null | any {
    let result: any = null;

    if (object?.CHECKED === false) {
      // Don`t refactoring, it`s special check

      result = this.mergePrevious({
        currentName: object.CURRENT,
        previous: object.PREVIOUS,
        withApplicationName: object?.WITH_APPLICATION_NAME ?? true,
        withUserId: object?.WITH_USER_ID ?? false,
        dontCheckVersion: object?.DONT_CHECK_VERSION ?? false,
        dontUseJsonDecode,
      });

      object.CHECKED = true;
    }

    return result;
  }
}
