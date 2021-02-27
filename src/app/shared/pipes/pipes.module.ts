import { NgModule } from '@angular/core';
import { ExperienceClassPipe } from './experience-class.pipe';

@NgModule({
  declarations: [ExperienceClassPipe],
  exports: [ExperienceClassPipe],
})
export class PipesModule {}
