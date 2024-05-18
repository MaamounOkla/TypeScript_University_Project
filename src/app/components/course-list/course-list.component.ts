import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CourseService } from '../../services/course.service';
import { Course } from '../../model/course';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [FormsModule, ButtonModule, CommonModule, HttpClientModule, PaginatorModule, TableModule],
  templateUrl: './course-list.component.html',
  styleUrls: [
    "../../../../node_modules/primeng/resources/themes/lara-light-teal/theme.css",
    "../../../../node_modules/primeng/resources/primeng.min.css",
    "../../../../node_modules/primeicons/primeicons.css",
    './course-list.component.scss']
})
export class CourseListComponent implements OnInit {
  courseList: Course[] = [];

  constructor(private courseService: CourseService) {}

  ngOnInit() {
    // Fetch courses and add them to course list on initialize.
    this.courseService.getCourses().subscribe((data) => {
      this.courseList = data;
    });
  }
}
