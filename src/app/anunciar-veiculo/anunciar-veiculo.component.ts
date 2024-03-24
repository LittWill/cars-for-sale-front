import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AsyncPipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { startWith, map, Observable } from 'rxjs';
import { MarcaService } from '../services/marca.service';
import { MarcaResponse } from '../interfaces/marca-response';
import { AnuncioRequest } from '../interfaces/anuncio-request';
import { AnuncioServiceService } from '../services/anuncio-service.service';

@Component({
  selector: 'app-anunciar-veiculo',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, MatSelectModule, MatAutocompleteModule, AsyncPipe, ReactiveFormsModule],
  templateUrl: './anunciar-veiculo.component.html',
  styleUrl: './anunciar-veiculo.component.scss'
})
export class AnunciarVeiculoComponent {
  marcas: MarcaResponse[] = [];
  formularioAnuncio : FormGroup
  options: MarcaResponse[] = [];
  anuncioRequest !: AnuncioRequest

  filteredOptions: Observable<MarcaResponse[]>;

  constructor(private marcaService: MarcaService, private formBuilder: FormBuilder, private anuncioService : AnuncioServiceService) {

    this.formularioAnuncio = this.formBuilder.group({
      marca: ['', [Validators.required]],
      modelo: ['', [Validators.required]],
      quilometragem: ['', [Validators.required]],
      ano: ['', [Validators.required]],
      combustivel: ['', [Validators.required]],
      cor: ['', [Validators.required]],
      valor: ['', [Validators.required]],
      tipoNegociacao: ['', [Validators.required]],
      fotos: [File, [Validators.required]]
    })

    this.filteredOptions = this.formularioAnuncio.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

    marcaService.obterMarcas().subscribe((marcaResponse: MarcaResponse[]) => {
      this.marcas = marcaResponse;
      this.options = this.marcas;
      console.log(this.marcas);
    });
  }

  private _filter(value: string): MarcaResponse[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(marca => marca.nome.toLowerCase().includes(filterValue));
  }

  uploadFile(event: any) {
    console.log(event.target.files[0])
  }

  submeter(){
    this.anuncioRequest = {
      descricao: "teste",
      tipoNegociacao: this.formularioAnuncio.value.negociacao,
      valor: this.formularioAnuncio.value.valor,
      fotos: this.formularioAnuncio.value.fotos,
      veiculo : {
        marca: this.formularioAnuncio.value.marca,
        modelo: this.formularioAnuncio.value.modelo,
        kmRodados: this.formularioAnuncio.value.quilometragem,
        ano: this.formularioAnuncio.value.ano,
        tipoCombustivel: this.formularioAnuncio.value.combustivel,
        cor: this.formularioAnuncio.value.cor
      }
    }
  
   this.anuncioService.salvarAnuncio(this.anuncioRequest).subscribe(data => {
    console.log(data);
   })
  }

}
