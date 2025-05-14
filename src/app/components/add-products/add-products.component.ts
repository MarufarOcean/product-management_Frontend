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
  newProduct: any = { name: '', description: '', price: 0, stock: '', details :'', photoUrl: '' };
  photo : null | File = null; // Property to store the selected file
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
    

    // const formData = new FormData();
    // formData.append('name', this.newProduct.name.toString());
    // formData.append('description', this.newProduct.description.toString());
    // formData.append('price', this.newProduct.price);
    // formData.append('stock', this.newProduct.stock.toString());
    // formData.append('details', this.newProduct.details.toString());
    // if (this.newProduct.photo) {
    //   formData.append('photo', this.newProduct.photo); // Append the file
    // }
    //console.log('Payload being sent:', formData); 
    if (this.isEditMode) {
      // Update the product
     // console.log('FormData: ' + formData);
      this.productService.updateProduct(this.productId ,this.newProduct, this.photo!).subscribe(() => {
        //alert('Product updated successfully!');
        
        this.router.navigate(['/products']); // Navigate back to the product list after updating
      });
    } else {
      // Add a new product
      //console.log('FormData: ' + formData);
      this.productService.addProduct(this.newProduct, this.photo!).subscribe(() => {
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
  // Handle file selection
  onPhotoSelected(event: any) {
  const file = event.target.files[0];
  this.photo = file;

  // Preview logic
  if (file) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
            this.imagePreview = e.target.result.split(',')[1]; // Extract Base64 string
            this.newProduct.photoUrl = e.target.result; // Set the preview to the Base64 string
        };
        reader.readAsDataURL(file);
    }
  }

}
