import {Component, OnInit} from '@angular/core';
import {Message, MessageService} from "primeng/api";
import {AppMessageService, MessageItem} from "./shared/core/message/app-message.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
    title = 'ABCOM';
    msgs: Message[] = [];

    constructor(private appMessageService: AppMessageService,
                public messageService: MessageService) {
    }

    ngOnInit(): void {
        this.appMessageService.getMsgEmitter().subscribe(item => this.addMsgItem(item));
    }

    /**
     * Adiciona o item de mensagem a visualização.
     *
     * @param messageItem
     */
    private addMsgItem(messageItem: MessageItem): void {
        this.messageService.add({
            severity: messageItem.type,
            detail: messageItem.msg
        });
    }
}
