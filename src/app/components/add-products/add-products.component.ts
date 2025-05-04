import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { HttpClientModule } from '@angular/common/http';  
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-products',
  standalone: true,
  templateUrl: './add-products.component.html',
  styleUrl: './add-products.component.css',
  imports: [CommonModule, HttpClientModule,FormsModule],
})
export class AddProductsComponent {
  products: any[] = [];
  newProduct: any = { name: '', description: '', price: 0, stock: '' };
  constructor(private productService: ProductService) { }

  // Add new product
  addProduct() {
    if (!this.newProduct.name || this.newProduct.price <= 0 || !this.newProduct.description || this.newProduct.stock < 0) {
      alert("Please enter a valid product name and price.");
      return;
    }
    //console.log('Payload being sent:', this.newProduct); 
    this.productService.addProduct(this.newProduct).subscribe({
      next: () => {
        alert("Product Added.");
        // Reset the form by creating a new object instance
        this.newProduct = { name: '', price: 0, description: '', stock: '' };
      },
      error: (err) => {
        console.error("Error adding product:", err);
        alert("Failed to add product. Please try again.");
      }
    });
  }

}
