import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';



export class Categoria {
  codigo: BigInteger;
  nome: string;

}

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  categoriasUrl = 'http://localhost:8080/algamoney-api/categorias';

  constructor(private http: HttpClient) { }



  listarTodas(): Promise<any> {


    return this.http.get(`${this.categoriasUrl}`, { })
        .toPromise()
        .then(response => {
         // console.log('response', response); // verificando response
          return response;
        })
  }


}
