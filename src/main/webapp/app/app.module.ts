import './vendor.ts';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2Webstorage } from 'ngx-webstorage';

import { Ngocjr7BlogSharedModule, UserRouteAccessService } from './shared';
import { Ngocjr7BlogAppRoutingModule} from './app-routing.module';
import { Ngocjr7BlogHomeModule } from './home/home.module';
import { Ngocjr7BlogAdminModule } from './admin/admin.module';
import { Ngocjr7BlogAccountModule } from './account/account.module';
import { Ngocjr7BlogEntityModule } from './entities/entity.module';
import { customHttpProvider } from './blocks/interceptor/http.provider';
import { PaginationConfig } from './blocks/config/uib-pagination.config';

// jhipster-needle-angular-add-module-import JHipster will add new module here

import {
    JhiMainComponent,
    NavbarComponent,
    FooterComponent,
    ProfileService,
    PageRibbonComponent,
    ActiveMenuDirective,
    ErrorComponent, SidebarWidgetsColComponent
} from './layouts';
import { SidebarNavComponent } from './layouts/sidebar-nav/sidebar-nav.component';

@NgModule({
    imports: [
        BrowserModule,
        Ngocjr7BlogAppRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-'}),
        Ngocjr7BlogSharedModule,
        Ngocjr7BlogHomeModule,
        Ngocjr7BlogAdminModule,
        Ngocjr7BlogAccountModule,
        Ngocjr7BlogEntityModule,
        // jhipster-needle-angular-add-module JHipster will add new module here
    ],
    declarations: [
        JhiMainComponent,
        NavbarComponent,
        ErrorComponent,
        PageRibbonComponent,
        ActiveMenuDirective,
        FooterComponent,
        SidebarNavComponent,
        SidebarWidgetsColComponent
    ],
    providers: [
        ProfileService,
        customHttpProvider(),
        PaginationConfig,
        UserRouteAccessService
    ],
    bootstrap: [ JhiMainComponent ]
})
export class Ngocjr7BlogAppModule {}
