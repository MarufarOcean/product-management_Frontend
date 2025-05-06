import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './app/components/login/login.component';
import { ProductListComponent } from './app/components/product-list/product-list.component';
import { AddProductsComponent } from './app/components/add-products/add-products.component';
import { RegisterComponent } from './app/components/register/register.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([
      { path: '', component: LoginComponent },
      { path: 'products', component: ProductListComponent },
      { path: 'add-product', component: AddProductsComponent},
      { path: 'register', component: RegisterComponent },
    ]),
    importProvidersFrom(FormsModule, HttpClientModule)
  ]
}).catch(err => console.error(err));
