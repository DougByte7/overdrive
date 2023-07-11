type LabelValue<T> = { label: string; value: T }

type TypeFixMe = any

type AnyFunction<T = any> = (...args: any[]) => T
