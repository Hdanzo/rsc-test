import type { ZodError } from "zod";

export const formatError = (error: ZodError) =>
  Object.entries(
    error.flatten(({ code, message }) => ({ type: code, message })).fieldErrors
  ).reduce((accumulator, currentValue) => {
    if (!currentValue[1]?.[0]) return accumulator;

    return { ...accumulator, [currentValue[0]]: currentValue[1]![0] };
  }, {});
