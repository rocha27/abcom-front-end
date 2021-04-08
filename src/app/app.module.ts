import {LOCALE_ID, NgModule} from '@angular/core';
import {MapaCoreModule} from '@mapa/core';
import {ToastModule} from 'primeng/toast';
import {ConfirmationService, MessageService} from 'primeng/api';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {BrowserModule} from '@angular/platform-browser';
import {ClientModule} from "./shared/client/client.module";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MessageModuleApp} from "./shared/core/message/message-module-app.module";
import {MessageResourceProvider} from "./shared/core/message/message.resource";
import {AppMessage} from "./app.message";
import {MessageModule, MessagesModule} from 'primeng/primeng';
import {LoaderModule} from "./shared/core/loader/loader.module";
import {LoadingModule} from "./feature/loading/loading.module";
import {registerLocaleData} from '@angular/common';
import localePt from '@angular/common/locales/pt';
import {UtilService} from "./shared/service/util.service";
import {ProdutoService} from "./shared/client/produto/produto.service";
import {ReferencialService} from "./shared/client/referencial/referencial.service";
import {ItemService} from './shared/client/item/item.service';

registerLocaleData(localePt);

@NgModule({
    imports: [
        ToastModule,
        BrowserModule,
        AppRoutingModule,
        MessagesModule,
        MessageModule,
        LoaderModule,
        LoadingModule,
        BrowserAnimationsModule,
        ClientModule.forRoot(),
        MessageModuleApp.forRoot(),
        MapaCoreModule.forRoot(),
    ],
    declarations: [
        AppComponent,
    ],
    providers: [
        {
            provide: LOCALE_ID,
            useValue: 'pt-BR',
        },
        {
            provide: MessageResourceProvider,
            useValue: AppMessage,
        },
        ConfirmationService,
        MessageService,
        UtilService,
        ProdutoService,
        ReferencialService,
        ItemService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
