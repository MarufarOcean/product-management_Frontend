// order.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private apiUrl = 'https://localhost:7187/api/Order';

  constructor(private http: HttpClient) {}

  // getOrders(): Observable<any[]> {
  //   return this.http.get<any[]>(this.apiUrl);
  // }

  getHeaders(): HttpHeaders {
      return new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      });
    }

  getOrders(): Observable<any> {
    return this.http.get(this.apiUrl, { headers: this.getHeaders() });
  }

  createOrder(order: any): Observable<any> {
    return this.http.post(this.apiUrl, order);
  }

  updateOrder(id: number, order: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, order);
  }

  deleteOrder(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
