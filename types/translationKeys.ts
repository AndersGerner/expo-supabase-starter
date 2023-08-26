/**
 * @file This file contains types and utilities for handling translations in the application.
 */

// Import the main translation file (English) to base our types on.
import { en } from '@/translations/en';

/**
 * Join<K, P> type
 *
 * A utility type that takes two types K and P, and returns a new template literal type.
 * This type is used to concatenate nested keys into a single string separated by a dot.
 *
 * @template K - The parent key.
 * @template P - The child key.
 *
 * @example
 * type Test = Join<'parent', 'child'>;  // Result: 'parent.child'
 */
type Join<K, P> = K extends string | number
  ? P extends string | number
    ? `${K}${'' extends P ? '' : '.'}${P}`
    : never
  : never;

/**
 * Paths<T, D> type
 *
 * A utility type to recursively traverse all paths in an object T up to a depth D.
 * It returns a union of string literals where each string is a path to a leaf node in T.
 *
 * @template T - The object type to traverse.
 * @template D - The maximum depth to traverse.
 *
 * @example
 * type Test = Paths<{ a: { b: string } }>;  // Result: 'a' | 'a.b'
 */
type Paths<T, D extends number = 10> = [D] extends [never]
  ? never
  : T extends object
  ? {
      [K in keyof T]-?: K extends string | number
        ? `${K}` | Join<K, Paths<T[K]>>
        : never;
    }[keyof T]
  : '';

/**
 * TranslationKeys type
 *
 * A type that represents all the possible keys that can be used for translations.
 * It is based on the structure of the `en` object.
 *
 * @example
 * const key: TranslationKeys = 'general.welcome';  // Valid
 * const invalidKey: TranslationKeys = 'general.nonExistent';  // Error
 */
export type TranslationKeys = Paths<typeof en>;

/**
 * Translations<T> type
 *
 * A generic type that takes an object T and returns a new object type.
 * This new type has the same structure as T, but ensures that all leaf nodes are strings.
 *
 * @template T - The object type to transform.
 *
 * @example
 * type Test = Translations<{ a: { b: string } }>;  // Result: { a: { b: string } }
 */
export type Translations<T = typeof en> = {
  [K in keyof T]: T[K] extends object ? Translations<T[K]> : string;
};
