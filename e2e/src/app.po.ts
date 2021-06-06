import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo(route?: string) {
    const servePath = '/xx/';
    return browser.get(servePath + (route || ''));
  }

  getHeaderText() {
    return element(by.css('app-header-dynamic-demo soho-toolbar h1 span')).getText();
  }
}
