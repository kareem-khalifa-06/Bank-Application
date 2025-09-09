import { Routes } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { UserHomeComponent } from '../components/user-home/user-home.component';
import { UserAccountComponent } from '../components/user-account/user-account.component';
import { UserTransactionComponent } from '../components/user-transaction/user-transaction.component';
import { UserTransferComponent } from '../components/user-transfer/user-transfer.component';
import { AdminHomeComponent } from '../components/admin-home/admin-home.component';

import { NotFoundComponent } from '../components/not-found/not-found.component';
import { AdminDashboardComponent } from '../components/admin-dashboard/admin-dashboard.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },

  {
    path: 'user',
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: UserHomeComponent },
      { path: 'account', component: UserAccountComponent },
      { path: 'transaction', component: UserTransactionComponent },
      { path: 'transfer', component: UserTransferComponent },
    ],
  },

  {
    path: 'admin',
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: AdminHomeComponent },
      { path: 'panel', component:AdminDashboardComponent },
    ],
  },

  { path: '**', component: NotFoundComponent },
];
