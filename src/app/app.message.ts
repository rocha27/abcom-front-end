/**
 * Implementação responsável por prover as 'descrições' e 'mensagens' utilizadas na aplicação em um único local.
 */
import {InternacionalizacaoResource} from "./shared/core/message/internacionalizacao.resource";

export class AppMessage implements InternacionalizacaoResource {

  private resource: Object;

  /**
   * Construtor da classe.
   */
  constructor() {
    this.resource = {

        'EXEMPLO_MENSAGEM_SEM_PARAMENTRO': 'Mensagem aqui',
        'EXEMPLO_MENSAGEM_COM_PARAMENTRO': 'Paramentro um {0}, {1}...',

    };
  }

  /**
   * Retorna a 'descrição' conforme a 'chave' informada.
   *
   * @param key
   * @returns
   */
  getDescription(key: string): string {
    return this.resource[key];
  }

  /**
   * Retorna a 'mensagem' conforme a 'chave' informada.
   *
   * @param key
   * @returns
   */
  getMessage(key: string): string {
    return this.getDescription(key);
  }
}
