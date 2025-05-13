import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-preview',
  standalone: true,
  imports: [CommonModule, HttpClientModule,FormsModule,FontAwesomeModule],
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.css'
})
export class PreviewComponent {
  products: any[] = [];
  productId: any;
  newProduct: any = { name: '', description: '', price: 0, stock: '', details :'', photo : null, photoUrl: '' };
  imagePreview: string | ArrayBuffer | null = null; // Property to store the image preview

  constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Retrieve the 'id' from query parameters
    this.route.queryParams.subscribe(params => {
      this.productId = params['id']; // Get the 'id' parameter
      if (this.productId ) {
        this.getProductById(this.productId ); // Load the product details
      }
    });
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

  backToProductList() {
    this.router.navigate(['/products']);
  }

}
