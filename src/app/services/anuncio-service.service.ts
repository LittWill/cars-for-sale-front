import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AnuncioRequest } from '../interfaces/anuncio-request';

@Injectable({
  providedIn: 'root'
})
export class AnuncioServiceService {

  constructor(private httpClient : HttpClient) {
  }

  obterAnuncios(){
    return this.httpClient.get("http://localhost:8080/anuncios");
  }

  salvarAnuncio(formularioAnuncio : AnuncioRequest){
   const formData = new FormData()

   formData.append("anuncioForm", JSON.stringify(formularioAnuncio))
    
   formData.append("imagens", "/C:/Users/wilson/Pictures/Screenshots/Captura de tela 2024-03-14 141617.png")
   console.log(formularioAnuncio.fotos[0])
   console.log(formData)
    return this.httpClient.post("http://localhost:8080/anuncios", formData);
  }
}
