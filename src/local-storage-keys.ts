/**
 * {
 *   CURRENT: String of current name, // automate add to name as prefix a new data: [versionApp]
 *   PREVIOUS: Array with full name about prev names, e.g. with version app: `[0.0.1]1.0`; template `[versionApp]prevName`,
 *   CHECKED: Boolean, if initial value is "true" when fn will ignore check previous names.
 *   DONT_CHECK_VERSION: Boolean, who say don't check version in the name of key
 * }
 */
import { LocalStorageInterface } from './interfaces/local-storage.interface';
import { ArgumentsIsNotNullOrUndefined } from 'package-ts-decorators-asserts';

export type StructureType = { [key: string]: { [key: string]: LocalStorageInterface } };

// TODO make const with generic and the generic extend from default StructureType.
export const defaultState = {
  APPLICATION: {
    NAME: {
      CURRENT: `0.0`,
      PREVIOUS: [],
      CHECKED: false,
      WITH_APPLICATION_NAME: false,
      DONT_CHECK_VERSION: true,
    },
    VERSION: {
      CURRENT: `0.1`,
      PREVIOUS: [],
      CHECKED: false,
      DONT_CHECK_VERSION: true,
    },
    PREV_VERSION: {
      CURRENT: `0.2`,
      PREVIOUS: [],
      CHECKED: false,
      DONT_CHECK_VERSION: true,
    },
  },
  USER: {
    ID: {
      CURRENT: `1.0`,
      PREVIOUS: [],
      CHECKED: false,
      DONT_CHECK_VERSION: true,
    },
  },
};

export class LocalStorageKey {
  static readonly #state: StructureType = defaultState;

  /**
   *
   * @param category must be string
   * @param key must be string
   * @param value must be LocalStorageInterface
   */
  @ArgumentsIsNotNullOrUndefined()
  public static set(category: string, key: string, value: LocalStorageInterface): void {
    this.#state[category][key] = value;
  }

  /**
   *
   * @param category must be string
   * @param key must be string
   */
  @ArgumentsIsNotNullOrUndefined()
  public static remove(category: string, key: string): void {
    delete this.#state[category][key];
  }

  /**
   *
   * @param state
   */
  @ArgumentsIsNotNullOrUndefined()
  public static merge(state: StructureType): void {
    Object.assign(this.#state, state);
  }

  public static get state(): StructureType {
    return this.#state;
  }
}
