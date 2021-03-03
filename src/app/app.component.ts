import {
  Component,
  HostBinding,
  ViewEncapsulation,
  ViewChild,
  AfterViewInit, OnInit
} from '@angular/core';

import { HeaderDynamicDemoRefService } from './header/header-dynamic-demo-ref.service';
// @ts-ignore
import { SohoPersonalizeDirective, SohoRenderLoopService, SohoApplicationMenuComponent } from 'ids-enterprise-ng';
import {IUserContext} from "@infor-up/m3-odin";
import {MIService, UserService} from "@infor-up/m3-odin-angular";

interface IKeyValue {
  key: string;
  value: string;
}

@Component({
  selector: 'body', // eslint-disable-line
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [HeaderDynamicDemoRefService],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements AfterViewInit, OnInit {
  /**
   * Local Storage Key
   */
  private static IS_APPLICATION_MENU_OPEN_KEY = 'is-application-menu-open';

  @ViewChild(SohoApplicationMenuComponent, { static: true })
  public applicationMenu?: SohoApplicationMenuComponent;

  @ViewChild(SohoPersonalizeDirective, { static: true }) personalize?: SohoPersonalizeDirective;

  @HostBinding('class.no-scroll') get isNoScroll() {
    return true;
  }

  /**
   * Include the uplift icons only if required by the current theme, this
   * is not quite perfect, as we need to listen for the theme change here.
   * Maybe wrap all the icons into their own component?
   */
  public useUpliftIcons = false;
  userContext = {} as IUserContext;
  public personalizeOptions: SohoPersonalizeOptions = {};

  constructor(private readonly renderLoop: SohoRenderLoopService, private miService: MIService, private userService: UserService) {
    // Init render loop manually for Angular applications
    // Ensures requestAnimationFrame is running outside of Angular Zone
    this.renderLoop.start();
  }

  async ngOnInit() {
    await this.userService.getUserContext().subscribe((userContext: IUserContext) => {
      this.userContext = userContext;
      console.log(userContext.NAME)
    });
  }

  ngAfterViewInit(): void {

    /**
     * Note: If using an input like [triggers]="[ '.application-menu-trigger' ]"
     * hookup the app menu trigger once the afterViewInit is called. This will
     * ensure that the toolbar has had a chance to create the application-menu-trugger
     * button.
     * this.applicationMenu.triggers = [ '.application-menu-trigger' ];
     */
    if (this.isApplicationMenuOpen) {
      this.applicationMenu?.openMenu(true, true);
    } else {
      this.applicationMenu?.closeMenu();
    }
  }

  public get isApplicationMenuOpen(): boolean {
    const valueString = localStorage.getItem(AppComponent.IS_APPLICATION_MENU_OPEN_KEY);
    return valueString ? (valueString === 'true') : true;
  }

  public set isApplicationMenuOpen(open: boolean) {
    localStorage.setItem(AppComponent.IS_APPLICATION_MENU_OPEN_KEY, open ? 'true' : 'false');
  }

  onChangeTheme(ev: SohoPersonalizeEvent) {
    this.useUpliftIcons = ev.data.theme === 'theme-uplift-light'
      || ev.data.theme === 'theme-uplift-dark'
      || ev.data.theme === 'theme-uplift-contrast';
  }

  public onMenuVisibility(visible: boolean): void {
    if (this.isApplicationMenuOpen !== visible) {
      this.isApplicationMenuOpen = visible;
    }
  }
}
