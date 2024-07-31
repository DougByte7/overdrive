type LabelValue<T> = { label: string; value: T };

type TypeFixMe = any;
type Nil = null | undefined;

type AnyFunction<T = any> = (...args: any[]) => T;
