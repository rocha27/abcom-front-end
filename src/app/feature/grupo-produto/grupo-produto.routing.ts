import {Routes} from '@angular/router';
import {AdminLayoutComponent} from "@mapa/core";
import {GrupoProdutoListarComponent} from "./listar/grupo-produto-listar.component";
import {GrupoProdutoIncluirComponent} from "./incluir/grupo-produto-incluir.component";
import {GrupoProdutoAlterarComponent} from "./alterar/grupo-produto-alterar.component";
import {GrupoProdutoVisualizarComponent} from "./visualizar/grupo-produto-visualizar.component";

export const GrupoProdutoRoutes: Routes = [
    {
        path: '',
        component: AdminLayoutComponent,
        children: [
            {
                path: '',
                component: GrupoProdutoListarComponent,
            },
            {
                path: 'incluir',
                component: GrupoProdutoIncluirComponent,
            },
            {
                path: 'alterar/:grupoProduto.id',
                component: GrupoProdutoAlterarComponent,
            },
            {
                path: 'visualizar/:grupoProduto.id',
                component: GrupoProdutoVisualizarComponent,
            },
        ]
    }
];
