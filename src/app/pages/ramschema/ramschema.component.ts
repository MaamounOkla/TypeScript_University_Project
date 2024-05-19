import { Component } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { Course } from '../../model/course';
 
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
 
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';

@Component({
  selector: 'app-ramschema',
  standalone: true,
  imports: [
    FormsModule,
    TagModule,
    DropdownModule,
    MultiSelectModule,
    InputGroupModule,
    InputGroupAddonModule,
    ButtonModule,
    InputTextModule,
    CommonModule,
    HttpClientModule,
    PaginatorModule,
    TableModule,
    IconFieldModule,
    InputIconModule,
    FloatLabelModule
  ],
  templateUrl: './ramschema.component.html',
  styleUrl: './ramschema.component.scss'
})
export class RamschemaComponent {
  
  
 courseList : Course[] = []
 constructor(private courseService : CourseService){}
  addCourseToRamSchema(courseCode : string)  {
    this.courseList.map((course) =>  {
      if (course.courseCode === courseCode) {
        console.log(`Adding course to ram schema: ${course.courseCode} - ${course.courseName}`);

      }
    })
  }
}
