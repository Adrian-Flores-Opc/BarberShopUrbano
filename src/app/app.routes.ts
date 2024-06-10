import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '', loadChildren: () => import('./components/customers/customers.routes').then(m => m.CUSTOMERS_ROUTES)
    },
    {
        path: 'Users', loadChildren: () => import('./components/users/users.routes').then(m => m.USERS_ROUTES)
    }
];
