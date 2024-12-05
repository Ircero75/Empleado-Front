import { Component } from '@angular/core';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { EmpleadosService } from '../../services/empleados.service';
import { EditarComponent } from '../editar/editar.component';
import { MatDialog } from '@angular/material/dialog';
import { EliminarComponent } from '../eliminar/eliminar.component';
import { RegistroComponent } from '../registro/registro.component';

@Component({
  selector: 'app-consulta',
  imports: [MatTable, MatTableModule],
  templateUrl: './consulta.component.html',
  styleUrl: './consulta.component.css'
})
export class ConsultaComponent {

  dataSource = new MatTableDataSource<any>([]);
  columnDisplay = ['nombre', 'ApellidoP', 'ApellidoM', 'curp',
    'telefono', 'sexo', 'estatus', 'Acciones'];


  constructor(private empleadoService: EmpleadosService, private dialog: MatDialog){

  }

  ngOnInit(): void {
    this.consulta();
  }

  consulta(){
    this.empleadoService.consultar().subscribe({
      next: (response:any) => {
        console.log(response);
        this.dataSource.data = response.info;
        console.log(this.dataSource.data);
      },
      error: () => {
        alert("Error al registrar empleado");
      }
    })
  }

  editar(user:any){
    const dialogRef = this.dialog.open(EditarComponent, {
      data:user,
      height: '20 vh',
      width: '30 vw'
    })
    dialogRef.afterClosed().subscribe(result=> {
      if(result) this.consulta();
    } )
  }

  eliminar(user:any){
    const dialogRef = this.dialog.open(EliminarComponent, {
      data:user,
      height: '20 vh',
      width: '30 vw'
    })
    dialogRef.afterClosed().subscribe(result=> {
      if(result) this.consulta();
    } )
  }

  crear(){
    const dialogRef = this.dialog.open(RegistroComponent, {
      height: '20 vh',
      width: '30 vw'
    })
    dialogRef.afterClosed().subscribe(result=> {
      if(result) this.consulta();
    } )
  }

}
