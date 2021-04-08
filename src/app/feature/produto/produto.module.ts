import {NgModule} from "@angular/core";
import {MapaCoreModule} from "@mapa/core";
import {TableModule} from "primeng/table";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {ProdutoRoutes} from "./produto.routing";
import {LoadingModule} from "../loading/loading.module";
import {ProdutoListarComponent} from "./listar/produto-listar.component";
import {ProdutoIncluirComponent} from "./incluir/produto-incluir.component";
import {ProdutoAlterarComponent} from "./alterar/produto-alterar.component";
import {ProdutoVisualizarComponent} from "./visualizar/produto-visualizar.component";
import {
    AutoCompleteModule,
    CalendarModule,
    CardModule,
    DropdownModule, FileUploadModule,
    InputTextModule, RadioButtonModule,
    TabViewModule
} from "primeng/primeng";
@NgModule({
    imports: [
        MapaCoreModule,
        CommonModule,
        FormsModule,
        CardModule,
        CalendarModule,
        DropdownModule,
        InputTextModule,
        AutoCompleteModule,
        TableModule,
        LoadingModule,
        RouterModule.forChild(ProdutoRoutes),
        TabViewModule,
        FileUploadModule,
        RadioButtonModule
    ],
    declarations: [
        ProdutoIncluirComponent,
        ProdutoAlterarComponent,
        ProdutoListarComponent,
        ProdutoVisualizarComponent,
    ],
})
export class ProdutoModule {
}
