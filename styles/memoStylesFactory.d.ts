export function memoStylesFactory<T extends object>(stylesFactory: (theme:object) => T): (theme) => T
