import { Component } from '@angular/core';
import { CourseListComponent } from '../../components/course-list/course-list.component';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CourseListComponent],
  templateUrl: './education.component.html',
  styleUrl: './education.component.scss'
})
export class EducationComponent {

}
