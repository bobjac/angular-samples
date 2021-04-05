import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { MyLibComponent } from 'my-lib';
import { DomSanitizer } from '@angular/platform-browser';
import {SidenavComponent} from './sidenav/sidenav.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-showcase';
  // added for material nav
  isExpanded = true;
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer) {

      this.registerIcons(matIconRegistry, domSanitizer);
  }
  registerIcons(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
    const iconList: string[] = [
      'account-box-multiple',
      'account-group',
      'bullhorn-outline',
      'chart-donut-variant',
      'checkbox-multiple-marked-outline',
      'clipboard-account-outline',
      'credit-card-multiple',
      'currency-usd',
      'currency-usd-off',
      'doctor',
      'download-multiple',
      'eye',
      'file-chart',
      'file-question',
      'filter-variant',
      'finance',
      'flag',
      'format-list-bulleted',
      'help-circle-outline',
      'help-circle',
      'help-rhombus-outline',
      'message-outline',
      'key',
      'rss',
      'timeline-text',
      'trash-can-outline',
      'view-dashboard',
      'wrench',
      'cancel',
      'information',
      'check-circle',
      'check-circle-outline'
    ];

    iconList.forEach(icon => {
      this.matIconRegistry.addSvgIcon(
        icon,
        this.domSanitizer.bypassSecurityTrustResourceUrl('assets/custom-material-design/' + icon + '.svg')
      );
    });
}
}
