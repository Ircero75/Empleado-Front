import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmpleadosService } from '../../services/empleados.service';

@Component({
  selector: 'app-eliminar',
  imports: [],
  templateUrl: './eliminar.component.html',
  styleUrl: './eliminar.component.css'
})
export class EliminarComponent {

  constructor(
    public dialogRef: MatDialogRef<EliminarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private empleadoService: EmpleadosService
  ){
    
  }

  cerrarModal(){
    this.dialogRef.close(false);
  }

  eliminar(){
    this.empleadoService.eliminar(this.data.id).subscribe({
      next: () => {
        this.dialogRef.close(true);
      },
      error: () => {
        alert("Error al eliminar empleado");
      }
    })
  }
}
