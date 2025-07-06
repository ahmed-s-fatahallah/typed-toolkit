import type {
  DynamicParams,
  ExtractDynamicSegments,
  ParamsAsObject,
  ReturnedPath,
  ValidPath
} from "./../types/getFullPath";

/**
 * Replace dynamic path segments with their respective values.
 *
 * @example
 * getFullPath("/:foo/:bar", { foo: "hello", bar: "world" });
 * // "/hello/world"
 *
 * @example
 * getFullPath("/:foo/:bar", "hello", "world");
 * // "/hello/world"
 *
 * @example
 * getFullPath("/:foo/:bar", { foo: "hello" });
 * // throws an error, because :bar is not provided
 *
 * @example
 * getFullPath("/:foo/:bar", "hello");
 * // throws an error, because :bar is not provided
 *
 * @param path - a string path with dynamic segments
 * @param params - either an object with the dynamic segments as keys, or an array of strings
 * @returns a string with the dynamic segments replaced
 */
export const getFullPath = <
  TPath extends string,
  TParams extends
    | [Record<ExtractDynamicSegments<TPath>[number], string>]
    | string[]
>(
  path: ValidPath<TPath>,
  ...params: ParamsAsObject<TPath, TParams> | DynamicParams<TPath, TParams>
): ReturnedPath<TPath, TParams> => {
  let index = 0;

  return path.replace(/:\w*/g, (match) => {
    const currentIndex = index++;

    if (
      params.length === 1 &&
      params[0] !== null &&
      typeof params[0] === "object"
    ) {
      return params[0][match.slice(1) as ExtractDynamicSegments<TPath>[number]];
    }

    return typeof params[currentIndex] === "string"
      ? params[currentIndex]
      : match;
  }) as ReturnedPath<TPath, TParams>;
};
