// Similar to Partial, but make some fields required
export type PartialWithRequired<T, P extends keyof T> = Partial<T> & Pick<T, P>;
