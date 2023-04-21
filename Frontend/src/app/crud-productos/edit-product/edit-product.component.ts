import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { mMsg } from 'src/models/mMsg';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  public id_producto : string = ""
  public nombre : string = ""
  public descripcion : string = ""
  public stock : string = ""
  public id_categoria : string = ""

  public tipo : string = ""

  public productos = [
    { 
      "id" : "",
      "nombre" : "",
      "descripcion" : "",
      "stock" : "",
      "id_categoria" : "",
    }
  ]

  constructor(private router: Router, private serviceProducto : ProductsService) { }

  ngOnInit(): void {
    this.get_products();
  }

  prueba(){
    alert(this.tipo)
  }

  onKey(event: any) { 
    
    for(let x of this.productos){
      if(x.id == this.tipo){
        this.nombre = x.nombre;
        this.descripcion = x.descripcion;
        this.stock = x.stock
        this.id_categoria = x.id_categoria
      }
    }
  }

  get_products(){
    this.serviceProducto.getProducts()
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

  editar(){
    if(this.tipo != ""){
      this.serviceProducto.edit(this.tipo, this.id_categoria.toString(), this.nombre, this.descripcion, this.stock.toString())
      .subscribe((msg: mMsg) => {
        alert(msg.msg)
        this.tipo ="";
        this.id_categoria = "";
        this.nombre = ""
        this.descripcion = ""
        this.stock = ""
        this.get_products()
      })

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
