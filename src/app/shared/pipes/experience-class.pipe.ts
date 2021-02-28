import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'experienceClass',
})
export class ExperienceClassPipe implements PipeTransform {
  transform(value: string): string {
    if (value) {
      const valueLower = value.toLowerCase();
      if (['experienced', 'advanced', 'senior', 'expert'].find((item) => item === valueLower)) {
        return value.toLowerCase();
      }
    }
    return '';
  }
}
