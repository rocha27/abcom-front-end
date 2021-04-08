import {Routes} from '@angular/router';
import {AdminLayoutComponent} from "@mapa/core";
import {ItemListarComponent} from "./listar/item-listar.component";
import {ItemIncluirComponent} from "./incluir/item-incluir.component";
import {ItemAlterarComponent} from "./alterar/item-alterar.component";
import {ItemVisualizarComponent} from "./visualizar/item-visualizar.component";

export const ItemRoutes: Routes = [
    {
        path: '',
        component: AdminLayoutComponent,
        children: [
            {
                path: '',
                component: ItemListarComponent,
            },
            {
                path: 'incluir',
                component: ItemIncluirComponent,
            },
            {
                path: 'alterar/:product.id',
                component: ItemAlterarComponent,
            },
            {
                path: 'visualizar/:product.id',
                component: ItemVisualizarComponent,
            },
        ]
    }
];
