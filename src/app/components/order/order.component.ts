// order.component.ts
import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash, faCancel, faEdit, faPlus, faSave } from '@fortawesome/free-solid-svg-icons'
import { ProductService } from '../../services/product.service';
import { After } from 'v8';
declare var $: any; // Declare jQuery globally

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule, HttpClientModule,FormsModule,FontAwesomeModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit, AfterViewInit {

  faPlus = faPlus ;
  faEdit = faEdit ;
  faTrash = faTrash ;
  faCancel = faCancel ;
  faSave = faSave ;

  products: any[] = [];

  orders: any[] = [];
  newOrder = { productId: '', productName:'', quantity: '' };
  editOrderId: number | null = null;
  editOrder = { productId: '', quantity: '' };

  pageSize = 5;
  currentPage = 1;
  pagedOrders: any[] = [];
  totalPages = 1;

  constructor(private orderService: OrderService, private productService: ProductService) {}
  // constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.loadOrders();
    this.loadProducts();
    this.updatePagedOrders();
  }

  ngAfterViewInit() {
    $('#productDropdown').select2({
      placeholder: 'Select Product',
      allowClear: true
    });
  }

  loadProducts() {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
      console.log(this.products);
    });
  }

  loadOrders() {
    this.orderService.getOrders().subscribe(data => {
      this.orders = data;
      this.updatePagedOrders();
    });
  }

  createOrder() {
    this.orderService.createOrder(this.newOrder).subscribe(() => {
      this.newOrder = { productId: '', productName:'', quantity: '' };
      this.loadOrders();
    });
  }

  startEdit(order: any) {
    this.editOrderId = order.id;
    this.editOrder = { productId: order.productId, quantity: order.quantity };
  }

  updateOrder() {
    if (this.editOrderId !== null) {
      this.orderService.updateOrder(this.editOrderId, this.editOrder).subscribe(() => {
        this.editOrderId = null;
        this.loadOrders();
      });
    }
  }

  deleteOrder(id: number) {
    this.orderService.deleteOrder(id).subscribe(() => this.loadOrders());
  }

  cancelEdit() {
    this.editOrderId = null; // Exit edit mode
  }

  selectProduct(productId: string) {
    this.newOrder.productId = productId;
  }

  

  ///pagination
  updatePagedOrders() {
      this.totalPages = Math.ceil(this.orders.length / this.pageSize);
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      this.pagedOrders = this.orders.slice(start, end);
  }
  goToPage(page: number) {
      if (page < 1 || page > this.totalPages) return;
      this.currentPage = page;
      this.updatePagedOrders();
  }
}
