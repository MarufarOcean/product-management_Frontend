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
import { AuthGuard } from './app/guards/auth.guard';
import { PreviewComponent } from './app/components/preview/preview.component';
import { ProductListPublicComponent } from './app/components/product-list-public/product-list-public.component';
import { OrderComponent } from './app/components/order/order.component';
import { SupplyComponent } from './app/components/supply/supply.component';
import { AddSupplyComponent } from './app/components/add-supply/add-supply.component';
import { DashboardComponent } from './app/components/dashboard/dashboard.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([
      { path: '', component: LoginComponent },
      { path: 'products', component: ProductListComponent },
      { path: 'add-product', component: AddProductsComponent, canActivate: [AuthGuard] },
      { path: 'register', component: RegisterComponent },
      { path: 'preview', component: PreviewComponent },
      { path: 'productsPublic', component: ProductListPublicComponent },
      { path: 'order', component: OrderComponent},
      { path: 'supply', component: SupplyComponent },
      { path: 'add-supply', component: AddSupplyComponent },
      { path: 'dashboard',component: DashboardComponent }
    ]),
    importProvidersFrom(FormsModule, HttpClientModule)
  ]
}).catch(err => console.error(err));
