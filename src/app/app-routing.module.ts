import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ArrowMeetingComponent} from "./arrow-meeting/arrow-meeting.component";


const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: ArrowMeetingComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
