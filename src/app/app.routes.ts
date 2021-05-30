import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalendarDemoComponent } from './calendar/calendar.demo';
import { CalendarLegendDemoComponent } from './calendar/calendar-legend.demo';
import { CalendarUpdatedDemoComponent } from './calendar/calendar-updated.demo';
import { HeaderToggleButtonsDemoComponent } from './header/header-toggle-buttons.demo';
import { HeaderToolbarAndTabsDemoComponent } from './header/header-toolbar-and-tabs.demo';
import { HeaderToolbarDemoComponent } from './header/header-toolbar.demo';
import { WizardDemoComponent } from './wizard/wizard.demo';

import { VehiculeComponent } from './wizard/vehicule/vehicule.component';
import {StatistiqueComponent} from './statistique/statistique.component';
import { PieceRechangeComponent } from './piece-rechange/piece-rechange.component';
import { CustomerSampleComponent } from './wizard/customer/customer.component';
export const routes: Routes = [


  { path: '', redirectTo: 'wizard', pathMatch: 'full' }, // default
  {path:'StatistiqueComponent',component:StatistiqueComponent},
  { path: 'calendar-monthview', component: CalendarDemoComponent },
  { path: 'calendar-monthview-legend', component: CalendarLegendDemoComponent },
  { path: 'calendar-updated', component: CalendarUpdatedDemoComponent },
  { path: 'header-toggle-buttons', component: HeaderToggleButtonsDemoComponent },
  { path: 'header-toolbar', component: HeaderToolbarDemoComponent },
  { path: 'header-toolbar-tabs', component: HeaderToolbarAndTabsDemoComponent },
  { path: 'wizard', component: WizardDemoComponent },
  { path: 'customer', component: CustomerSampleComponent },
  { path: 'PieceRechangeComponent', component: PieceRechangeComponent },
  { path: 'vehicule', component: VehiculeComponent }
];

/**
 * To test the application using the hashing routing strategy, swap the two lines below.
 */
export const AppRoutingModule: ModuleWithProviders<RouterModule> = RouterModule.forRoot(routes, { useHash: false, relativeLinkResolution: 'legacy' });
