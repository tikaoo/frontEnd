import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Funcionario } from '../models/funcionario';

@Injectable()
export class FuncionarioHttpService {

  private readonly baseURL= '/servicos/funcionario'

  constructor(
    private http:HttpClient
     ) { }

     getFuncionarios(): Observable<Funcionario[]>{
       return this.http.get<Funcionario[]>(this.baseURL)

     }
     getFuncionarioById(id: number): Observable<Funcionario>{
       return this.http.get<Funcionario>(`${this.baseURL}/${id}`)
     }

     deleteFuncionario(id:number):Observable<void>{
       return this.http.delete<void>(`${this.baseURL}/${id}`)
     }
     createFuncionario(funcionario: Funcionario): Observable<Funcionario>{
       return this.http.post<Funcionario>(this.baseURL,funcionario)
     }
     //? para adicionar parâmetros
     addFoto(id:number, data:FormData, filename:string):Observable<void>{
       return this.http.post<void>(`${this.baseURL}/envioFoto/${id}?nome=${filename}`,data)
     }
     updateFuncionario(funcionario:Funcionario): Observable<Funcionario>{
     return this.http.put<Funcionario>(`${this.baseURL}/${funcionario.idFuncionario}`,funcionario)
     }
}

