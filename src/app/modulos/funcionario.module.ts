import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FuncionarioRoutingModule } from './funcionario-routing.module';
import { NovoFuncionarioComponent } from '../funcionario/pages/novo-funcionario/novo-funcionario.component';
import { MaterialModule } from '../Material/material.module';
import { ListarFuncionarioComponent } from '../funcionario/pages/listar-funcionario/listar-funcionario.component';
import { HttpClientModule } from '@angular/common/http';
import { FuncionarioHttpService } from '../funcionario/services/funcionario-http.service';
import { ReactiveFormsModule } from '@angular/forms';
import { FuncionarioComponent } from '../funcionario/pages/funcionario/funcionario.component';
import { IsNumberGuard } from '../funcionario/guards/is-number.guard';
import { IsNumberNovoGuard } from '../funcionario/guards/is-number-novo.guard';
import { EditFuncionarioComponent } from '../funcionario/pages/edit-funcionario/edit-funcionario.component';
import { DeleteDialogComponent } from '../funcionario/components/delete-dialog/delete-dialog.component';
import { ConfirmExitDialogComponent } from '../funcionario/components/confirm-exit-dialog/confirm-exit-dialog.component';
import { DialogGuardComponent } from '../funcionario/components/dialog-guard/dialog-guard.component';


@NgModule({
  declarations: [
    NovoFuncionarioComponent,
    ListarFuncionarioComponent,
    FuncionarioComponent,
    DeleteDialogComponent,
    ConfirmExitDialogComponent,
    EditFuncionarioComponent,
    DialogGuardComponent



  ],
  imports: [
    CommonModule,
    FuncionarioRoutingModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers:[
    FuncionarioHttpService,
    IsNumberGuard,
    IsNumberNovoGuard
  ]
})
export class FuncionarioModule { }
