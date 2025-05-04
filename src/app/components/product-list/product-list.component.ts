import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { HttpClientModule } from '@angular/common/http';  
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  imports: [CommonModule, HttpClientModule,FormsModule] 
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  newProduct: any = { name: '', price: 0 };
  isAdmin: boolean = false;
  selectedProduct: any = null; // for Update

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit() {
    this.loadProducts();
    const userRole = localStorage.getItem('userRole');
    this.isAdmin = userRole === 'admin'; // Check if the user is an admin
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
      this.selectedProduct = { ...product }; // কপি তৈরি করা যাতে মূল ডাটা পরিবর্তন না হয়
    }
  
    // product update
    updateProduct() {
      if (!this.selectedProduct.name || this.selectedProduct.price <= 0) {
        alert("Please enter a valid product name and price.");
        return;
      }
      this.productService.updateProduct(this.selectedProduct.id, this.selectedProduct).subscribe(() => {
        this.loadProducts();
        this.selectedProduct = null; // Reset form
      });
    }

  deleteProduct(id: number) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe(() => this.loadProducts());
      alert('Product deleted.');
    }
  }
}
