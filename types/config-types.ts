import { ModifierTP, TypeTP, FormatTP, CustomRegexTP, UnderscoreTP, SelectorTP } from "./config-param-types"

type OrUndefinedTP<GTP> = GTP | undefined

/**
 * TODO: Add desc
 */
export type ConfigTP<ModifierGTP extends OrUndefinedTP<ModifierTP> = ModifierTP, TypeGTP extends OrUndefinedTP<TypeTP> = TypeTP> = {
    
    selector?: SelectorTP | 'default',
    modifiers?: ModifierGTP[],
    types?: TypeGTP[],

    format?: FormatTP[],
    custom?: CustomRegexTP,
    prefix?: string[],
    suffix?: string[],

    leadingUnderscore?: UnderscoreTP,
    trailingUnderscore?: UnderscoreTP,
    // filter?: any,   // NOTE: Existe mas nao vamos utilzar
}

// Config [variable like]
type VarLikeConfigTP<TypeGTP extends OrUndefinedTP<TypeTP> = TypeTP> = ConfigTP<undefined, TypeGTP>

type VariableConfigTP = VarLikeConfigTP
type ParameterConfigTP = VarLikeConfigTP
type FunctionConfigTP = VarLikeConfigTP<undefined>

// Config [member like]
type MemberLikeConfigTP<ModifierGTP extends OrUndefinedTP<ModifierTP> = ModifierTP, TypeGTP extends OrUndefinedTP<TypeTP> = TypeTP> = ConfigTP<ModifierGTP, TypeGTP>

type PropertyConfigTP = MemberLikeConfigTP
type AccessorConfigTP = MemberLikeConfigTP
type ParamPropConfigTP = MemberLikeConfigTP<Exclude<ModifierTP, 'abstract' | 'static'>>
type MethodConfigTP = MemberLikeConfigTP<ModifierTP, undefined>
type EnumMemberConfigTP = MemberLikeConfigTP<undefined, undefined>

// Config [type like]
type TypeLikeConfigTP<ModifierGTP extends OrUndefinedTP<ModifierTP> = undefined> = ConfigTP<ModifierGTP, undefined>

type ClassConfigTP = TypeLikeConfigTP<'abstract'>
type InterfaceConfigTP = TypeLikeConfigTP
type TypeAliasConfigTP = TypeLikeConfigTP
type TypeParamConfigTP = TypeLikeConfigTP
type EnumConfigTP = TypeLikeConfigTP
