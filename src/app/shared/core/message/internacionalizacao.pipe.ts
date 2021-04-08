import {Pipe, PipeTransform} from '@angular/core';
import {MessageResource, MessageResourceProvider} from './message.resource';
import {TranslateService} from "@ngx-translate/core";

/**
 * Classe 'Pipe' para prover o recurso de 'i18n'.
 */
@Pipe({
  name: 'i18nApp'
})
export class InternacionalizacaoPipe implements PipeTransform {

  private messageResource: MessageResource;

  /**
   * Construtor da classe.
   *
   * @param MessageResource
   */
  constructor(private translateService: TranslateService,
              MessageResource: MessageResourceProvider) {
    this.messageResource = new MessageResource();
  }

  /**
   * Retorna a descrição conforme a chave informada.
   *
   * @param chave
   * @param params
   */
  transform(chave: string, params: any): string {
    //let description = this.messageResource.getDescription(chave);
    let description = this.translateService.instant(chave);

    if (description !== undefined && params !== undefined) {

      if (typeof params === 'string') {
        description = description.replace(new RegExp('\\{0}', 'g'), params);

      } else {
        for (var index = 0; index < params.length; index++) {
          description = description.replace(new RegExp('\\{' + index + '\\}', 'g'), params[index]);
        }
      }
    }
    return description;
  }

}
