import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

interface ROUTE {
  icon?: string;
  route?: string;
  title?: string;
  isDialogOpen?: boolean,
  claims?: string[];
  subRoutes?: ROUTE[];
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  isExpanded = true;
  myWorkRoutes: ROUTE[] = [
    {
      icon: 'view-dashboard', // tooltip if collapsed
      route: 'dashboard',
      title: 'Dashboards',
      isDialogOpen: false,
      subRoutes: [
        {
          title: 'My Dashboard',
          icon: 'chart-donut-variant',
          route: '/dashboards/mydashboard'
        },
        // {
        //   title: 'My KPIs',
        //   icon: 'finance',
        //   route: '/dashboard/mykpis'
        // },
        // {
        //   title: 'My Timeline',
        //   icon: 'timeline-text',
        //   route: '/dashboard/mytimeline'
        // }
      ]
    },
    {
      icon: 'format-list-bulleted',
      title: 'Worklists',
      isDialogOpen: false,
      route: 'worklist',
      subRoutes: [
        {
          title: 'Review',
          icon: 'flag',
          route: '/worklists/reviewworklist',
          claims: ['canAccessDashboard']
        },
        {
          title: 'Query',
          icon: 'help-rhombus-outline',
          route: '/worklists/queryworklist',
          claims: ['canAccessDashboard']
        }]
    },
    {
      icon: 'file-chart',
      route: 'reports',
      isDialogOpen: false,
      title: 'Reports',
      claims: ['canAccessReports'],
      subRoutes: [
        {
          title: 'Available Reports',
          icon: 'checkbox-multiple-marked-outline',
          route: '/reports/availablereports'
        },
        {
          title: 'Subscriptions',
          icon: 'rss',
          route: '/reports/subscriptions'
        },
      ]
    },
    {
      icon: 'wrench',
      route: 'admin', // Just set to the first child subnav for now since there is no admin landing page
      isDialogOpen: false,
      title: 'Maintenance',
      claims: ['canAccessMaintenance', 'role:SYSADMIN', 'role:CDSADMIN', 'role:CDSMGR'],
      subRoutes: [
        // {
        //   title: 'Assignment',
        //   icon: 'clipboard-account-outline',
        //   route: '/admin/assignment',
        //   claims: ['canAccessDashboard']
        // },
        // {
        //   title: 'Staff Groups',
        //   icon: 'account-box-multiple',
        //   route: '/admin/staff',
        //   claims: ['canAccessDashboard']
        // },
        // {
        //   title: 'Financial Groups',
        //   icon: 'currency-usd',
        //   route: '/admin/groups',
        //   claims: ['canAccessDashboard']
        // },
        {
          title: 'Query Templates',
          icon: 'file-question',
          route: '/maintenance/querytemplates',
          claims: ['canAccessDashboard']
        },
        // {
        //   title: 'Payer Maintenance',
        //   icon: 'credit-card-multiple',
        //   route: '/admin/payers',
        //   claims: ['canAccessDashboard']
        // },
        // {
        //   title: 'Provider Specialities',
        //   icon: 'doctor',
        //   route: '/admin/providers',
        //   claims: ['canAccessDashboard']
        // }
      ]
    }
  ];

  constructor(private router: Router) {

  }

  ngOnInit() {
  }

  stop(event: Event) {
    event.stopPropagation();
  }

  selectMenuItem(route) {
    this.router.navigate([route]);
  }
}
