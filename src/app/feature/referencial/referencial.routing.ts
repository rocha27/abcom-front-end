import {Routes} from '@angular/router';
import {AdminLayoutComponent} from "@mapa/core";
import {ReferencialListarComponent} from "./listar/referencial-listar.component";
import {ReferencialIncluirComponent} from "./incluir/referencial-incluir.component";
import {ReferencialAlterarComponent} from "./alterar/referencial-alterar.component";
import {ReferencialVisualizarComponent} from "./visualizar/referencial-visualizar.component";


export const ReferencialRoutes: Routes = [
    {
        path: '',
        component: AdminLayoutComponent,
        children: [
            {
                path: '',
                component: ReferencialListarComponent
            },
            {
                path: 'incluir',
                component: ReferencialIncluirComponent
            },
            {
                path: 'alterar/:reference.id',
                component: ReferencialAlterarComponent,
            },
            {
                path: 'visualizar/:reference.id',
                component: ReferencialVisualizarComponent,
            },
        ]
    }
];
