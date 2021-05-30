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
import { CalendarDemoComponent } from './calendar/calendar.demo';
import { CalendarLegendDemoComponent } from './calendar/calendar-legend.demo';
import { CalendarUpdatedDemoComponent } from './calendar/calendar-updated.demo';
import { HeaderToggleButtonsDemoComponent } from './header/header-toggle-buttons.demo';
import { HeaderToolbarAndTabsDemoComponent } from './header/header-toolbar-and-tabs.demo';
import { HeaderToolbarDemoComponent } from './header/header-toolbar.demo';
import { SohoHeaderDemoComponent } from './header/header.demo';
import { PersonalizeMenuComponent } from './personalize-menu/personalize-menu.component';
import { SohoHeaderDynamicDemoComponent } from './header/header-dynamic.demo';
import { SohoRenderLoopService } from '../../projects/ids-enterprise-ng/src/lib/renderLoop';

import { WizardDemoComponent } from './wizard/wizard.demo';


import{SampleViewerComponent,SampleViewerDialogComponent} from './sample-viewer/sample-viewer.component'
import {M3OdinModule} from "@infor-up/m3-odin-angular";
import {LocaleInitializerModule} from "./locale-initializer/locale-initializer.module";
import {CustomerSampleComponent} from './wizard/customer/customer.component'

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
import { OrdreTravailMoisComponent } from './statistique/ordre-travail-mois/ordre-travail-mois.component'
;
import { StatByModelComponent } from './statistique/stat-by-model/stat-by-model.component'
;
import { StatByStatusComponent } from './statistique/stat-by-status/stat-by-status.component'
;
import { UpdateRDVComponent } from './calendar/update-rdv/update-rdv.component'
;
import { AddRdvComponent } from './calendar/add-rdv/add-rdv.component'
;
import { ConsultRdvComponent } from './calendar/consult-rdv/consult-rdv.component';;
import { VehiculeComponent } from './wizard/vehicule/vehicule.component'
;
import { AddVehiculeComponent } from './wizard/vehicule/add-vehicule/add-vehicule.component'
;
import { GarantitVehiculeComponent } from './wizard/vehicule/garantit-vehicule/garantit-vehicule.component'
;
import { CompteurVehiculeComponent } from './wizard/vehicule/compteur-vehicule/compteur-vehicule.component';

import { DetailsParehouseComponent} from './piece-rechange/parehouse/details-parehouse/details-parehouse.component';
import { InspectionComponent } from './wizard/inspection/inspection.component'
import { DetailsInspectionComponent } from './wizard/details-inspection/details-inspection.component';;
import { ObservationComponent } from './wizard/details-inspection/observation/observation.component';
import { QualiteComponent } from './wizard/details-inspection/qualite/qualite.component';
import { ReceptionComponent } from './wizard/details-inspection/reception/reception.component';
import { PieceRechangeComponent } from './piece-rechange/piece-rechange.component';
import { RelationComponent } from './piece-rechange/relation/relation.component';
import { ParehouseComponent } from './piece-rechange/parehouse/parehouse.component';
import { AliasComponent } from './piece-rechange/alias/alias.component';
import { DetailsPieceRechangesComponent } from './piece-rechange/details-piece-rechanges/details-piece-rechanges.component';
import { OrderReparationComponent } from './wizard/order-reparation/order-reparation.component';
@NgModule({
  declarations: [
    AppComponent,
    CalendarDemoComponent,
    CalendarLegendDemoComponent,
    CalendarUpdatedDemoComponent,
    HeaderToggleButtonsDemoComponent,
    HeaderToolbarAndTabsDemoComponent,
    HeaderToolbarDemoComponent,
    PersonalizeMenuComponent,
    SohoHeaderDynamicDemoComponent,
    SohoHeaderDemoComponent,
    WizardDemoComponent,
    CustomerSampleComponent,
    SampleViewerComponent,
    SampleViewerDialogComponent,
    InformationBasiqueCsutomerComponent,
    DetailsCustomerComponent,
    InformationFinancereComponent,
    AddVehiculeComponent,
    AddCustomerComponent,       
    OrdreTravailMoisComponent,
    StatistiqueComponent,
    StatByModelComponent,
    StatByStatusComponent,
    UpdateRDVComponent,
    InformationBasiqueCsutomerComponent,
    AddRdvComponent,
    ConsultRdvComponent ,
      VehiculeComponent,
      GarantitVehiculeComponent,
      CompteurVehiculeComponent,
      InspectionComponent ,
      DetailsInspectionComponent ,
      QualiteComponent,
      ReceptionComponent,
      DetailsPieceRechangesComponent,
      ParehouseComponent,
      DetailsParehouseComponent,
      RelationComponent,
      PieceRechangeComponent,
      AliasComponent,
      ObservationComponent,
      OrderReparationComponent],
     
      
    
     
  imports: [
    AppRoutingModule,
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    SohoComponentsModule,
    M3OdinModule,
    LocaleInitializerModule
    
  ],
  providers: [
    SohoRenderLoopService,
    InformationBasiqueCsutomerComponent,
    GarantitVehiculeComponent,
    AddVehiculeComponent,
    
    
  ],
  entryComponents: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
