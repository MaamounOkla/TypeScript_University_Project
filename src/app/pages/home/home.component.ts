import { Component } from '@angular/core';
import { CourseListComponent } from '../../components/course-list/course-list.component';
 
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [  CourseListComponent,FormsModule  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: []
})
export class HomeComponent {
  
}