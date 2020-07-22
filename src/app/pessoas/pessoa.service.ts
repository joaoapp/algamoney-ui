import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pessoa } from '../core/model';



export class PessoaFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}


@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  pessoasUrl = 'http://localhost:8080/algamoney-api/pessoas';


  constructor(private http: HttpClient) { }

  pesquisar(filtro: PessoaFiltro): Promise<any> {

    let params = new HttpParams();

    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
        params = params.set('nome', filtro.nome);
    }

    return this.http.get(`${this.pessoasUrl}`, { params })
        .toPromise()
        .then(response => {
          const lancamentos = response['content']
          const resultado = {
            lancamentos,
            total: response['totalElements']
          }
          return resultado;
        })
  }

  excluir(codigo: number): Promise<void> {


    return this.http.delete(`${this.pessoasUrl}/${codigo}`, {  })
      .toPromise()
      .then(() => null);
  }


  mudarStatus(codigo: number, ativo: boolean): Promise<void> {
    const headers = new HttpHeaders()
      .set('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')
      .set('Content-Type', 'application/json');

  return this.http.put(`${this.pessoasUrl}/${codigo}/ativo`, ativo , { headers })
  .toPromise()
  .then(() => null);

  }



  listarTodas(): Promise<any> {

    return this.http.get(`${this.pessoasUrl}`, {  })
        .toPromise()
        .then(response => {
         // console.log('response', response); // verificando response
          return response['content'];
        })
  }

  adicionar(pessoa: Pessoa): Promise<Pessoa> {

    return this.http.post<Pessoa>(
      this.pessoasUrl, pessoa, {})
      .toPromise();
  }

}
