export class FilterUtils {
  public static readonly AllValue: string = 'all';

  public static getFilterValue<T>(value: any): T | undefined {
    if (value === FilterUtils.AllValue) {
      return undefined;
    }

    return value as T;
  }
}
