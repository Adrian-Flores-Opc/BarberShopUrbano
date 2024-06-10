import { Routes } from "@angular/router";
import { LayoutComponent } from "./layout/layout.component";
import { LandingComponent } from "./landing/landing.component";
import { BookingsComponent } from "./bookings/bookings.component";
import { ContactsComponent } from "./contacts/contacts.component";

export const CUSTOMERS_ROUTES: Routes = [ 
    {
        path: '', component: LayoutComponent, children: [
            { path: '', component: LandingComponent },
            { path: 'Bookings', component: BookingsComponent },
            { path: 'Contacts', component: ContactsComponent }
        ]
    }
];