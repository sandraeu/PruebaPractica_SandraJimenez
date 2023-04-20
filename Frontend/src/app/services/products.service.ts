import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { mMsg } from 'src/models/mMsg';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http : HttpClient) { }

  create(nombre: string, descripcion: string, stock: number, tipo: number){
    if(tipo == 1){ //crear producto
      return this.http.post<mMsg>(`${environment.servidor}product/create/product`, {"nombre": nombre, "descripcion" : descripcion, "stock": stock});
    }else{ //crear categoria
      return this.http.post<mMsg>(`${environment.servidor}product/create/category`, {"nombre": nombre, "descripcion" : descripcion, "stock": stock});
    }
    
  }

  


}
