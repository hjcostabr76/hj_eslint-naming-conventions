
/**
 * TODO: Add desc
 */

export type CustomRegexTP = { regex: string, match: boolean }

export type UnderscoreTP = 'forbid' | 'allow' | 'require'
export type TypeTP = 'boolean' | 'string' | 'number' | 'function' | 'array'
export type ModifierTP = 'public' | 'protected' | 'private' | 'readonly' | 'static' | 'abstract'
export type FormatTP = 'camelCase' | 'strictCamelCase' | 'PascalCase' | 'StrictPascalCase' | 'snake_case' | 'UPPER_CASE'

// Seletor
export type SelectorTP = SelectorVarLikeTP | SelectorMemberLikeTP | SelectorTypeLikeTP | 'enum'

type SelectorVarLikeTP = 'variable' | 'function' | 'parameter'
type SelectorTypeLikeTP = 'class' | 'interface' | 'typeAlias' | 'enum' | 'typeParameter'
type SelectorMemberLikeTP = 'property' | 'parameterProperty' | 'method' | 'accessor' | 'enumMember'
