import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-read-products',
  templateUrl: './read-products.component.html',
  styleUrls: ['./read-products.component.scss']
})
export class ReadProductsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
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
