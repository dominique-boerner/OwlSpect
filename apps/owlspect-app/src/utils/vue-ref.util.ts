import type { Ref } from "vue";
import { StateIsNullOrUndefinedException } from "@/errors/StateIsNullOrUndefinedException";

/**
 * Checks, if a ref value is null or undefined.
 * @param ref {Ref} the ref to check
 * @throws {StateIsNullOrUndefinedException} if ref is null or undefined
 */
export const isNullOrUndefined = (ref: Ref): boolean => {
  if (!ref || !ref.value) {
    throw new StateIsNullOrUndefinedException();
  }
  return false;
};
