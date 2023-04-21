import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateProductComponent } from './crud-productos/create-product/create-product.component';
import { EditProductComponent } from './crud-productos/edit-product/edit-product.component';
import { DeleteProductComponent } from './crud-productos/delete-product/delete-product.component';
import { ReadProductsComponent } from './crud-productos/read-products/read-products.component';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    CreateProductComponent,
    EditProductComponent,
    DeleteProductComponent,
    ReadProductsComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    HttpClientModule,
    FormsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
