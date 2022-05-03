import { Component, OnInit } from '@angular/core';
import { FuncionarioHttpService } from '../../services/funcionario-http.service';
import { Funcionario} from '../../models/funcionario'
import { MatDialog } from '@angular/material/dialog';
import {DeleteDialogComponent} from '../../components/delete-dialog/delete-dialog.component'
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-listar-funcionario',
  templateUrl: './listar-funcionario.component.html',
  styleUrls: ['./listar-funcionario.component.css']
})
export class ListarFuncionarioComponent implements OnInit {

  funcionarios : Funcionario[]=[]

  columns: string[]= ['idFuncionario','nome','email','actions']

  constructor(
    private funHttpService: FuncionarioHttpService,
    private dialog: MatDialog,
    private msg : MatSnackBar
  ) { }

  //http requisições
  ngOnInit(): void {
   this.recoverFuncionarios()
  }
  confirmarDelete(id:number){
    const dialogRef = this.dialog.open(DeleteDialogComponent)

    dialogRef.afterClosed().subscribe(
      canDelete => {
        if(canDelete==true){
          this.funHttpService.deleteFuncionario(id)
          .subscribe(
            ()=>{
              this.msg.open('Você excluiu um funcionário!!!','fechar',{
                duration:3000,
                verticalPosition:'top'
              })
              this.recoverFuncionarios()

            }
          )

        }

      }
    )
  }
  recoverFuncionarios(){
    this.funHttpService.getFuncionarios().subscribe(
      (funcionarios) => {
        this.funcionarios =  funcionarios
      }
    )
  }

}
