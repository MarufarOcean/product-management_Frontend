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
  newProduct: any = { name: '', description: '', price: 0, stock: '', details :'', photo : null, photoUrl: '' };
  isEditMode: boolean = false; 
  imagePreview: string | ArrayBuffer | null = null; // Property to store the image preview

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
    

    const formData = new FormData();
    formData.append('name', this.newProduct.name);
    formData.append('description', this.newProduct.description);
    formData.append('price', this.newProduct.price.toString());
    formData.append('stock', this.newProduct.stock.toString());
    formData.append('details', this.newProduct.details);
    if (this.newProduct.photo) {
      formData.append('photo', this.newProduct.photo); // Append the file
    }
    //console.log('Payload being sent:', formData); 
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
      console.log('Product details 2:', product); // Log the product details
      this.newProduct = product;

      if (product.photoUrl) {
        this.imagePreview = product.photoUrl; // Set the image preview to the product's photo URL
      }else {
        console.warn('Photo URL is missing');
      }
    });
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.newProduct.image = file; // Store the selected file

      // Generate a preview of the image
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result; // Set the preview to the file's data URL
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  }

}
