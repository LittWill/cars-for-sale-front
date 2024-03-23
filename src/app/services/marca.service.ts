import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MarcaResponse } from '../interfaces/marca-response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {

  constructor(private httpClient : HttpClient) { }

  obterMarcas() : Observable<MarcaResponse[]> {
    return this.httpClient.get<MarcaResponse[]>("http://localhost:8080/marcas");
  }
}
