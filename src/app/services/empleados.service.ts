import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {

  apiUrl = 'http://localhost:8090/empleados';
  constructor(private http: HttpClient) { }

  registrar(empleado: any):Observable<any>{
    return this.http.post<any>(this.apiUrl, empleado);
  }

  consultar():Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  editar(empleado: any):Observable<any>{
    return this.http.put<any>(this.apiUrl, empleado);
  }

  eliminar(id: number):Observable<any>{
    console.log(id);
    console.log(this.apiUrl+'/'+id);
    return this.http.delete(this.apiUrl+'/'+id);
  }

  
}
