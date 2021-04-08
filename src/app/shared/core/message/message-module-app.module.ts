import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';


import {AppMessageService} from './app-message.service';
import {InternacionalizacaoPipe} from './internacionalizacao.pipe';
import {TranslateModule} from "@ngx-translate/core";
import {MessageConfirmComponent} from "./message-confim/message-confirm.component";
import {ConfirmDialogModule} from "primeng/primeng";

/**
 * Módulo responsável por prover recursos de 'mensagens' e 'i18n'.
 */
@NgModule({
  imports: [
      CommonModule,
      TranslateModule,
      ConfirmDialogModule
  ],
  declarations: [
      InternacionalizacaoPipe,
      MessageConfirmComponent
  ],
  exports: [
      InternacionalizacaoPipe,
      MessageConfirmComponent
  ]
})
export class MessageModuleApp {

  /**
   * Convenção usada para que o módulo 'app' disponibilize as instâncias 'providers' como singleton para todos os modulos da aplicação.
   */
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MessageModuleApp,
      providers: [
        AppMessageService,
        InternacionalizacaoPipe
      ]
    }
  }
}
