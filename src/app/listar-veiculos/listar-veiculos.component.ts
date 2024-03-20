import { Component } from '@angular/core';
import { AnuncioServiceService } from '../services/anuncio-service.service';
import { CardVeiculoComponent } from "../card-veiculo/card-veiculo.component";
import { NgFor } from '@angular/common';

@Component({
    selector: 'app-listar-veiculos',
    standalone: true,
    templateUrl: './listar-veiculos.component.html',
    styleUrl: './listar-veiculos.component.scss',
    imports: [CardVeiculoComponent, NgFor]
})
export class ListarVeiculosComponent {

  anuncios = []

  constructor(private anuncioService: AnuncioServiceService){
    anuncioService.obterAnuncios().subscribe((anuncioResponse : any) => {
      this.anuncios = anuncioResponse;
      console.log(this.anuncios)
    });
  }


}
