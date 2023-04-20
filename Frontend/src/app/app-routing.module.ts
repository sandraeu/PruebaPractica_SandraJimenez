import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateProductComponent } from './crud-productos/create-product/create-product.component';
import { DeleteProductComponent } from './crud-productos/delete-product/delete-product.component';
import { EditProductComponent } from './crud-productos/edit-product/edit-product.component';
import { ReadProductsComponent } from './crud-productos/read-products/read-products.component';

const routes: Routes = [
  {
    path: '',
    component: CreateProductComponent,
  },
  {
    path: 'product/create',
    component: CreateProductComponent,
  },
  {
    path: 'product/edit',
    component: EditProductComponent,
  },
  {
    path: 'product/read',
    component: ReadProductsComponent,
  },
  {
    path: 'product/delete',
    component: DeleteProductComponent,
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
