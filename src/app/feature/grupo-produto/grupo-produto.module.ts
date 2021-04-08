import {NgModule} from "@angular/core";
import {MapaCoreModule} from "@mapa/core";
import {TableModule} from "primeng/table";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {GrupoProdutoRoutes} from "./grupo-produto.routing";
import {LoadingModule} from "../loading/loading.module";
import {GrupoProdutoListarComponent} from "./listar/grupo-produto-listar.component";
import {GrupoProdutoIncluirComponent} from "./incluir/grupo-produto-incluir.component";
import {GrupoProdutoAlterarComponent} from "./alterar/grupo-produto-alterar.component";
import {GrupoProdutoVisualizarComponent} from "./visualizar/grupo-produto-visualizar.component";
import {
    AutoCompleteModule,
    CalendarModule,
    CardModule,
    DropdownModule, FileUploadModule, InputTextareaModule,
    InputTextModule, PickListModule, RadioButtonModule,
    TabViewModule
} from 'primeng/primeng';
@NgModule({
    imports: [
        MapaCoreModule,
        CommonModule,
        FormsModule,
        CardModule,
        PickListModule,
        CalendarModule,
        DropdownModule,
        InputTextModule,
        AutoCompleteModule,
        TableModule,
        LoadingModule,
        RouterModule.forChild(GrupoProdutoRoutes),
        TabViewModule,
        FileUploadModule,
        RadioButtonModule,
        InputTextareaModule
    ],
    declarations: [
        GrupoProdutoIncluirComponent,
        GrupoProdutoAlterarComponent,
        GrupoProdutoListarComponent,
        GrupoProdutoVisualizarComponent,
    ],
})
export class GrupoProdutoModule {
}
