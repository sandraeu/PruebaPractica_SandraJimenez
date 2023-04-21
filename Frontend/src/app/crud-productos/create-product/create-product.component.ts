import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { mMsg } from 'src/models/mMsg';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {


  constructor(private router: Router, private serviceProduct: ProductsService) { }


  public nombre : string = "";
  public descripcion : string = "";
  public stock = '';
  public tipo : string = "";
  public id_categoria = '';
  public nombre_catego = ""
  public productos = [
    { 
      "id" : "",
      "nombre" : ""
    }
  ]


  ngOnInit(): void {
    this.get_products()
  }


  onKey(event: any) { 
    for(let x of this.productos){
      if(x.id == this.id_categoria){
        this.nombre_catego = x.nombre; 
      }
    }
  }

  get_products(){
    this.serviceProduct.getCategorias()
    .subscribe((response : any)=>{

      this.productos = [];

      for(let x of response.categoria){
        let json = { 
          "id" : x[0],
          "nombre" : x[2],
        }

        this.productos.push(json)
      }
    })
  }


  crear(){
    
    if(this.nombre != "" && this.descripcion != "" && this.tipo != ""){

      let producto : number = 0;
      if(this.tipo == "PRODUCTO" && this.id_categoria == ""){
        alert("Indicar la categoria del producto")
        return;
      }else if(this.tipo == "PRODUCTO"){
        producto = 1;
        this.serviceProduct.create(this.nombre, this.descripcion, Number(this.stock), producto, Number(this.id_categoria))
        .subscribe((msg : mMsg)=>{
          alert(msg.msg);
          
          this.nombre = "";
          this.descripcion = "";
          this.stock = '';
          this.tipo = "";
          this.id_categoria = "";
          this.nombre_catego = "";
        })
      }else if(this.tipo == "CATEGORIA"){
        if(this.id_categoria != ""){
          producto = 2;
        }

        this.serviceProduct.create(this.nombre, this.descripcion, Number(this.stock), producto, Number(this.id_categoria))
        .subscribe((msg : mMsg)=>{
          alert(msg.msg);
          
          this.nombre = "";
          this.descripcion = "";
          this.stock = '';
          this.tipo = "";
          this.id_categoria = "";
          this.nombre_catego = "";
        })

      }
      
    }else{
      alert("Llenar todos los campos obligatorios *")
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
