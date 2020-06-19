import { ConfigTP } from 'types/config-types'
import { SettingsTP, GeneralSettingsTP, VarsTP } from 'types/settings-type'

/**
 * ESLINT - Gerador de configuracao para regra '@typescript-eslint/naming-convention':
 * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/naming-convention.md#enforces-naming-conventions-for-everything-across-a-codebase-naming-convention
 */
export function eslintNamingConventions(settings?: SettingsTP): ConfigTP[] {

    const vars = getVars(settings?.general)
    
    return [
        
        // global
        {
            selector: 'default',
            format: ['camelCase', 'UPPER_CASE'],
            trailingUnderscore: 'forbid',
        },

        // variavel
        {
            selector: 'variable',
            format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
            leadingUnderscore: 'allow',
        },
        {
            selector: 'variable',
            types: ['boolean'],
            format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
            custom: {
                regex: `^[${vars.booleanPrefixes}]`,
                match: true
            }
        },
        {
            selector: 'variable',
            types: ['array'],
            format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
            custom: {
                regex: `[${vars.arraySuffixes}]$`,
                match: true,
            }
        },

        // funcao
        {
            selector: 'function',
            format: ['camelCase'],
        },

        // parametro
        {
            selector: 'parameter',
            format: ['camelCase'],
            leadingUnderscore: 'allow',
        },
        {
            selector: 'parameter',
            types: ['boolean'],
            format: ['camelCase'],
            custom: {
                regex: `^[${vars.booleanPrefixesLC}]`,
                match: true
            },
            leadingUnderscore: 'allow',
        },
        {
            selector: 'parameter',
            types: ['array'],
            format: ['camelCase'],
            custom: {
                regex: `[${vars.arraySuffixesLC}]$`,
                match: true
            },
            leadingUnderscore: 'allow',
        },

        // propriedade

        {   // ?? :??
            selector: 'property',
            format: ['camelCase'],
            leadingUnderscore: 'forbid',
        },

        {   // ?? :(string|number|function)
            selector: 'property',
            types: ['string', 'number', 'function'],
            format: ['camelCase'],
            leadingUnderscore: 'forbid',
        },
        {   // ?? :array
            selector: 'property',
            types: ['array'],
            format: ['camelCase'],
            custom: {
                regex: `[${vars.arraySuffixesLC}]$`,
                match: true
            },
            leadingUnderscore: 'forbid',
        },
        {   // ?? :boolean
            selector: 'property',
            types: ['boolean'],
            format: ['camelCase'],
            custom: {
                regex: `^[${vars.booleanPrefixesLC}]`,
                match: true
            },
            leadingUnderscore: 'forbid',
        },

        {   // ?? static readonly :??
            selector: 'property',
            modifiers: ['readonly'],
            format: ['camelCase', 'UPPER_CASE'],
            leadingUnderscore: 'forbid',
        },

        {   // ?? static readonly :(string|number|function)
            selector: 'property',
            types: ['string', 'number', 'function'],
            modifiers: ['readonly'],
            format: ['camelCase', 'UPPER_CASE'],
            leadingUnderscore: 'forbid',
        },
        {   // ?? static readonly :array
            selector: 'property',
            types: ['array'],
            modifiers: ['readonly'],
            format: ['camelCase', 'UPPER_CASE'],
            custom: {
                regex: `[${vars.arraySuffixes}]$`,
                match: true
            },
            leadingUnderscore: 'forbid',
        },
        {   // ?? static readonly :boolean
            selector: 'property',
            types: ['boolean'],
            modifiers: ['readonly'],
            format: ['camelCase', 'UPPER_CASE'],
            custom: {
                regex: `^[${vars.booleanPrefixes}]`,
                match: true
            },
            leadingUnderscore: 'forbid',
        },

        // metodo
        {
            selector: 'method',
            format: ['camelCase'],
            custom: {
                regex: `^[${vars.functionPrefixes}]`,
                match: true
            },
        },

        // enum
        {
            selector: 'enum',
            format: ['PascalCase'],
            // suffix: vars.enumSuffixes,
        },
        {
            selector: 'enumMember',
            format: ['UPPER_CASE']
        },

        // classe
        {
            selector: 'class',
            format: ['PascalCase'],
            suffix: vars.classSuffixes,
        },

        // interface
        {
            selector: 'interface',
            format: ['PascalCase'],
            // prefix: vars.interfacePrefixes,
        },

        // type
        {
            selector: 'typeAlias',
            format: ['PascalCase'],
            suffix: vars.typeSuffixesGenerics,
            leadingUnderscore: 'forbid'
        },
        {
            selector: 'typeParameter',
            format: ['PascalCase'],
            suffix: vars.typeSuffixes,
            leadingUnderscore: 'forbid'
        },

        // custom
        ...(settings?.specific ?? [])
    ]
}

function getVars(generalSettings?: GeneralSettingsTP): VarsTP {

    const parseStringList = (list: readonly string[]): string => `'${list.join('|')},'`

    const booleanPrefixesLC = parseStringList(generalSettings?.booleanPrefixesLC ?? [])
    const booleanPrefixesUC = parseStringList(generalSettings?.booleanPrefixesUC ?? [])
    const arraySuffixesLC = parseStringList(generalSettings?.arraySuffixesLC ?? [])
    const arraySuffixesUC = parseStringList(generalSettings?.arraySuffixesUC ?? [])

    return {

        typeSuffixes: generalSettings?.typeSuffixes ?? [],
        classSuffixes: generalSettings?.classSuffixes ?? [],
        typeSuffixesGenerics: generalSettings?.typeSuffixesGenerics ?? [],

        functionPrefixes: parseStringList(generalSettings?.functionPrefixes ?? []),

        booleanPrefixesLC,
        booleanPrefixesUC,
        arraySuffixesLC,
        arraySuffixesUC,

        booleanPrefixes: `${booleanPrefixesLC}|${booleanPrefixesUC}`,
        arraySuffixes: `${arraySuffixesLC}|${arraySuffixesUC}`,
    }
}

// const DEFAULT_SETTINGS: GeneralSettingsTP = {
//     typeSuffixes: ['TP'],
//     // enumSuffixes: ['Enum'],
//     // interfacePrefixes: ['I'],
//     typeSuffixesGenerics: ['GTP'],
//     arraySuffixesUC: ['S', 'ARRAY', 'LIST'],
//     arraySuffixesLC: ['s', 'array', 'Array', 'List'],
//     booleanPrefixesUC: ['IS', 'ENABLE', 'REQUIRE', 'FORCE', 'DONT'],
//     booleanPrefixesLC: ['is', 'should', 'must', 'can', 'have', 'has', 'did', 'dont', 'will', 'enable', 'require', 'force'],
// }