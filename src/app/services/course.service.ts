import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../model/course';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  //fetch url for courses.json
  private url: string =
    'https://matdah.github.io/DT208G---Programmering-i-TypeScript/Moment%205%20-%20Projekt/miun_courses.json';
  //Course list to add new course
  private courseList: Course[] = [];

  constructor(private http: HttpClient) {}

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.url);
  }

  setCourseList(courseList: Course[]) {
    this.courseList = courseList;
  }

  addCourseToRamSchema(courseCode: string) {
    const course = this.courseList.find(
      (course) => course.courseCode === courseCode
    );
    if (course) {
      console.log(
        `Adding course to ram schema: ${course.courseCode} - ${course.courseName}`
      );
       
    }
  }
}
