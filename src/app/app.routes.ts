import { Routes } from '@angular/router';
import { NotfoundComponent } from './notfound/notfound.component';

export const routes: Routes = [
    {
        path:'',
        redirectTo:'home',
        pathMatch:'full'
    },{
        path:'home',
        loadChildren:()=>import('./module/dashboard/dashboard.module').then(m=>m.DashboardModule)
    },{
        path:'**',
        component:NotfoundComponent
    }
];
