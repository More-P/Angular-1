import { Component } from '@angular/core';
import * as mammoth from 'mammoth';

@Component({
  selector: 'app-wordtopdf',
  templateUrl: './wordtopdf.component.html',
  styleUrls: ['./wordtopdf.component.scss']
})
export class WordtopdfComponent {
  htmlContent: string = '';

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file && file.name.endsWith('.docx')) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const arrayBuffer = e.target.result;
        
        mammoth.convertToHtml({ 
          arrayBuffer: arrayBuffer,
          styleMap: [
            "p => p.fresh",
            "table => table.table-style"
          ] as any 
        }).then(result => {
        
          this.htmlContent = `
            <div class="pdf-content">
              ${result.value}
            </div>
          `;
          console.log('HTML Content:', this.htmlContent); 
        }).catch(error => {
          console.error('Mammoth conversion error:', error);
          alert('Error converting DOCX file. Please check the file format.');
        });
      };
      reader.readAsArrayBuffer(file);
    } else {
      alert('Please select a valid .docx file.');
    }
  }

  async convertToPdf() {
    if (!this.htmlContent) {
      alert('No content to convert. Please select a DOCX file first.');
      return;
    }

    const element = document.createElement('div');
    element.innerHTML = this.htmlContent;
    document.body.appendChild(element);

    const opt = {
      margin: [1, 1, 1, 1],      filename: 'converted.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 3,
        useCORS: true, 
        logging: true 
      },
      jsPDF: { 
        unit: 'in', 
        format: 'letter', 
        orientation: 'portrait',
        putOnlyUsedFonts: true 
      },
      pagebreak: { 
        mode: ['css', 'legacy'], 
        avoid: ['table', 'tr', 'p.fresh'] 
      }
    };

    try {
      const html2pdf = (await import('html2pdf.js')).default;
      await html2pdf().from(element).set(opt).save();
    } catch (error) {
      console.error('PDF conversion error:', error);
      alert('Error generating PDF. Please try again.');
    } finally {
      document.body.removeChild(element);
    }
  }
}
