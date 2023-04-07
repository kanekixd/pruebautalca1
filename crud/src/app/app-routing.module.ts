import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { AgregarComponent } from './componentes/agregar/agregar.component';
import { ModificarComponent } from './componentes/modificar/modificar.component';
import { LoginComponent } from './componentes/login/login.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path:'', redirectTo: '/login', pathMatch:'full'},
  {path:'inicio', component: InicioComponent,canActivate:[AuthGuard],data:{expectedRole:('admin')}},
  {path:'add', component:AgregarComponent},
  {path:'edit/:id', component:ModificarComponent},
  {path:'login', component:LoginComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
