import { ConfigTP } from "./config-types"

/**
 * TODO: Add desc
 */

export type SettingsTP = {
    general?: GeneralSettingsTP,
    specific?: ConfigTP[],
}

export type VarsTP = Required<
    & GeneralForArrayTP
    & Record<keyof GeneralForRegexTP, string>
    & { arraySuffixes: string, booleanPrefixes: string }
>

export type GeneralSettingsTP = Record<keyof GeneralForRegexTP | keyof GeneralForArrayTP, string[]>

type GeneralForRegexTP = {
    functionPrefixes?: string[],
    booleanPrefixesLC?: string[],
    booleanPrefixesUC?: string[],
    arraySuffixesLC?: string[],
    arraySuffixesUC?: string[],
}

type GeneralForArrayTP = {
    // interfacePrefixes?: string[],
    // enumSuffixes?: string[],
    classSuffixes?: string[],
    typeSuffixes?: string[],
    typeSuffixesGenerics?: string[],
}
