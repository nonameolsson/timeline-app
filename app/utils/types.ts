export type FlowReturn<TNext, TReturn = void> = Generator<Promise<TNext>, TReturn, TNext>
