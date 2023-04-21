import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { mProducts } from 'src/models/mProducts';

@Component({
  selector: 'app-read-products',
  templateUrl: './read-products.component.html',
  styleUrls: ['./read-products.component.scss']
})
export class ReadProductsComponent implements OnInit {


  public productos = [
    { 
      "id" : 0,
      "categoria" : 0,
      "categoria_padre" : 0,
      "producto" : 0,
      "stock" : 0,
    }
  ];

  constructor(private router: Router, private serviceProduct: ProductsService) { }

  ngOnInit(): void {
    this.get_products();
  }


  get_products(){
    this.serviceProduct.getAll()
      .subscribe((response : any)=>{

      this.productos.pop();

      for(let x of response.productos){
        let json = { 
          "id" : x[0],
          "categoria" : x[1],
          "categoria_padre" : x[2],
          "producto" : x[3],
          "stock" : x[4],
        }
        this.productos.push(json)
      }

      console.log(this.productos)
        
    })
  }

  /**
  * Funciones para cambio de vistas para crud de productos
  * @function createProduct
  * @function editProduct
  * @function readProduct
  * @function deleteProduct
  */
    
    createProduct(){
      this.router.navigate(["product/create"]);
    }
  
    editProduct(){
        this.router.navigate(["product/edit"]);
    }
  
    readProduct(){
        this.router.navigate(["product/read"]);
    }
  
    deleteProduct(){
        this.router.navigate(["product/delete"]);
    }


}
