import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmpleadosService } from '../../services/empleados.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-editar',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './editar.component.html',
  styleUrl: './editar.component.css'
})
export class EditarComponent {

  formEmpleado: FormGroup;

  constructor(private fb:FormBuilder, private empleadoService: EmpleadosService, 
    @Inject(MAT_DIALOG_DATA) public empleado: any,
    public dialogRef: MatDialogRef<EditarComponent>
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

  ngOnInit(){
    this.patchForm();
  }

  patchForm(){
    this.formEmpleado.patchValue({
      nombre : this.empleado.nombre,
      apellidoPaterno : this.empleado.apellidoPaterno,
      apellidoMaterno : this.empleado.apellidoMaterno,
      curp : this.empleado.curp,
      telefono : this.empleado.telefono,
      sexo : this.empleado.sexo
    })
  }

  cerrarModal(){
    this.dialogRef.close(false);
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

  editar(){
    console.log(this.formEmpleado.value);

    const {nombre, apellidoPaterno, apellidoMaterno, curp, telefono, sexo} = this.formEmpleado.value;
    const {id, activo, fechaAlta, fechaBaja} = this.empleado;

    const data = {
      id,
      nombre,
      apellidoPaterno,
      apellidoMaterno,
      curp,
      telefono,
      sexo,
      activo,
      fechaAlta,
      fechaBaja
    }
     this.empleadoService.editar(data).subscribe({
      next: () => {
        this.dialogRef.close(true);
      },
      error: () => {
        alert("Error al registrar empleado");
      }
    }) 
  }

}
