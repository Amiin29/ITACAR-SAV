import {
  Component,
  ChangeDetectionStrategy, AfterViewInit, OnInit, Input
} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {IUserContext} from "@infor-up/m3-odin";
import {SohoRenderLoopService} from "ids-enterprise-ng";
import {MIService, UserService} from "@infor-up/m3-odin-angular";

@Component({
  selector: 'application-menu-demo', // eslint-disable-line
  templateUrl: 'application-menu.demo.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ApplicationMenuDemoComponent implements OnInit{
  @Input('userContext') userContext: IUserContext | undefined;

  public triggers: Array<string> = [];
  public menu: Array<any> = [];
  public hasChangePasswordLink = true;

  constructor(private readonly renderLoop: SohoRenderLoopService, private miService: MIService, private userService: UserService) {
    // Init render loop manually for Angular applications
    // Ensures requestAnimationFrame is running outside of Angular Zone
    this.renderLoop.start();
  }
  async ngOnInit() {
    await console.log("this.userContext")
    await console.log(this.userContext)
  }
  public onMenuVisibility(visible: boolean): void {

  }
}
