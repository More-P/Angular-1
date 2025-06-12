// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-wordtopdf',
//   standalone: true,
//   imports: [],
//   templateUrl: './wordtopdf.component.html',
//   styleUrl: './wordtopdf.component.scss'
// })
// export class WordtopdfComponent {

// }


import { Component } from '@angular/core';
import * as mammoth from 'mammoth';
import jsPDF from 'jspdf';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'appwordtopdf',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wordtopdf.component.html',
  styleUrls: ['./wordtopdf.component.scss'],
})
export class WordtopdfComponent {
  htmlContent: string = '';

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = async (e: ProgressEvent<FileReader>) => {
        const arrayBuffer = e.target?.result as ArrayBuffer;
        try {
          const result = await mammoth.convertToHtml({ arrayBuffer });
          this.htmlContent = result.value;
        } catch (err) {
          console.error('Error converting Word to HTML:', err);
        }
      };
      reader.readAsArrayBuffer(file);
    }
  }

  convertToPdf(): void {
    const doc = new jsPDF();
    doc.html(this.htmlContent, {
      callback: () => doc.save('converted.pdf'),
      x: 10,
      y: 10,
      html2canvas: { scale: 0.5 },
    });
  }
}
