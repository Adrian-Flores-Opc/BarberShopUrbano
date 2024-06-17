import { Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { MainNavComponent } from "./dashboard/main-nav/main-nav.component";
import { BarbersComponent } from "./dashboard/barbers/barbers.component";
import { BoxesComponent } from "./dashboard/boxes/boxes.component";

export const USERS_ROUTES: Routes = [
    {
        path: 'Dashboard', component: MainNavComponent, children: [
            { path: 'Main', component: MainNavComponent },
            { path: 'Boxes', component: BoxesComponent },
            { path: 'Barbers', component: BarbersComponent },
        ]
    },
    {
        path: 'Login', component: LoginComponent
    }
];