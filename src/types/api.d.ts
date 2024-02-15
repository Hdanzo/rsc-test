import type { ZodIssue } from "zod";

declare global {
  interface State {
    errors?: {
      name?: ErrorMessageObject;
    };
    message?: null | string;
  }

  interface ErrorMessageObject {
    type: ZodIssue["code"];
    message: string;
  }
}
