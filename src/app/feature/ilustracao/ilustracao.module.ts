import {NgModule} from '@angular/core';
import {TableModule} from "primeng/table";
import {MapaCoreModule} from '@mapa/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {LoadingModule} from "../loading/loading.module";
import {
    AutoCompleteModule,
    ButtonModule,
    CardModule,
    DropdownModule, FileUploadModule, InputMaskModule,
    InputTextModule,
    TabViewModule
} from 'primeng/primeng';
import {IlustracaoRoutes} from "./ilustracao.routing";
import {IlustracaoVisualizarComponent} from "./visualizar/ilustracao-visualizar.component";
import {IlustracaoListarComponent} from "./listar/ilustracao-listar.component";
import {IlustracaoIncluirComponent} from "./incluir/ilustracao-incluir.component";
import {IlustracaoAlterarComponent} from "./alterar/ilustracao-alterar.component";


@NgModule({
    imports: [
        MapaCoreModule,
        CommonModule,
        FormsModule,
        CardModule,
        DropdownModule,
        InputTextModule,
        AutoCompleteModule,
        ButtonModule,
        LoadingModule,
        TableModule,
        RouterModule.forChild(IlustracaoRoutes),
        TabViewModule,
        InputMaskModule,
        FileUploadModule
    ],
    declarations: [
        IlustracaoIncluirComponent,
        IlustracaoListarComponent,
        IlustracaoAlterarComponent,
        IlustracaoVisualizarComponent
    ],

})
export class IlustracaoModule {
}
