import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardVeiculoComponent } from "./card-veiculo/card-veiculo.component";
import { ListarVeiculosComponent } from './listar-veiculos/listar-veiculos.component';
import { NavbarComponent } from "./navbar/navbar.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, CardVeiculoComponent, ListarVeiculosComponent, NavbarComponent]
})
export class AppComponent {
  title = 'cars-for-sale-front';
}
