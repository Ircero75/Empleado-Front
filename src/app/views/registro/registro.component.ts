import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmpleadosService } from '../../services/empleados.service';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-registro',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  
  formEmpleado: FormGroup;

  constructor(private fb:FormBuilder, private empleadoService: EmpleadosService, 
    private router: Router,
    public dialogRef: MatDialogRef<RegistroComponent>
    ){
    
    this.formEmpleado = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      apellidoPaterno: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      apellidoMaterno: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      curp: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[A-Z]{4}\d{6}[A-Z]{6}\d{2}$/i), // Ejemplo CURP
        ],
      ],
      telefono: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      sexo: ['', [Validators.required]],
    })
  }

  registrar(){
    console.log(this.formEmpleado.value);
    this.empleadoService.registrar(this.formEmpleado.value).subscribe({
      next: () => {
        this.dialogRef.close(true);
      },
      error: () => {
        alert("Error al registrar empleado");
      }
    })
  }

  getErrorMessage(controlName: string): string {
    const control = this.formEmpleado.get(controlName);
    if (control?.hasError('required')) {
      return 'Este campo es obligatorio.';
    }
    if (control?.hasError('pattern')) {
      return 'El formato no es válido.';
    }
    return '';
  }
}
