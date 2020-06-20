import { GeneralSettingsTP } from './types'

export const DEFAULT_SETTINGS: Required<GeneralSettingsTP> = {
    
    classSuffixes: [],
    
    enumSuffixes: ['Enum'],
    interfacePrefixes: ['I'],
    typeSuffixes: ['TP'],
    typeSuffixesGenerics: ['GTP'],
    
    arraySuffixesUC: ['S', 'ARRAY', 'LIST'],
    arraySuffixesLC: ['s', 'array', 'Array', 'List'],
    booleanPrefixesUC: ['IS', 'ENABLE', 'REQUIRE', 'FORCE', 'DONT'],
    booleanPrefixesLC: ['is', 'are', 'should', 'must', 'can', 'have', 'has', 'did', 'dont', 'will', 'enable', 'require', 'force'],

    functionPrefixes: [

        'get',
        'set',

        'add',
        'save',
        'update',
        'find',
        'search',
        'delete',
        'remove',

        'check',
        'verify',

        'is',
        'enable',
        'grant',

        'bond',
        'handle',
        'parse'
    ],
}