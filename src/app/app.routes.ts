import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlertDemoComponent } from './alert/alert.demo';
import { ApplicationMenuLazyDemoComponent } from './application-menu/application-menu-lazy.demo';
import { CalendarDemoComponent } from './calendar/calendar.demo';
import { CalendarLegendDemoComponent } from './calendar/calendar-legend.demo';
import { CalendarUpdatedDemoComponent } from './calendar/calendar-updated.demo';
import { ErrorDemoComponent } from './error/error.demo';
import { HeaderTabsDemoComponent } from './header/header-tabs.demo';
import { HeaderToggleButtonsDemoComponent } from './header/header-toggle-buttons.demo';
import { HeaderToolbarAndTabsDemoComponent } from './header/header-toolbar-and-tabs.demo';
import { HeaderToolbarDemoComponent } from './header/header-toolbar.demo';
import { MessageDemoComponent } from './message/message.demo';
import { ModalDialogDemoComponent } from './modal-dialog/modal-dialog.demo';
import { NotificationDemoComponent } from './notification/notification.demo';
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
import { ApplicationMenuRoleSwitcherDemoComponent } from './application-menu/application-menu-roleswitcher.demo';
import { ApplicationMenuTestPerfDemoComponent } from './application-menu/application-menu-test-performance.demo';
import { WeekViewDemoComponent } from './week-view/week-view.demo';
import { VehiculeComponent } from './wizard/vehicule/vehicule.component';
import{InspectionComponent} from './wizard/inspection/inspection.component'
import { CustomerSampleComponent } from './wizard/customer/customer.component';
export const routes: Routes = [
  { path: '', redirectTo: 'wizard', pathMatch: 'full' }, // default
  { path: 'alert', component: AlertDemoComponent },
  
  { path: 'application-lazy-menu', component: ApplicationMenuLazyDemoComponent },
  { path: 'application-menu-roleswitcher', component: ApplicationMenuRoleSwitcherDemoComponent },
  { path: 'application-menu-test-performance', component: ApplicationMenuTestPerfDemoComponent },
  { path: 'calendar-monthview', component: CalendarDemoComponent },
  { path: 'calendar-monthview-legend', component: CalendarLegendDemoComponent },
  { path: 'calendar-updated', component: CalendarUpdatedDemoComponent },
  { path: 'error', component: ErrorDemoComponent },
  { path: 'header-tabs', component: HeaderTabsDemoComponent },
  { path: 'header-toggle-buttons', component: HeaderToggleButtonsDemoComponent },
  { path: 'header-toolbar', component: HeaderToolbarDemoComponent },
  { path: 'header-toolbar-tabs', component: HeaderToolbarAndTabsDemoComponent },
  { path: 'message', component: MessageDemoComponent },
  { path: 'modal-dialog', component: ModalDialogDemoComponent },
  { path: 'notification', component: NotificationDemoComponent },
  { path: 'tabs-basic', component: TabsBasicDemoComponent },
  { path: 'tabs-counts', component: TabsCountsDemoComponent },
  { path: 'tabs-datadriven', component: TabsDataDrivenDemoComponent },
  { path: 'tabs-dismissible', component: TabsDismissibleDemoComponent },
  { path: 'tabs-dropdown', component: TabsDropdownDemoComponent },
  { path: 'tabs-dynamic', component: TabsDynamicDemoComponent },
  { path: 'tabs-resize', component: TabsResizeDemoComponent },
  { path: 'tabs-module', component: TabsModuleDemoComponent },
  { path: 'tabs-vertical', component: TabsVerticalDemoComponent },
  { path: 'test-tabs-basic', component: TestTabsBasicComponent },
  { path: 'toast', component: ToastDemoComponent },
  { path: 'week-view', component: WeekViewDemoComponent },
  { path: 'wizard', component: WizardDemoComponent },
  { path: 'customer', component: CustomerSampleComponent },
  { path: 'vehicule', component: VehiculeComponent },
  { path: 'Inspection', component: InspectionComponent }

];

/**
 * To test the application using the hashing routing strategy, swap the two lines below.
 */
export const AppRoutingModule: ModuleWithProviders<RouterModule> = RouterModule.forRoot(routes, { useHash: false, relativeLinkResolution: 'legacy' });
