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
  formularioAnuncio: FormGroup
  options: MarcaResponse[] = [];
  anuncioRequest !: AnuncioRequest

  filteredOptions: Observable<MarcaResponse[]>;

  constructor(private marcaService: MarcaService, private formBuilder: FormBuilder, private anuncioService: AnuncioServiceService) {

    this.formularioAnuncio = this.formBuilder.group({
      marca: ['Nissan', [Validators.required]],
      modelo: ['Corolla XEi 2014', [Validators.required]],
      quilometragem: ['25000', [Validators.required]],
      ano: ['2014', [Validators.required]],
      combustivel: ['GASOLINA', [Validators.required]],
      cor: ['Preto', [Validators.required]],
      valor: ['40000', [Validators.required]],
      tipoNegociacao: ['VENDA', [Validators.required]],
      fotos: [[], [Validators.required]]
    })

    this.filteredOptions = this.formularioAnuncio.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value.nome || '')),
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
    this.encodeImagemFileAsUrl(event.target.files).then((result) => {
      this.formularioAnuncio.value.fotos = result;
    });
  }

  async encodeImagemFileAsUrl(fileList: FileList): Promise<(string | ArrayBuffer | null)[]> {
    const encodedImages: (string | ArrayBuffer | null)[] = [];
    for (let i = 0; i < fileList.length; i++) {
      const fileReader = new FileReader();
      const file = fileList.item(i);
      if (file) {
        const result = await new Promise<string | ArrayBuffer | null >((resolve, reject) => {
          fileReader.onload = (event) => {
            resolve(event.target?.result!);
          };
          fileReader.onerror = (error) => {
            reject(error);
          };
          fileReader.readAsDataURL(file);
        });
        encodedImages.push(result);
      }
    }

    console.log(encodedImages)
    return encodedImages;
  }
  
  
  submeter() {
    this.anuncioRequest = {
      descricao: "teste",
      tipoNegociacao: this.formularioAnuncio.value.tipoNegociacao,
      valor: this.formularioAnuncio.value.valor,
      fotos: this.formularioAnuncio.value.fotos,
      veiculo: {
        marca: this.formularioAnuncio.value.marca,
        modelo: this.formularioAnuncio.value.modelo,
        kmRodados: this.formularioAnuncio.value.quilometragem,
        ano: this.formularioAnuncio.value.ano,
        tipoCombustivel: this.formularioAnuncio.value.combustivel,
        cor: this.formularioAnuncio.value.cor
      }
    }

    console.log(this.anuncioRequest);

    this.anuncioService.salvarAnuncio(this.anuncioRequest);
  }

}
