import {Component} from '@angular/core';
import {ConfirmationService} from 'primeng/api';
import {AppMessageService, MessageItem} from '../app-message.service';

/**
 * Implementação do component responsável por gerar a tela de confirmação
 */
@Component({
  selector: 'message-confirm',
  template: `<p-confirmDialog [closeOnEscape]="false" [closable]="false" width="400"></p-confirmDialog>`
})
export class MessageConfirmComponent {

  /**
   * Construtor da classe.
   *
   * @param appMessageService
   * @param confirmationService
   */
  constructor(private appMessageService: AppMessageService, private confirmationService: ConfirmationService) {
    this.appMessageService.getConfirmEmitter().subscribe(item => this.addConfirmItem(item));
  }

  /**
   * Adiciona o modal de confirmação a view.
   *
   * @param messageItem
   */
  private addConfirmItem(messageItem: MessageItem): void {
    let acceptLabel = messageItem.isConfirmTypeYesNo() ? 'COMUM.LABEL.CONFIRM_YES' : 'COMUM.LABEL.CONFIRM_OK';

    this.confirmationService.confirm({
        header: this.appMessageService.getDescription('COMUM.LABEL.CONFIRM_HEADER'),
        message: messageItem.msg,
        acceptLabel: this.appMessageService.getDescription(acceptLabel),
        rejectLabel: this.appMessageService.getDescription('COMUM.LABEL.CONFIRM_NO'),
        rejectVisible: messageItem.isConfirmTypeYesNo(),
        accept: () => { messageItem.executYesOk(); },
        reject: () => { messageItem.executNo(); },
    });
  }
}
