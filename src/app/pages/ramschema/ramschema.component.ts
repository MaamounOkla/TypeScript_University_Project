import { Component, OnInit } from '@angular/core';
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
  selector: 'app-ramschema',
  standalone: true,
  imports:[
    FormsModule,
    TagModule,
    DropdownModule,
    MultiSelectModule,
    InputGroupModule,RouterLink, RouterLinkActive,
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
  styleUrls: [
    '../../../../node_modules/primeng/resources/themes/lara-light-teal/theme.css',
    '../../../../node_modules/primeng/resources/primeng.min.css',
    '../../../../node_modules/primeicons/primeicons.css',
    './ramschema.component.scss',
  ],
})
export class RamschemaComponent implements OnInit {
  courseList: Course[] = [];
  selectedCourseList: Course[] = [];
  totalPoints: number = 0;
  numberOfSelectedCourses : number =0;
  constructor(private courseService: CourseService) {}

  ngOnInit() {
    this.courseService.getCourses().subscribe((data) => {
      this.courseList = data;
      console.log(this.courseList);
      
      // Hämta valda kurskoder från lokal lagring
      const selectedCourseCodes = JSON.parse(localStorage.getItem('selectedCourses') || '{}');
      console.log(selectedCourseCodes);
      // Filtrera courseList baserat på valda kurskoder
      this.selectedCourseList = this.courseList.filter(course => selectedCourseCodes[course.courseCode]);

         // Beräkna totala poäng
         this.totalPoints = this.calculateTotalPoints();
           // Räkna antal valda kurser
           this.numberOfSelectedCourses = this.NumberOfSelectedCourses();
    });
  }
  calculateTotalPoints(): number {
    return this.selectedCourseList.reduce((total, course) => total + course.points, 0);
  }

  NumberOfSelectedCourses(): number {
    return this.selectedCourseList.length;
  }
  removeCourse(courseCode: string) {
    // Ta bort kursen från lokal lagring
    const selectedCourseCodes = JSON.parse(localStorage.getItem('selectedCourses') || '{}');
    delete selectedCourseCodes[courseCode];
    
    // Spara uppdaterade valda kurskoder till lokal lagring
    localStorage.setItem('selectedCourses', JSON.stringify(selectedCourseCodes));
    
    // Ta bort kursen från den valda kurslistan i komponenten
    this.selectedCourseList = this.selectedCourseList.filter(course => course.courseCode !== courseCode);
    
    // Beräkna totala poäng och antal valda kurser på nytt
    this.totalPoints = this.calculateTotalPoints();
    this.numberOfSelectedCourses = this.NumberOfSelectedCourses();
    
    // Skicka metoden för att ta bort kursen från RAM-schema med hjälp av kurs-tjänsten
    this.courseService.removeCourseFromRamSchema(courseCode);
    
    console.log(`Kurs med kod ${courseCode} borttagen från lokal lagring.`);
  }
}
