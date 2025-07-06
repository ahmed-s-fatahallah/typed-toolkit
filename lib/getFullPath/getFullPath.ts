import type {
  DynamicParams,
  ExtractDynamicSegments,
  ParamsAsObject,
  ReturnedPath,
  ValidPath
} from "./../types/getFullPath";

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
