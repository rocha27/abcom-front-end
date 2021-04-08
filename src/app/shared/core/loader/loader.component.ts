import {Component} from '@angular/core';
import {LoaderService} from "./loader.service";

/**
 * Implementação do component responsável por gerar a tela de loading, lockscreen
 */
@Component({
  selector: 'loader',
  template: `<p-dialog
          [(visible)]="display"
          [modal]="true"
          [showHeader]="false"
          [responsive]="true"
          [maximizable]="true"
          [draggable]="false"
          [resizable]="false"
          [style]="{width: '150px', minWidth: '150px'}">
          <div style="text-align: center">
              <app-loading></app-loading>
              <p>Aguarde...</p>
          </div>
      </p-dialog>`
})
export class LoaderComponent {

    display: boolean = false;

    /**
     * Construtor da classe.LoaderComponent
     * @param loaderService
     */
    constructor(private loaderService: LoaderService) {

        this.loaderService.onStart.subscribe(() => {
            this.display = true;
        });

        this.loaderService.onStop.subscribe(() => {
            this.display = false;
        });
    }

}
