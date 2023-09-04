import { HttpErrorResponse } from '@angular/common/http';

export class HttpUtils {
  public static getErrorMessage(error: HttpErrorResponse): string {
    return error.error?.errors?.[0]?.message || 'Unknown error';
  }
}
