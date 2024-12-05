import { Routes } from '@angular/router';
import { RegistroComponent } from './views/registro/registro.component';
import { ConsultaComponent } from './views/consulta/consulta.component';

export const routes: Routes = [
    {
        path: 'registro',
        component: RegistroComponent
    },
    {
        path: 'consulta',
        component: ConsultaComponent
    }
];
