import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { MatTableModule } from '@angular/material/table';
import {FormsModule} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    FormsModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'empleados';
}
