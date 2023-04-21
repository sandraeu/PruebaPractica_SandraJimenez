import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { mMsg } from 'src/models/mMsg';
import { environment } from 'src/environments/environment';
import { mProducts } from 'src/models/mProducts';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http : HttpClient) { }

  create(nombre: string, descripcion: string, stock: number, tipo: number, id_categoria_padre: number){
    
    if(tipo == 1){ //crear producto
      return this.http.post<mMsg>(`${environment.servidor}product/create/product`, {"nombre": nombre, "descripcion" : descripcion, "stock": stock, "id_categoria" : id_categoria_padre});
    }else if (tipo ==2){ //crear subcategoria
      console.log("crear subcategoria")
      return this.http.post<mMsg>(`${environment.servidor}product/create/subcategory`, {"nombre": nombre, "descripcion" : descripcion, "id_categoria_padre" : id_categoria_padre});
    }else{ //crear categoria
      console.log("crear categoria")
      return this.http.post<mMsg>(`${environment.servidor}product/create/category`, {"nombre": nombre, "descripcion" : descripcion});
    }
    
  }

  edit(id_producto : string, id_categoria : string, nombre: string, descripcion : string, stock : string){
    return this.http.post<mMsg>(`${environment.servidor}product/edit`, {"id_producto": id_producto, "nombre" : nombre,  "descripcion" : descripcion, "stock": stock, "id_categoria" : id_categoria});
  }

  getProducts(){
    return this.http.get<any>(`${environment.servidor}product/get`);
  }

  getCategorias(){
    return this.http.get<any>(`${environment.servidor}category/get`);
  }

  getAll(){
    return this.http.get<any>(`${environment.servidor}product/read`);
  }

  delete(tipo: number, id: string){
    if(tipo == 1){
      return this.http.post<mMsg>(`${environment.servidor}product/delete`, {"id_producto": id});
    }else{
      console.log(id)
      return this.http.post<mMsg>(`${environment.servidor}category/delete`, {"id_categoria": id});
    }
  }

  


}
