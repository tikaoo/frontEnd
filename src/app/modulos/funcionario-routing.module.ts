import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NovoFuncionarioComponent } from '../funcionario/pages/novo-funcionario/novo-funcionario.component';
import { ListarFuncionarioComponent } from '../funcionario/pages/listar-funcionario/listar-funcionario.component';
import { FuncionarioComponent } from '../funcionario/pages/funcionario/funcionario.component';
import { IsNumberGuard } from '../funcionario/guards/is-number.guard';
import { EditFuncionarioComponent } from '../funcionario/pages/edit-funcionario/edit-funcionario.component';
import { IsNumberNovoGuard } from '../funcionario/guards/is-number-novo.guard';

const routes: Routes = [
  {
    path:'novo-funcionario',
    component: NovoFuncionarioComponent,
    canDeactivate:[
      IsNumberNovoGuard
    ]
  },

  {
  path:'',
  pathMatch:'full',
  component:ListarFuncionarioComponent
  },
  {
    path:':idFuncionario',//parametro
    component: FuncionarioComponent,
    canActivate:[
      IsNumberGuard
    ]
  },
  {
    path:'edit/:idFuncionario',
    component:EditFuncionarioComponent,
    canDeactivate:[
      IsNumberNovoGuard
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [
    RouterModule],
})
export class FuncionarioRoutingModule { }
