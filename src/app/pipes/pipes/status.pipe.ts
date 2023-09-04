import { Pipe, PipeTransform } from '@angular/core';

import { Status } from '@app/models';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {

  transform(value: Status): string | undefined {
    switch (value) {
      case Status.Active:
        return 'Active';

      case Status.Inactive:
        return 'Inactive';

      default:
        return;
    }
  }

}
