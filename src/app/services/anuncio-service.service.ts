import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnuncioServiceService {

  constructor(private httpClient : HttpClient) {
  }

  obterAnuncios(){
    return this.httpClient.get("http://localhost:8080/anuncios");
  }
}
