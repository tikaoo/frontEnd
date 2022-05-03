import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Funcionario } from '../../models/funcionario';
import { FuncionarioHttpService } from '../../services/funcionario-http.service';


@Component({
  selector: 'app-funcionario',
  templateUrl: './funcionario.component.html',
  styleUrls: ['./funcionario.component.css']
})
export class FuncionarioComponent implements OnInit {

  idFuncionario!:number | null
  funcionario!: Funcionario

  constructor(
    private route: ActivatedRoute,//parametro
    private funHttpServices:FuncionarioHttpService //service
  ) { }

  ngOnInit(): void {
    //pegar parametro
    this.idFuncionario = parseInt(this.route.snapshot.paramMap.get('idFuncionario') || '')

    //requisição http
    this.funHttpServices.getFuncionarioById(this.idFuncionario).subscribe(
      (fun)=>{
        this.funcionario = fun
        console.log(fun)
      }
    )

  }

}
