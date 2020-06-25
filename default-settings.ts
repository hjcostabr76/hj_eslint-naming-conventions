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
        'add',
        'bond',
        'check',
        'delete',
        'enable',
        'find',
        'get',
        'grant',
        'handle',
        'is',
        'parse',
        'remove',
        'run',
        'save',
        'search',
        'send',
        'set',
        'update',
        'verify',
        'warn',
    ],
}