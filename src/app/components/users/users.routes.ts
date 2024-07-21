import { Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { MainNavComponent } from "./dashboard/main-nav/main-nav.component";
import { BarbersComponent } from "./dashboard/barbers/barbers.component";
import { UserComponent } from "./dashboard/users/user/user.component";
import { BoxesComponent } from "./dashboard/boxes/boxes.component";
import { LayoutComponent } from "./dashboard/layout/layout.component";
import { DetailBarberComponent } from "./dashboard/barbers/details/detail.barber.component";

export const USERS_ROUTES: Routes = [
    {
        path: 'Dashboard', component: LayoutComponent, children: [
            { path: 'Boxes', component: BoxesComponent },
            { path: 'Barbers', component: BarbersComponent },
            { path: 'Users', component: UserComponent },
            { path: 'Barbers/Details', component: DetailBarberComponent },
        ]
    },
    {
        path: 'Login', component: LoginComponent
    }
];