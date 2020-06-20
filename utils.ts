import { SettingsTP, ConfigTP, GeneralSettingsTP, VarsTP, GeneralForRegexTP, GeneralForArrayTP } from "./types"
import { DEFAULT_SETTINGS } from "./default-settings"

/** Gera & retorna configuracao da regra. */
export function getConfigs(settings?: Partial<SettingsTP>): ConfigTP[] {    // eslint-disable-line max-lines-per-function

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
            custom: vars.booleanPrefixes
                ? { match: true, regex: `^[${vars.booleanPrefixes}]` }
                : undefined
        },
        {
            selector: 'variable',
            types: ['array'],
            format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
            custom: vars.arraySuffixes
                ? { match: true, regex: `[${vars.arraySuffixes}]$` }
                : undefined
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
            leadingUnderscore: 'allow',
            custom: vars.booleanPrefixesLC
                ? { match: true, regex: `^[${vars.booleanPrefixesLC}]` }
                : undefined
        },
        {
            selector: 'parameter',
            types: ['array'],
            format: ['camelCase'],
            leadingUnderscore: 'allow',
            custom: vars.arraySuffixesLC
                ? { match: true, regex: `[${vars.arraySuffixesLC}]$` }
                : undefined
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
            leadingUnderscore: 'forbid',
            custom: vars.arraySuffixesLC
                ? { match: true, regex: `[${vars.arraySuffixesLC}]$` }
                : undefined,
        },
        {   // ?? :boolean
            selector: 'property',
            types: ['boolean'],
            format: ['camelCase'],
            leadingUnderscore: 'forbid',
            custom: vars.booleanPrefixesLC
                ? { match: true, regex: `^[${vars.booleanPrefixesLC}]` }
                : undefined,
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
            leadingUnderscore: 'forbid',
            custom: vars.arraySuffixes
                ? { match: true, regex: `[${vars.arraySuffixes}]$` }
                : undefined,
        },
        {   // ?? static readonly :boolean
            selector: 'property',
            types: ['boolean'],
            modifiers: ['readonly'],
            format: ['camelCase', 'UPPER_CASE'],
            leadingUnderscore: 'forbid',
            custom: vars.booleanPrefixes
                ? { match: true, regex: `^[${vars.booleanPrefixes}]` }
                : undefined,
        },

        // metodo
        {
            selector: 'method',
            format: ['camelCase'],
            custom: vars.functionPrefixes
                ? { match: true, regex: `^[${vars.functionPrefixes}]` }
                : undefined,
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

/** Processa & retorna variaveis utilizadas na configuracao da regra. */
function getVars(generalSettings?: GeneralSettingsTP): VarsTP {

    const getValueForArrayList = (key: keyof GeneralForArrayTP): string[] => (generalSettings?.[key] ?? DEFAULT_SETTINGS[key])

    const getValueForRegexList = (key: keyof GeneralForRegexTP): string | undefined => {
        const list = generalSettings?.[key] ?? DEFAULT_SETTINGS[key]
        if (list.length)
            return `${list.join('|')}`
    }

    const booleanPrefixesLC = getValueForRegexList('booleanPrefixesLC')
    const booleanPrefixesUC = getValueForRegexList('booleanPrefixesUC')
    
    let booleanPrefixes = booleanPrefixesLC
    if (booleanPrefixesUC)
        booleanPrefixes = booleanPrefixes ? `${booleanPrefixes}|${booleanPrefixesUC}` : booleanPrefixesUC
    
    const arraySuffixesLC = getValueForRegexList('arraySuffixesLC')
    const arraySuffixesUC = getValueForRegexList('arraySuffixesUC')

    let arraySuffixes = arraySuffixesLC
    if (arraySuffixesUC)
        arraySuffixes = arraySuffixes ? `${arraySuffixes}|${arraySuffixesUC}` : arraySuffixesUC

    return {
        
        interfacePrefixes: getValueForArrayList('interfacePrefixes'),
        
        enumSuffixes: getValueForArrayList('interfacePrefixes'),
        typeSuffixes: getValueForArrayList('typeSuffixes'),
        classSuffixes: getValueForArrayList('classSuffixes'),
        typeSuffixesGenerics: getValueForArrayList('typeSuffixesGenerics'),
        
        functionPrefixes: getValueForRegexList('functionPrefixes'),

        booleanPrefixesLC,
        booleanPrefixesUC,
        booleanPrefixes,

        arraySuffixesLC,
        arraySuffixesUC,
        arraySuffixes,
    }
}