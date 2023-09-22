export class ArrayUtils {
  public static toArray<T>(value: T | T[] | undefined): T[] {
    if (!!value) {
      return Array.isArray(value)
        ? value
        : [value];
    }

    return [];
  }
}
