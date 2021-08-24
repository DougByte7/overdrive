export function newArray<T>(
  length: number,
  mapFn: (element: never, index: any) => T = (_, i) => i
): T[] {
  return Array.from({ length }, mapFn)
}

//TODO create tests
export function isBlank(value: any[] | Record<any, any>) {
  return !!value
    ? Array.isArray(value)
      ? !(value as any[]).length
      : typeof value === "object" && !Object.keys(value).length
    : true
}
