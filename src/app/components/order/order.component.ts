// order.component.ts
import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule, HttpClientModule,FormsModule,FontAwesomeModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit {
  orders: any[] = [];
  newOrder = { productId: '', quantity: '' };
  editOrderId: number | null = null;
  editOrder = { productId: '', quantity: '' };

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.orderService.getOrders().subscribe(data => this.orders = data);
  }

  createOrder() {
    this.orderService.createOrder(this.newOrder).subscribe(() => {
      this.newOrder = { productId: '', quantity: '' };
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
}
