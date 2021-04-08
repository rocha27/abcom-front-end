import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminLayoutComponent, BlankLayoutComponent, MapaCoreModule} from '@mapa/core';

const routes: Routes = [
    {
        path: '',
        component: AdminLayoutComponent,
        children: [
            {
                path: '',
                loadChildren: './feature/home/home.module#HomeModule'
            }
        ]
    },
    {
        path: 'produto',
        component: BlankLayoutComponent,
        children: [
            {
                path: '',
                loadChildren: './feature/produto/produto.module#ProdutoModule'
            }
        ]
    },
    {
        path: 'referencial',
        component: BlankLayoutComponent,
        children: [
            {
                path: '',
                loadChildren: './feature/referencial/referencial.module#ReferencialModule'
            }
        ]
    },
    {
        path: 'ilustracao',
        component: BlankLayoutComponent,
        children: [
            {
                path: '',
                loadChildren: './feature/ilustracao/ilustracao.module#IlustracaoModule'
            }
        ]
    },

    {
        path: 'modelo-documento',
        component: BlankLayoutComponent,
        children: [
            {
                path: '',
                loadChildren: './feature/modelo-documento/modelo-documento.module#ModeloDocumentoModule'
            }
        ]
    },

    {
        path: 'documento',
        component: BlankLayoutComponent,
        children: [
            {
                path: '',
                loadChildren: './feature/documento/documento.module#DocumentoModule'
            }
        ]
    },
    {
        path: 'item',
        component: BlankLayoutComponent,
        children: [
            {
                path: '',
                loadChildren: './feature/item/item.module#ItemModule'
            }
        ]
    },

    {
        path: 'grupo-produto',
        component: BlankLayoutComponent,
        children: [
            {
                path: '',
                loadChildren: './feature/grupo-produto/grupo-produto.module#GrupoProdutoModule'
            }
        ]
    }

];

@NgModule({
    imports: [
        MapaCoreModule,
        RouterModule.forRoot(routes, {
            useHash: true,
            enableTracing: true
        })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}



