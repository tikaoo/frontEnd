import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServicosComponent } from '../funcionario/pages/servicos/servicos.component';

const routes: Routes = [
  {
    path:'servicos',
    component: ServicosComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicosRoutingModule { }
