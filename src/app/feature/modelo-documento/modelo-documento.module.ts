import {NgModule} from '@angular/core';
import {TableModule} from "primeng/table";
import {MapaCoreModule} from '@mapa/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {LoadingModule} from "../loading/loading.module";
import {ModeloDocumentoListarComponent} from './listar/modelo-documento-listar.component';
import {ModeloDocumentoIncluirComponent} from './incluir/modelo-documento-incluir.component';
import {ModeloDocumentoAlterarComponent} from "./alterar/modelo-documento-alterar.component";
import {ModeloDocumentoVisualizarComponent} from "./visualizar/modelo-documento-visualizar.component";
import {
    AutoCompleteModule,
    ButtonModule,
    CalendarModule,
    CardModule, CheckboxModule,
    DropdownModule, InputMaskModule,
    InputTextModule, MessageModule, MessagesModule, RadioButtonModule,
    TabViewModule
} from 'primeng/primeng';
import {ModeloDocumentoRoutes} from "./modelo-documento.routing";

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
        RouterModule.forChild(ModeloDocumentoRoutes),
        CalendarModule,
        RadioButtonModule,
        InputMaskModule,
        MessageModule,
        CheckboxModule,
        MessagesModule
    ],
    declarations: [
        ModeloDocumentoIncluirComponent,
        ModeloDocumentoListarComponent,
        ModeloDocumentoAlterarComponent,
        ModeloDocumentoVisualizarComponent,
    ],

})
export class ModeloDocumentoModule {
}
