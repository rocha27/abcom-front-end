import {Routes} from '@angular/router';
import {AdminLayoutComponent} from "@mapa/core";
import {ProdutoListarComponent} from "./listar/produto-listar.component";
import {ProdutoIncluirComponent} from "./incluir/produto-incluir.component";
import {ProdutoAlterarComponent} from "./alterar/produto-alterar.component";
import {ProdutoVisualizarComponent} from "./visualizar/produto-visualizar.component";

export const ProdutoRoutes: Routes = [
    {
        path: '',
        component: AdminLayoutComponent,
        children: [
            {
                path: '',
                component: ProdutoListarComponent,
            },
            {
                path: 'incluir',
                component: ProdutoIncluirComponent,
            },
            {
                path: 'alterar/:product.id',
                component: ProdutoAlterarComponent,
            },
            {
                path: 'visualizar/:product.id',
                component: ProdutoVisualizarComponent,
            },
        ]
    }
];
