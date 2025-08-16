// Check if the route format is valid
type ValidateDynamicPath<TPath extends string> =
  TPath extends `${infer F}/${infer R}`
    ? R extends `/${string}`
      ? never
      : F extends `:${string}`
        ? `${F}/${ValidateDynamicPath<R>}`
        : `${F}/${ValidateDynamicPath<R>}`
    : TPath;

// Replace path dynamic slugs with their respective values
type ReturnedPathWithParams<
  TPath extends string,
  TParams extends string[]
> = TPath extends `${infer First}/${infer Rest}`
  ? First extends `:${string}`
    ? TParams extends [
        infer FirstParam extends string,
        ...infer RestParams extends string[]
      ]
      ? ReturnedPathWithParams<`${FirstParam}/${Rest}`, RestParams>
      : never
    : `${First}/${ReturnedPathWithParams<Rest, TParams>}`
  : TParams extends [infer LastParam extends string]
    ? LastParam
    : never;

// Returned Path when the parameters are in object
type ReturnedPathWithObjParams<
  TPath extends string,
  TParams extends [Record<ExtractDynamicSegments<TPath>[number], string>]
> = TPath extends `${infer First}/${infer Rest}`
  ? First extends `:${infer ParamName}`
    ? ReturnedPathWithObjParams<`${TParams[0][ParamName]}/${Rest}`, TParams>
    : `${First}/${ReturnedPathWithObjParams<Rest, TParams>}`
  : TPath extends `:${infer LastParam}`
    ? `${TParams[0][LastParam]}`
    : never;

// extract dynamic slugs from the path

// Make sure that the provided route params match the number of dynamic slugs
type ValidateDynamicParams<
  TPath extends string,
  TParams extends string[] | [Record<string, string>]
> = TParams extends string[]
  ? TParams["length"] extends ExtractDynamicSegments<TPath>["length"]
    ? TParams
    : never
  : never;

export type ExtractDynamicSegments<
  TPath extends string,
  TSlugs extends string[] = []
> = TPath extends `${infer F}/${infer R}`
  ? F extends `:${infer TSlugName}`
    ? ExtractDynamicSegments<R, [...TSlugs, TSlugName]>
    : ExtractDynamicSegments<R, [...TSlugs]>
  : TPath extends `:${infer TSlugName}`
    ? [...TSlugs, TSlugName]
    : TSlugs;

// Check if the provided route matched the correct format
export type ValidPath<TPath extends string> =
  TPath extends ValidateDynamicPath<TPath> ? TPath : never;

// Type params when provided as an object
export type ParamsAsObject<
  TPath extends string,
  TParams extends
    | [Record<ExtractDynamicSegments<TPath>[number], string>]
    | string[]
> = TParams extends [Record<ExtractDynamicSegments<TPath>[number], string>]
  ? [
      {
        [K in ExtractDynamicSegments<TPath>[number]]: TParams[0][K];
      }
    ]
  : never;

// Check if the provided params are valid
export type DynamicParams<
  TPath extends string,
  TParams extends string[] | [Record<string, string>]
> = TParams extends string[]
  ? TParams extends ValidateDynamicParams<TPath, TParams>
    ? TParams
    : ExtractDynamicSegments<TPath>
  : never;

// Final returned value
export type ReturnedPath<
  TPath extends string,
  TParams extends
    | string[]
    | [Record<ExtractDynamicSegments<TPath>[number], string>]
> = TParams extends string[]
  ? ReturnedPathWithParams<TPath, TParams>
  : TParams extends [Record<ExtractDynamicSegments<TPath>[number], string>]
    ? ReturnedPathWithObjParams<TPath, TParams>
    : never;
