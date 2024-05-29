import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Course } from '../model/course';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private url: string = 'https://matdah.github.io/DT208G---Programmering-i-TypeScript/Moment%205%20-%20Projekt/miun_courses.json';
  private courseList: Course[] = [];
  private selectedCoursesSubject = new BehaviorSubject<Course[]>([]);
  selectedCourses$ = this.selectedCoursesSubject.asObservable();

  constructor(private http: HttpClient) {}

  // Hämta kurser från JSON-fil via HTTP
  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.url).pipe(
       // Fyll courseList när data hämtas
      tap(courses => this.courseList = courses)
    );
  }

  // skapa kurslistan
  setCourseList(courseList: Course[]) {
    this.courseList = courseList;
  }

  // Hämta kurslistan
  getCourseList(): Course[] {
    return this.courseList;
  }

  // Kontrollera om kursen redan är vald
  isCourseAlreadySelected(courseCode: string): boolean {
    return this.selectedCoursesSubject.getValue().some(course => course.courseCode === courseCode);
  }

  // Lägg till kurs i ramschema
  addCourseToRamSchema(courseCode: string) {
    if (this.isCourseAlreadySelected(courseCode)) {
      console.log(`Kursen med kod ${courseCode} är redan vald.`);
      return;
    }

    const course = this.courseList.find(course => course.courseCode === courseCode);
    if (course) {
      const currentSelectedCourses = this.selectedCoursesSubject.getValue();
      this.selectedCoursesSubject.next([...currentSelectedCourses, course]);
      console.log(`Lägger till kurs i RAM-schema: ${course.courseCode} - ${course.courseName}`);
    } else {
      console.error(`Kursen med kod ${courseCode} hittades inte.`);
    }
  }

  // Ta bort kurs från ramschema
  removeCourseFromRamSchema(courseCode: string) {
    const currentSelectedCourses = this.selectedCoursesSubject.getValue();
    const updatedSelectedCourses = currentSelectedCourses.filter(course => course.courseCode !== courseCode);
    this.selectedCoursesSubject.next(updatedSelectedCourses);
  }

  // Hämta kurs efter vald kurskod
  getCourseByCode(courseCode: string): Course | undefined {
    return this.courseList.find(course => course.courseCode === courseCode);
  }
}
