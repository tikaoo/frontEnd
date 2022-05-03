import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Route, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ConfirmExitDialogComponent } from '../../components/confirm-exit-dialog/confirm-exit-dialog.component';
import { canDeactivate } from '../../models/canDeactivate';
import { Funcionario } from '../../models/funcionario';
import { FuncionarioHttpService } from '../../services/funcionario-http.service';

@Component({
  selector: 'app-edit-funcionario',
  templateUrl: './edit-funcionario.component.html',
  styleUrls: ['./edit-funcionario.component.css'],
})
export class EditFuncionarioComponent implements OnInit, canDeactivate {
  fun!: Funcionario;

  form: FormGroup = this.fb.group({
    nome: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    foto: [null],
  });

  foto!: File;

  constructor(
    private route: ActivatedRoute, //permite acessar os parametros da rota ativa atual
    private funHttpService: FuncionarioHttpService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router, // objeto que permito um roteamento entre as páginas
    private dialog : MatDialog
  ) {}
  canDeActivate(): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if(this.form.dirty) {
      const ref = this.dialog.open(ConfirmExitDialogComponent)

      return ref.afterClosed()//observable tipo boolean
    }
    return true;
  }

  ngOnInit(): void {
    const id: number = parseInt(
      this.route.snapshot.paramMap.get('idFuncionario') || '0'
    );

    this.funHttpService.getFuncionarioById(id).subscribe((f) => {
      this.fun = f;
      this.form.patchValue({
        nome: this.fun.nome,
        email: this.fun.email,
      });
    });
  }
  submit(): void {
    this.fun.nome = this.form.value.nome;
    this.fun.email = this.form.value.email;

    this.funHttpService.updateFuncionario(this.fun).subscribe(() => {
      if (this.foto != undefined) {
        const formData = new FormData();

        formData.append('foto', this.foto);
        const filename = `funcionario-${this.fun.idFuncionario}.${
          this.foto.type.split('/')[1]
        }`;

        this.funHttpService
          .addFoto(this.fun.idFuncionario || 0, formData, filename)
          .subscribe(
            () => {
            this.form.reset() // reseta o formulario
            this.showSuccess();//mensagem de sucesso
          },
          (error:HttpErrorResponse)=>{
            this.showError(error)//mensagem de erro
          }
          );
      }else {
        this.form.reset()
        this.showSuccess()
      }
    },
    (error: HttpErrorResponse) => {
      this.showError(error)
    ;
    });
  }
  fileChange(event: any): void {
    this.foto = event.target.files[0];
  }

  showSuccess(): void {
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
}
