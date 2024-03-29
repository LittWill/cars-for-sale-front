import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AnuncioRequest } from '../interfaces/anuncio-request';

@Injectable({
  providedIn: 'root'
})
export class AnuncioServiceService {

  constructor(private httpClient: HttpClient) {
  }

  obterAnuncios() {
    return this.httpClient.get("http://localhost:8080/anuncios");
  }

  salvarAnuncio(formularioAnuncio: AnuncioRequest) {

    this.httpClient.post("http://localhost:8080/anuncios", formularioAnuncio).subscribe(respostaAnuncio => {
      console.log(respostaAnuncio)
    });
  }
}
