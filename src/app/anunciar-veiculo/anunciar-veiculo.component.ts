import { Component, OnInit } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {AsyncPipe} from '@angular/common';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { startWith, map, Observable } from 'rxjs';
import { MarcaService } from '../services/marca.service';
import { MarcaResponse } from '../interfaces/marca-response';

@Component({
  selector: 'app-anunciar-veiculo',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, MatSelectModule, MatAutocompleteModule, AsyncPipe, ReactiveFormsModule],
  templateUrl: './anunciar-veiculo.component.html',
  styleUrl: './anunciar-veiculo.component.scss'
})
export class AnunciarVeiculoComponent {
  marcas : MarcaResponse[] = [];
  myControl = new FormControl('');
  options: MarcaResponse[] = [];

  filteredOptions: Observable<MarcaResponse[]>;

  constructor(private marcaService: MarcaService){
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

    marcaService.obterMarcas().subscribe((marcaResponse : MarcaResponse[]) => {
      this.marcas = marcaResponse;
      this.options = this.marcas;
      console.log(this.marcas);
    });
  }
  
  private _filter(value: string): MarcaResponse[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(marca => marca.nome.toLowerCase().includes(filterValue));
  }

}
