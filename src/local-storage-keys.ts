import { LocalStorageItemInterface } from './interfaces/local-storage-item.interface';
import { ArgumentsIsNotNullOrUndefined } from 'package-ts-decorators-asserts';

/**
 * {
 *   CURRENT: String of current name, // automate add to name as prefix a new data: [versionApp]
 *   PREVIOUS: Array with full name about prev names, e.g. with version app: `[0.0.1]1.0`; template `[versionApp]prevName`,
 *   CHECKED: Boolean, if initial value is "true" when fn will ignore check previous names.
 *   DONT_CHECK_VERSION: Boolean, who say don't check version in the name of key
 * }
 */

export type StructureType = {
  [key: string]: {
    [key: string]: LocalStorageItemInterface
  }
};

// TODO make const with generic and the generic extend from default StructureType.
export const defaultState = {
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

export class LocalStorageKey {
  static #state: StructureType = defaultState;

  /**
   *
   * @param category must be string
   * @param key must be string
   * @param value must be LocalStorageItemInterface
   */
  @ArgumentsIsNotNullOrUndefined()
  public static setItem(category: string, key: string, value: LocalStorageItemInterface): void {
    this.#state[category][key] = value;
  }

  /**
   *
   * @param category must be string
   * @param key must be string
   */
  @ArgumentsIsNotNullOrUndefined()
  public static removeItem(category: string, key: string): void {
    delete this.#state[category][key];
  }

  /**
   *
   * @param state must be StructureType
   */
  @ArgumentsIsNotNullOrUndefined()
  public static setState(state: StructureType): void {
    this.#state = state;
  }

  /**
   *
   * @param state must be StructureType
   */
  @ArgumentsIsNotNullOrUndefined()
  public static mergeState(state: StructureType): void {
    Object.assign(this.#state, state);
  }

  public static get state(): StructureType {
    return this.#state;
  }
}
