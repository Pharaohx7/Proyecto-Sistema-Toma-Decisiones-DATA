export module validation {

  export function isNotNullEmptyUndefinedSpace(variable: any): boolean {
    if (variable == null ||
      variable === '' ||
      variable === undefined ||
      variable === ' ') {
      return false;
    }
    return true;
  }
}
