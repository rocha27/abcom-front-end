import {NgModule} from '@angular/core';
import {TableModule} from "primeng/table";
import {MapaCoreModule} from '@mapa/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {LoadingModule} from "../loading/loading.module";
import {DocumentoListarComponent} from './listar/documento-listar.component';
import {DocumentoIncluirComponent} from './incluir/documento-incluir.component';
import {DocumentoAlterarComponent} from "./alterar/documento-alterar.component";
import {DocumentoVisualizarComponent} from "./visualizar/documento-visualizar.component";
import {
    AutoCompleteModule,
    ButtonModule,
    CalendarModule,
    CardModule, CheckboxModule,
    DropdownModule, FileUploadModule, InputMaskModule,
    InputTextModule, MessageModule, MessagesModule, RadioButtonModule,
    TabViewModule
} from 'primeng/primeng';
import {DocumentoRoutes} from "./documento.routing";

@NgModule({
    imports: [
        MapaCoreModule,
        CommonModule,
        FormsModule,
        CardModule,
        DropdownModule,
        TabViewModule,
        InputTextModule,
        AutoCompleteModule,
        ButtonModule,
        LoadingModule,
        TableModule,
        RouterModule.forChild(DocumentoRoutes),
        CalendarModule,
        RadioButtonModule,
        InputMaskModule,
        MessageModule,
        CheckboxModule,
        MessagesModule,
        FileUploadModule
    ],
    declarations: [
        DocumentoIncluirComponent,
        DocumentoListarComponent,
        DocumentoAlterarComponent,
        DocumentoVisualizarComponent,
    ],

})
export class DocumentoModule {
}
