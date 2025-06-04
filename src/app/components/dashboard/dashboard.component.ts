import { Component, OnInit } from '@angular/core';
import { faBox, faShoppingCart, faUsers, faChartLine } from '@fortawesome/free-solid-svg-icons';
import { ProductService } from '../../services/product.service';
import { OrderService } from '../../services/order.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [CommonModule, HttpClientModule,FormsModule,FontAwesomeModule]
  })
export class DashboardComponent implements OnInit {
  faBox = faBox;
  faShoppingCart = faShoppingCart;
  faUsers = faUsers;
  faChartLine = faChartLine;

  totalProducts = 0;
  totalOrders = 0;
  totalUsers = 0;
  recentActivities: string[] = [];

  constructor(private productService: ProductService, private orderService: OrderService, private router: Router) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.productService.getProducts().subscribe((count) => (this.totalProducts = count));
    this.orderService.getOrders().subscribe((count) => (this.totalOrders = count));
    this.loadRecentActivities();
  }

  loadRecentActivities(): void {
    this.recentActivities = [
      'Product A added',
      'Order #123 placed',
      'User John registered',
      // Add more activities dynamically
    ];
  }
  
  goToProducts(): void {
    this.router.navigate(['/products']);
  }
  goToOrders(): void {
    this.router.navigate(['/order']);
  }

}