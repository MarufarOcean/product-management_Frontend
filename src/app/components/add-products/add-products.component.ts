import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { HttpClientModule } from '@angular/common/http';  
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-products',
  standalone: true,
  templateUrl: './add-products.component.html',
  styleUrl: './add-products.component.css',
  imports: [CommonModule, HttpClientModule,FormsModule],
})
export class AddProductsComponent implements OnInit {
  products: any[] = [];
  productId: any;
  newProduct: any = { name: '', description: '', price: 0, stock: '' };
  isEditMode: boolean = false; 
  constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute ) { }
  ngOnInit(): void {
    // Retrieve the 'id' from query parameters
    this.route.queryParams.subscribe(params => {
      this.productId = params['id']; // Get the 'id' parameter
      if (this.productId ) {
        this.isEditMode = true; // Set edit mode to true
        this.getProductById(this.productId ); // Load the product details
      }
    });
  }

  

  // Add new product
  addProduct() {
    if (!this.newProduct.name || this.newProduct.price <= 0 || !this.newProduct.description || this.newProduct.stock < 0) {
      alert("Please enter a valid product name and price.");
      return;
    }
    //console.log('Payload being sent:', this.newProduct); 
    if (this.isEditMode) {
      // Update the product
      this.productService.updateProduct(this.productId ,this.newProduct).subscribe(() => {
        //alert('Product updated successfully!');
        this.router.navigate(['/products']); // Navigate back to the product list after updating
      });
    } else {
      // Add a new product
      this.productService.addProduct(this.newProduct).subscribe(() => {
        //alert('Product added successfully!');
        this.router.navigate(['/products']); // Navigate back to the product list after adding
      });
    }
  }

  backToProductList() {
    this.router.navigate(['/products']);
  }

  getProductById(productId: number) {
    this.productService.getProductById(productId).subscribe((product: any) => {
      console.log('Product details:', product); // Log the product details
      this.newProduct = product;
    }
    );
  }

}
