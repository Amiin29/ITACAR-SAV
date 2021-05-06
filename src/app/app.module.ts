import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
  CommonModule
} from '@angular/common';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routes';
// @ts-ignore
import { SohoComponentsModule } from 'ids-enterprise-ng';

import { AlertDemoComponent } from './alert/alert.demo';
import { ApplicationMenuDemoComponent } from './application-menu/application-menu.demo';
import { ApplicationMenuLazyDemoComponent } from './application-menu/application-menu-lazy.demo';
import { ApplicationMenuLazyMenuDemoComponent } from './application-menu/application-menu-lazy-menu.demo';
import { ApplicationMenuLazyService } from './application-menu/application-menu-lazy-service.demo';
import { CalendarDemoComponent } from './calendar/calendar.demo';
import { CalendarLegendDemoComponent } from './calendar/calendar-legend.demo';
import { CalendarUpdatedDemoComponent } from './calendar/calendar-updated.demo';
import { ErrorDemoComponent } from './error/error.demo';
import { HeaderTabsDemoComponent } from './header/header-tabs.demo';
import { HeaderToggleButtonsDemoComponent } from './header/header-toggle-buttons.demo';
import { HeaderToolbarAndTabsDemoComponent } from './header/header-toolbar-and-tabs.demo';
import { HeaderToolbarDemoComponent } from './header/header-toolbar.demo';
import { SohoHeaderDemoComponent } from './header/header.demo';
import { MessageDemoComponent } from './message/message.demo';
import { ModalDialogDemoModule } from './modal-dialog/modal-dialog.demo.module';
import { NotificationDemoComponent } from './notification/notification.demo';
import { PersonalizeMenuComponent } from './personalize-menu/personalize-menu.component';
import { SohoHeaderDynamicDemoComponent } from './header/header-dynamic.demo';
import { SohoMastheadDemoComponent } from './masthead/masthead.demo';
import { SohoRenderLoopService } from '../../projects/ids-enterprise-ng/src/lib/renderLoop';
import { TabsBasicDemoComponent } from './tabs/tabs-basic.demo';
import { TabsCountsDemoComponent } from './tabs/tabs-counts.demo';
import { TabsDataDrivenDemoComponent } from './tabs/tabs-datadriven.demo';
import { TabsDismissibleDemoComponent } from './tabs/tabs-dismissible.demo';
import { TabsDropdownDemoComponent } from './tabs/tabs-dropdown.demo';
import { TabsDynamicDemoComponent } from './tabs/tabs-dynamic.demo';
import { TabsResizeDemoComponent } from './tabs/tabs-resize.demo';
import { TabsModuleDemoComponent } from './tabs/tabs-module.demo';
import { TabsVerticalDemoComponent } from './tabs/tabs-vertical.demo';
import { TestTabsBasicComponent } from './tabs/test-tabs-basic.demo';
import { ToastDemoComponent } from './toast/toast.demo';

import { WizardDemoComponent } from './wizard/wizard.demo';


import{SampleViewerComponent,SampleViewerDialogComponent} from './sample-viewer/sample-viewer.component'

import { ApplicationMenuRoleSwitcherDemoComponent } from './application-menu/application-menu-roleswitcher.demo';
import { ApplicationMenuTestPerfDemoComponent } from './application-menu/application-menu-test-performance.demo';
import { WeekViewDemoComponent } from './week-view/week-view.demo';
import {M3OdinModule} from "@infor-up/m3-odin-angular";
import {LocaleInitializerModule} from "./locale-initializer/locale-initializer.module";
import {CustomerSampleComponent} from './wizard/customer/customer.component'

import { VehiculeComponent } from './wizard/vehicule/vehicule.component'
import { from } from 'rxjs';;
import { AddVehiculeComponent } from './wizard/vehicule/add-vehicule/add-vehicule.component'
import{GarantitVehiculeComponent}from './wizard/vehicule/garantit-vehicule/garantit-vehicule.component'

import { CompteurVehiculeComponent } from './wizard/vehicule/compteur-vehicule/compteur-vehicule.component'
;
import { InformationBasiqueCsutomerComponent } from './wizard/customer/information-basique-csutomer/information-basique-csutomer.component'
;
import { DetailsCustomerComponent } from './wizard/customer/details-customer/details-customer.component'
;
import { InformationFinancereComponent } from './wizard/customer/information-financere/information-financere.component'
;
import { AddCustomerComponent } from './wizard/customer/add-customer/add-customer.component'
;
import { StatistiqueComponent } from './statistique/statistique.component'
;
import { OrdreTravailMoisComponent } from './ordre-travail-mois/ordre-travail-mois.component'
;
import { StatByModelComponent } from './stat-by-model/stat-by-model.component'
;
import { StatByStatusComponent } from './stat-by-status/stat-by-status.component'
@NgModule({
  declarations: [
    AppComponent,
    AlertDemoComponent,
    ApplicationMenuDemoComponent,
    ApplicationMenuLazyDemoComponent,
    ApplicationMenuLazyMenuDemoComponent,
    ApplicationMenuRoleSwitcherDemoComponent,
    ApplicationMenuTestPerfDemoComponent,
    CalendarDemoComponent,
    CalendarLegendDemoComponent,
    CalendarUpdatedDemoComponent,
    HeaderTabsDemoComponent,
    HeaderToggleButtonsDemoComponent,
    HeaderToolbarAndTabsDemoComponent,
    HeaderToolbarDemoComponent,
    MessageDemoComponent,
    NotificationDemoComponent,
    PersonalizeMenuComponent,
    SohoHeaderDynamicDemoComponent,
    SohoHeaderDemoComponent,
    SohoMastheadDemoComponent,
    TabsBasicDemoComponent,
    TabsCountsDemoComponent,
    TabsDataDrivenDemoComponent,
    TabsDismissibleDemoComponent,
    TabsDropdownDemoComponent,
    TabsDynamicDemoComponent,
    TabsResizeDemoComponent,
    TabsModuleDemoComponent,
    TabsVerticalDemoComponent,
    TestTabsBasicComponent,
    ToastDemoComponent,
    WeekViewDemoComponent,
    WizardDemoComponent,
    CustomerSampleComponent,
    SampleViewerComponent,
    SampleViewerDialogComponent,
    VehiculeComponent,
    AddVehiculeComponent,
     GarantitVehiculeComponent,
     InformationBasiqueCsutomerComponent,
     DetailsCustomerComponent,
     InformationFinancereComponent,

    CompteurVehiculeComponent,

    AddCustomerComponent,       
    OrdreTravailMoisComponent,
    StatistiqueComponent,
    StatByModelComponent,
    StatByStatusComponent,
  ],
    
     
  imports: [
    AppRoutingModule,
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    ModalDialogDemoModule,
    ReactiveFormsModule,
    SohoComponentsModule,
    M3OdinModule,
    LocaleInitializerModule
  ],
  providers: [
    ApplicationMenuLazyService,
    SohoRenderLoopService
  ],
  entryComponents: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
