import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RoomListComponent } from './components/rooms/room-list/room-list.component';
import { Constants } from './models/constants';
import { ChangeRequestFromComponent } from './components/booking/CR-form/change-request-from.component';
import { BookingListComponent } from './components/booking/booking-list/booking-list.component';
import { NotAuthorizedComponent } from '@shared/pages/not-authorized/not-authorized.component';
import { NotFoundComponent } from '@shared/pages/not-found/not-found.component';
import { ForbiddenComponent } from '@shared/pages/forbidden/forbidden.component';
import { BackendAuthGuard } from '@core/guards/backend-auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

  { path: 'login', component: RoomListComponent },

  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [MsalGuard,BackendAuthGuard],
    children: [
      { path: '', redirectTo: 'rooms', pathMatch: 'full' },
      { path: 'rooms', component: RoomListComponent },
      { path: 'bookings/manage', component: BookingListComponent },
      { path: 'bookings/new', component: ChangeRequestFromComponent },
      { path: 'bookings/edit/:id', component: ChangeRequestFromComponent }
    ],
  },
  { path: 'not-authorized', component: NotAuthorizedComponent },
  { path: 'forbidden', component: ForbiddenComponent },
  { path: '404', component: NotFoundComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
