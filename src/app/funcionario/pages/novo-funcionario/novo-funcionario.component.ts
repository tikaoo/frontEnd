import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ConfirmExitDialogComponent } from '../../components/confirm-exit-dialog/confirm-exit-dialog.component';
import { DialogGuardComponent } from '../../components/dialog-guard/dialog-guard.component';
import { canDeactivate } from '../../models/canDeactivate';
import { FuncionarioHttpService } from '../../services/funcionario-http.service';

@Component({
  selector: 'app-novo-funcionario',
  templateUrl: './novo-funcionario.component.html',
  styleUrls: ['./novo-funcionario.component.css'],
})
export class NovoFuncionarioComponent implements OnInit,canDeactivate {
  form: FormGroup = this.fb.group({
    nome: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    foto: [''],
  });

  foto!: File;

  @ViewChild('fileInput')
  fileInput!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private funHttpService: FuncionarioHttpService,
    private snackBar: MatSnackBar,
    private router: Router,
    private dialog: MatDialog
  ) {}
  canDeActivate(): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if(this.form.dirty) {
      const ref = this.dialog.open(ConfirmExitDialogComponent)

      return ref.afterClosed()
    }
    return true;
  }

  ngOnInit(): void {}

  selectImage(): void {
    this.fileInput.nativeElement.click();
  }

  submit(): void {
    const funcionario = this.form.value;
    funcionario.foto = null;

    this.funHttpService.createFuncionario(funcionario).subscribe(
      (func) => {
        if(this.foto!=undefined){
          const formData: FormData = new FormData();
          //append igual ao localstorage
          formData.append('foto',new Blob([this.foto],{type:this.foto.type}))
          //split retira a / da string - type tipo de arquivo - [1] pois o segundo item da array é o tipo(jpg)
          const filename = `funcionario-${func.idFuncionario}.${this.foto.type.split('/')[1]}`
          //|| 0 para não dar erro acusando undefined
          this.funHttpService.addFoto(func.idFuncionario || 0,formData,filename).subscribe(
            ()=> {
              this.form.reset()
              this.showSuccess()
            },
            (error:HttpErrorResponse)=>{
              this.showError(error)
            }
          )
        }else{
          this.form.reset()
        this.showSuccess()
      }
    },
      (error: HttpErrorResponse) => {
          this.showError(error)
        
      }
    );
   }

  fileChange(event: any) {

    this.foto = event.target.files[0];
    console.log(this.foto)
  }

  showSuccess():void{
    this.snackBar.open('Funcionário salvo!!', 'Fechar', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
    //atualizar rota após salvar funcionário
    this.router.navigateByUrl('/funcionario');
  }
  showError(error: HttpErrorResponse):void{
    this.snackBar.open(
      `Ocorreu um erro no upload da foto(Erro ${error.status})`,
      'fechar',
      {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      }

    )
  };
    teste(){
   const dialogRef = this.dialog.open(DialogGuardComponent)

    }


}
