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
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
 import { ScrollTopModule } from 'primeng/scrolltop';
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
    TableModule,ScrollTopModule,
    IconFieldModule,
    InputIconModule,
    FloatLabelModule,ToastModule
  ],
  templateUrl: './ramschema.component.html',
  styleUrls: [
    '../../../../node_modules/primeng/resources/themes/lara-light-teal/theme.css',
    '../../../../node_modules/primeng/resources/primeng.min.css',
    '../../../../node_modules/primeicons/primeicons.css',
    './ramschema.component.scss',
  ],
  providers: [MessageService]
})
export class RamschemaComponent implements OnInit {
  courseList: Course[] = [];
  selectedCourseList: Course[] = [];
  totalPoints: number = 0;
  numberOfSelectedCourses : number =0;
  constructor(private courseService: CourseService, private messageService: MessageService) {}

   
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

  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Lyckad', detail: 'Kursen togs bort från Mitt Ramschema' });
   
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
    // Visa meddelande att det gick bra att ta bort kursen
    this.showSuccess();
  }
  exportPDF() {
    const doc = new jsPDF();
    const title = "Mitt Ramschema";
    const currentDate = new Date().toLocaleString('sv-SE');

    // Lägg till titel och nuvarande datum
    doc.setFontSize(18);
    doc.text(title, 14, 22);
    doc.setFontSize(10);
    doc.text(`PDF Skapad: ${currentDate}`, 14, 30);

    const head = [['Kod', 'Kursnamn', 'Poäng', 'Ämne', 'Studieplan']];
    const data = this.selectedCourseList.map(course => [
        course.courseCode,
        course.courseName,
        `${course.points} HP`,
        course.subject,
        "" // Placeholder for "Studieplan" link
    ]);

    // Calculate the starting Y position for the table
    let startY = 40;

    // Draw the table with automatic page breaks
    doc.autoTable({
        head: head,
        body: data,
        startY: startY,
        margin: { top: 40 },
        styles: {
            overflow: 'linebreak',
            cellPadding: { top: 5, bottom: 5, left: 5, right: 5 }
        },
        pageBreak: 'auto',
        didDrawPage: (data :any) => {
            // Add header on each new page
            doc.setFontSize(18);
            doc.text(title, 14, 22);
            doc.setFontSize(10);
            doc.text(`PDF Skapad: ${currentDate}`, 14, 30);
        },
        didDrawCell: (data : any) => {
            if (data.column.index === 4 && data.cell.section === 'body') {
                const link = this.selectedCourseList[data.row.index].syllabus;
                doc.setTextColor(0, 0, 255);
                // Position text within the cell, respecting padding
                const textX = data.cell.x + data.cell.padding('left');
                const textY = data.cell.y + data.cell.height / 2 + 2; // Vertically center the text
                doc.textWithLink('Studieplan', textX, textY, { url: link });
                doc.setTextColor(0, 0, 0);
            }
        }
    });

    // Get the final Y position after drawing the table
    const finalY = (doc as any).lastAutoTable.finalY || 0;

    // Add footer with total points and number of courses
    const totalPoints = `Totala högskolepoäng: ${this.totalPoints} HP`;
    const numberOfSelectedCourses = `Antal Kurser: ${this.numberOfSelectedCourses}`;
    
    doc.setFontSize(15);

    // Check if there is enough space on the current page for the footer
    if (finalY + 30 > doc.internal.pageSize.height) {
        doc.addPage();
        doc.text(totalPoints, 14, 30);
        doc.text(numberOfSelectedCourses, 14, 40);
    } else {
        doc.text(totalPoints, 14, finalY + 10);
        doc.text(numberOfSelectedCourses, 14, finalY + 20);
    }

    doc.save('Ramschema.pdf');
}


  
  
  
}