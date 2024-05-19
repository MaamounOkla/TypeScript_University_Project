import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CourseService } from '../../services/course.service';
import { Course } from '../../model/course';
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
  selector: 'app-course-list',
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
  templateUrl: './course-list.component.html',
  styleUrls: [
    '../../../../node_modules/primeng/resources/themes/lara-light-teal/theme.css',
    '../../../../node_modules/primeng/resources/primeng.min.css',
    '../../../../node_modules/primeicons/primeicons.css',
    './course-list.component.scss',
  ],
})
export class CourseListComponent implements OnInit {
  courseList: Course[] = [];
  selectedCourses: { [courseCode: string]: boolean } = {};
  searchValue: string | undefined;
  subjectOptions: string[] = [];
  selectedSubject: string | null = null; // Add selectedSubject property
  @ViewChild('dataTable') dataTable!: ElementRef;

  constructor(private courseService: CourseService) {}

  ngOnInit() {
    // Fetch courses and add them to course list on initialize.
    this.courseService.getCourses().subscribe((data) => {
      this.courseList = data;
      this.subjectOptions = Array.from(
        new Set(this.courseList.map((course) => course.subject))
      );
    });
  }

  //Add course to ramschema
  selectCourse(courseCode: string) {
    this.selectedCourses[courseCode] = !this.selectedCourses[courseCode];
        // Save the selected courses to local storage
        localStorage.setItem('selectedCourses', JSON.stringify(this.selectedCourses));
        //Send the new method to add new course to ramschema with help of course service. 
        this.courseService.addCourseToRamSchema(courseCode);
  }

  isCourseSelected(courseCode: string): boolean {
    return !!this.selectedCourses[courseCode];
  }

  filterGlobal(event: Event, contains: string) {}


  filterBySubject(selectedSubject: string |null ) {
    if (selectedSubject) {
      // Filter the course list based on the selected subject
      const filteredCourses = this.courseList.filter(course => course.subject === selectedSubject);
      // Assign the filtered courses to the table
      this.courseList = filteredCourses;
      // Clear the selected subject
      this.selectedSubject = null;
    } else {
      // If no subject is selected, reset the course list to show all courses
      this.courseService.getCourses().subscribe((data) => {
        this.courseList = data;
      });
    }
  }
}
