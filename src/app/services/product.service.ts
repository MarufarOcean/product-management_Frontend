import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://localhost:7187/api/Products';

  constructor(private http: HttpClient) { }

  getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
  }

  getProducts(): Observable<any> {
    return this.http.get(this.apiUrl, { headers: this.getHeaders() });
  }

  getProductById(productId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${productId}`);
  }

  addProduct(product: any, photo: File): Observable<any> {
  const formData = new FormData();
  formData.append('Name', product.name);
  formData.append('Description', product.description);
  formData.append('Details', product.details);
  formData.append('Price', product.price);
  formData.append('stock', product.stock);
  if (photo) {
    formData.append('Photo', photo);
  }
  return this.http.post(this.apiUrl, formData);
}

    updateProduct(id: number, product: any, photo: File): Observable<any> {
    const formData = new FormData();
    formData.append('Name', product.name);
    formData.append('Description', product.description);
    formData.append('Details', product.details);
    formData.append('Price', product.price);
    formData.append('stock', product.stock);
    if (photo) {
      formData.append('Photo', photo);
    }
    return this.http.put(`${this.apiUrl}/${id}`, formData);
  }


  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}
