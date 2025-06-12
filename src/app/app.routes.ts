import { InvoiceComponent } from './invoice/invoice.component';
import { WordtopdfComponent } from './wordtopdf/wordtopdf.component';

import { Routes } from '@angular/router';

export const routes: Routes = [
     {path: '', redirectTo: 'word-to-pdf', pathMatch: 'full'},
     {path:'', component: WordtopdfComponent},
     {path: 'invoice', component: InvoiceComponent}
];
