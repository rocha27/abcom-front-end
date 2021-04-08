import {NgModule} from '@angular/core';
import {SharedModule} from '@mapa/core';
import {CardModule} from 'primeng/card';
import {HomeRouting} from './home.routing';
import {PanelModule} from 'primeng/panel';
import {HomeComponent} from './home.component';

@NgModule({
    imports: [SharedModule, HomeRouting, CardModule, PanelModule],
    declarations: [HomeComponent]
})
export class HomeModule {
}
