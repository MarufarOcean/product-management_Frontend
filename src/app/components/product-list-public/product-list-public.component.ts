import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye,faCartShopping } from '@fortawesome/free-solid-svg-icons'
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
  faCartShopping = faCartShopping ;
  products: any[] = [];
  newProduct: any = { name: '', price: 0 };
  selectedProduct: any = null; // for Update

  pageSize = 10;
  currentPage = 1;
  pagedProducts: any[] = [];
  totalPages = 1;

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit() {
    this.loadProducts();
    this.updatePagedProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe(
      (data) => {
        this.products = data;
        this.updatePagedProducts();
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

  updatePagedProducts() {
      this.totalPages = Math.ceil(this.products.length / this.pageSize);
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      this.pagedProducts = this.products.slice(start, end);
  }
  goToPage(page: number) {
      if (page < 1 || page > this.totalPages) return;
      this.currentPage = page;
      this.updatePagedProducts();
  }
  

}
