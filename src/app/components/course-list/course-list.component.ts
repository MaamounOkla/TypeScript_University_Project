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
import { RouterLink, RouterLinkActive } from '@angular/router';
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
    InputTextModule,RouterLink, RouterLinkActive,
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
  
  selectedSubject: string | null = null; 
  @ViewChild('dataTable') dataTable!: ElementRef;

  constructor(private courseService: CourseService) {}

  ngOnInit() {
    // Hämta kurser och lägg till dem i kurslistan vid initialisering.
    this.courseService.getCourses().subscribe((data) => {
      this.courseList = data;
      this.subjectOptions = Array.from(
        new Set(this.courseList.map((course) => course.subject))
      );
    });
  }

  // Lägg till kurs i Ramschema
  selectCourse(courseCode: string) {
    // Växla knappen för kurser
    this.selectedCourses[courseCode] = !this.selectedCourses[courseCode];
    
    // Spara de valda kurserna i localstroage
    const localStorageCourses = JSON.parse(localStorage.getItem('selectedCourses') || '{}');
    localStorageCourses[courseCode] = this.selectedCourses[courseCode];
    localStorage.setItem('selectedCourses', JSON.stringify(localStorageCourses));
  
    // Skicka metoden för att lägga till ny kurs i ramschema med hjälp av course-service
    this.courseService.addCourseToRamSchema(courseCode);
    console.log("Detta är koden", courseCode);
  }

  isCourseSelected(courseCode: string): boolean {
    return !!this.selectedCourses[courseCode];
  }

  filterGlobal(event: Event, contains: string) {}


  filterBySubject(selectedSubject: string |null ) {
    if (selectedSubject) {
      // Filtrera kurslistan baserat på det valda ämnet
      const filteredCourses = this.courseList.filter(course => course.subject === selectedSubject);
      // Tilldela de filtrerade kurserna till tabellen
      this.courseList = filteredCourses;
      // Rensa det valda ämnet
      this.selectedSubject = null;
    } else {
      // Om inget ämne är valt, återställ kurslistan för att visa alla kurser
      this.courseService.getCourses().subscribe((data) => {
        this.courseList = data;
      });
    }
  }
}
