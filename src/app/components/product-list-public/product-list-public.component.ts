import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list-public',
  standalone: true,
  imports: [CommonModule, HttpClientModule,FormsModule,FontAwesomeModule],
  templateUrl: './product-list-public.component.html',
  styleUrl: './product-list-public.component.css'
})
export class ProductListPublicComponent implements OnInit {
  faEye = faEye ;
  products: any[] = [];
  newProduct: any = { name: '', price: 0 };
  selectedProduct: any = null; // for Update
  imagePreview: (string | null)[] = []; // Property to store the image preview

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe(
      (data) => {
        this.products = data;
        // Set imagePreview to an array of all product photoUrls
        this.imagePreview = this.products.map(product => product.photoUrl || null);
        console.log("This is product list: ", this.products);
      },
      (error) => {
        console.error('Error loading products:', error);
      }
    );
  }

  // product preview
  previwProduct(product: any) {
    this.router.navigate(['/preview'], { queryParams: { id: product.id } });
  }

  

}
