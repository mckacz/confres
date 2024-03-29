/**
 * Type of value the configuration entry supports.
 */
export enum DefinitionEntryType {
  Mixed = 'mixed',
  String = 'string',
  Number = 'number',
  Boolean = 'boolean',
}

/**
 * Definition of a single configuration entry.
 */
export interface DefinitionEntry {
  /**
   * Configuration entry path.
   */
  path: string[]

  /**
   * Value type.
   */
  type?: DefinitionEntryType

  /**
   * Flag is the value is required.
   */
  required?: boolean

  /**
   * Flag if the value is an array.
   */
  array?: boolean

  /**
   * Description of the configuration entry.
   */
  description?: string

  /**
   * Default value.
   */
  defaultValue?: unknown
}

/**
 * List of definitions of configuration options.
 */
export type Definitions = DefinitionEntry[]
