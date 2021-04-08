import {NgModule} from '@angular/core';
import {TableModule} from "primeng/table";
import {MapaCoreModule} from '@mapa/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {ReferencialRoutes} from './referencial.routing';
import {LoadingModule} from "../loading/loading.module";
import {ReferencialListarComponent} from './listar/referencial-listar.component';
import {ReferencialIncluirComponent} from './incluir/referencial-incluir.component';
import {ReferencialAlterarComponent} from "./alterar/referencial-alterar.component";
import {ReferencialVisualizarComponent} from "./visualizar/referencial-visualizar.component";
import {
    AutoCompleteModule,
    ButtonModule,
    CardModule,
    DropdownModule, InputMaskModule,
    InputTextModule,
    TabViewModule
} from 'primeng/primeng';


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
        RouterModule.forChild(ReferencialRoutes),
        TabViewModule,
        InputMaskModule
    ],
    declarations: [
        ReferencialIncluirComponent,
        ReferencialListarComponent,
        ReferencialAlterarComponent,
        ReferencialVisualizarComponent
    ],

})
export class ReferencialModule {
}
