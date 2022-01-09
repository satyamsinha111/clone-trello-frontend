import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateTaskComponent } from './create-task/create-task.component';
import { CreateProjectComponent } from './create-project/create-project.component';

const customComponents = [CreateTaskComponent, CreateProjectComponent];

@NgModule({
  declarations: [customComponents],
  imports: [CommonModule],
  exports: [customComponents],
})
export class ComponentsModule {}
