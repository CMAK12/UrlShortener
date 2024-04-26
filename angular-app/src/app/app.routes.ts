import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AboutUrlComponent } from './components/about-url/about-url.component';
import { HomeComponent } from './components/home/home.component';
import { NewUrlFormComponent } from './components/new-url-form/new-url-form.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "abouturl/:id",
        component: AboutUrlComponent
    },
    {
        path: "add-url",
        component: NewUrlFormComponent
    }
];