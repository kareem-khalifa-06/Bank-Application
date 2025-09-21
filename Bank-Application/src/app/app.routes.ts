import { authGuard } from './../core/guards/auth.guard';
import { Routes } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { UserHomeComponent } from '../components/user-home/user-home.component';
import { UserAccountComponent } from '../components/user-account/user-account.component';
import { UserTransactionComponent } from '../components/user-transaction/user-transaction.component';
import { UserTransferComponent } from '../components/user-transfer/user-transfer.component';
import { AdminHomeComponent } from '../components/admin-home/admin-home.component';

import { NotFoundComponent } from '../components/not-found/not-found.component';
import { AdminDashboardComponent } from '../components/admin-dashboard/admin-dashboard.component';
import { UserLayoutComponent } from '../layouts/user-layout/user-layout.component';
import { AdminLayoutComponent } from '../layouts/admin-layout/admin-layout.component';

export const routes: Routes = [
  { path: '', redirectTo:'login',pathMatch:'full' },
  { path: 'login', component: LoginComponent,title:'Login' },

  {
    path: 'user',canActivate:[authGuard],component:UserLayoutComponent,
    children: [
      { path: '', redirectTo: 'home',pathMatch:'full' },
      { path: 'home', component: UserHomeComponent ,title:'Home Page'},
      { path: 'account', component: UserAccountComponent, title:'Acount Overview' },
      { path: 'transactions', component: UserTransactionComponent,title:'Transactions' },
      { path: 'transfer', component: UserTransferComponent,title:'Transfer Funds' },
    ],
  },

  {
    path: 'admin',canActivate:[authGuard],component:AdminLayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: AdminHomeComponent ,title:'Home Page'},
      { path: 'admin-panel', component:AdminDashboardComponent, title:'Dashboard'},
    ],
  },

  { path: '**', component: NotFoundComponent,title:'not Found'},
];
