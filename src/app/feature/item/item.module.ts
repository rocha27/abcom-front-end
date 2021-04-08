import {NgModule} from "@angular/core";
import {MapaCoreModule} from "@mapa/core";
import {TableModule} from "primeng/table";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {ItemRoutes} from "./item.routing";
import {LoadingModule} from "../loading/loading.module";
import {ItemListarComponent} from "./listar/item-listar.component";
import {ItemIncluirComponent} from './incluir/item-incluir.component';
import {ItemAlterarComponent} from "./alterar/item-alterar.component";
import {ItemVisualizarComponent} from "./visualizar/item-visualizar.component";
import {
    AutoCompleteModule,
    CalendarModule,
    CardModule,
    DropdownModule, EditorModule, FileUploadModule,
    InputTextModule, RadioButtonModule,
    TabViewModule
} from 'primeng/primeng';
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
        RouterModule.forChild(ItemRoutes),
        TabViewModule,
        FileUploadModule,
        RadioButtonModule,
        EditorModule
    ],
    declarations: [
        ItemIncluirComponent,
        ItemAlterarComponent,
        ItemListarComponent,
        ItemVisualizarComponent
    ],
})
export class ItemModule {
}
