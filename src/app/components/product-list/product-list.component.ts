import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { HttpClientModule } from '@angular/common/http';  
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { faTrash, faEye, faEdit, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-product-list',
  standalone: true,
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  imports: [CommonModule, HttpClientModule,FormsModule,FontAwesomeModule] 
})
export class ProductListComponent implements OnInit {
  faPlus = faPlus ;
  faEdit = faEdit ;
  faTrash = faTrash ;
  faEye = faEye ;
  products: any[] = [];
  newProduct: any = { name: '', price: 0 };
  isAdmin: boolean = false;
  selectedProduct: any = null; // for Update

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit() {
    this.loadProducts();
    const userRole = localStorage.getItem('userRole');
    console.log(userRole); // Check the user role in console
    this.isAdmin = userRole?.toLowerCase() === 'admin'; // Check if the user is an admin
  }

  goToAddProduct() {
    this.router.navigate(['/add-product']);
  }

  loadProducts() {
    this.productService.getProducts().subscribe(
      (data) => {
        this.products = data;
      },
      (error) => {
        console.error('Error loading products:', error);
      }
    );
  }
    
  
    // product edit
    editProduct(product: any) {
      this.router.navigate(['/add-product'], { queryParams: { id: product.id } });
    }

    // product edit
    previwProduct(product: any) {
      //this.router.navigate(['/preview'], { queryParams: { id: product.id } });
      this.router.navigate(['/preview'], { queryParams: { id: product.id } });
    }
    
  deleteProduct(id: number) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe(() => this.loadProducts());
      alert('Product deleted.');
    }
  }
}
