import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { mMsg } from 'src/models/mMsg';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.scss']
})
export class DeleteProductComponent implements OnInit {

  public id : string = ""
  public tipo : string = ""
  public nombre : string = ""

  public productos = [
    { 
      "id" : "",
      "nombre" : "",
      "descripcion" : "",
      "stock" : "",
      "id_categoria" : "",
    }
  ]

  constructor(private router: Router, private serviceProduct: ProductsService) { }

  ngOnInit(): void {
    this.get_products();
  }

  onKey(event: any) { 
    console.log('evento')
    for(let x of this.productos){
      if(x.id == this.tipo){
        this.nombre = x.nombre; 
      }
    }
  }

  get_products(){
    this.serviceProduct.getProducts()
    .subscribe((response : any)=>{

      this.productos = [];

      for(let x of response.productos){
        let json = { 
          "id" : x[0],
          "nombre" : x[1],
          "descripcion" : x[2],
          "stock" : x[3],
          "id_categoria" : x[4],
        }

        this.productos.push(json)
      }
    })
  }


  eliminar(){
    if(this.tipo != ""){
      let bandera = 1;

      this.serviceProduct.delete(bandera,this.tipo.toString())
      .subscribe((msg : mMsg) => {
        alert(msg.msg)
        this.tipo = ""
        this.id = ""
        this.nombre = ""
        this.get_products()
      })
    }else{
      alert("Por favor, ingrese todos los campos solicitados.")
    }
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
