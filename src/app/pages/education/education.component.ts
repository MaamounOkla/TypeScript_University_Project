import { Component, ViewChild, ElementRef , AfterViewInit } from '@angular/core';
import { CourseListComponent } from '../../components/course-list/course-list.component';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CourseListComponent],
  templateUrl: './education.component.html',
  styleUrl: './education.component.scss'
})
export class EducationComponent {
  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;
  ngAfterViewInit() {
    //se till att videon är tyst då vissa webbläsare riktlinjer är att inte auto-spela videos med ljud på.
    this.videoPlayer.nativeElement.muted = true; 
    this.videoPlayer.nativeElement.play().catch(error => {
      console.error('Video playback failed:', error);
    });
  }
}
