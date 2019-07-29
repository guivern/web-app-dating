import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { MemberListComponent } from './member-list/member-list.component';
import { HomeComponent } from './home/home.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
    // el orden es importante, puesto que el enrutamiento
    // se evalua secuancialmente con cada ruta
    // por eso el comodín se pone como ultima ruta
    { path: 'home', component: HomeComponent },
    { path: 'members', component: MemberListComponent },
    { path: 'messages', component: MessagesComponent },
    { path: 'lists', component: ListsComponent },
    { path: '**', redirectTo: 'home', pathMatch: 'full' }
];
