import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { TasksComponent } from './tasks.component';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { AddTaskComponent } from './add-task/add-task.component';

@NgModule({
  declarations: [TasksComponent, AddTaskComponent],
  imports: [
    CommonModule,
    TasksRoutingModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
  ],
})
export class TasksModule {}
