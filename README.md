# Prueba Práctica

--- 
![Anular](https://img.shields.io/badge/Angular-gray?style=flat-square&logo=angular)
![Typescript](https://img.shields.io/badge/Typescript-gray?style=flat-square&logo=typescript)
![Python](https://img.shields.io/badge/Python-gray?style=flat-square&logo=python)
![Flask](https://img.shields.io/badge/Flask-gray?style=flat-square&logo=flask)
![MySQL](https://img.shields.io/badge/MySQL-gray?style=flat-square&logo=mysql)

## Instalación
---

### Versonamientos de software
| Software | Versión |
|---|---|
| Python  | 3 |
| Nodejs  | v16.16.0  |
| npm | 8.11.0 |   

### Base de datos 

Ejecutar el archivo **BD_Practica.sql** en mysql, para cargar la base de datos.

### Cliente

Instalamos todas las dependencias necesarias en la carpeta de Frontend

```
npm install 
```

Iniciamos el cliente en la carpeta Frontend el cual estara corriendo en el puerto 4200 del localhost.

```
npm start
``` 

### Servidor 

Instalamos las dependencias necesarias
```
pip install Flask
pip install flask-mysqldb
pip install -U flask-cors
```

Dentro del archivo **app.py** ubicado en la carpeta Backend modificar la conexión con la base de datos si fuera necesario. 

```
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = '12345'
app.config['MYSQL_DB'] = 'PRACTICA_SJ'
```

Iniciamos el servidor en la carpeta Backend el cual estara corriendo en el puerto 5000 del localhost.

```
python app.py
``` 

## Manual de uso 

### Crear un nuevo producto 
Para ingresar un nuevo producto ingresaremos los campos solicitados y daremos clic en crear.

+ **Nombre**: Nombre del producto a crear
+ **Descripcion**: Descripcion del producto a crear
+ **Stock**: Cantidad en stock del producto
+ **Tipo**: Producto
+ **id categoria**: Despliega las categorias a las que podemos asociar el producto.

![Screen Recording (21-04-2023 10-15-15)](https://user-images.githubusercontent.com/45029403/233687367-ecc1674f-425c-4f3f-bfd5-ba46884593d2.gif) 

### Crear una nueva categoria
Para ingresar una nueva categoria ingresaremos los campos solicitados y daremos clic en crear.

+ **Nombre**: Nombre de la categoria a crear
+ **Descripcion**: Descripcion de la categoria a crear
+ **Tipo**: Categoria
+ **id categoria**: Despliega las categorias a las que podemos asociar la categoria.

![crear categoria](https://user-images.githubusercontent.com/45029403/233688482-83370ef5-3b47-412a-9484-c390dc71c1e6.gif)

### Editar producto 
Para editar un producto existente seleccionamos el id del producto y modificaremos los campos deseados, al finalizar daremos clic en editar. 

+ **id producto**: Identificador del producto a modificar
+ **Nombre**: Nuevo nombre del producto
+ **Descripcion**: Nueva descripcion del producto
+ **Stock**: Nueva cantidad del producto
+ **id categoria**: Nueva categoria asociada

![editar producto](https://user-images.githubusercontent.com/45029403/233689128-3192837b-1018-4aa5-b535-27b5e77d2ce3.gif)

### Ver productos
Se deplegara una lista de los productos ingresados con la suma del stock en las categorias. 

![listar producto](https://user-images.githubusercontent.com/45029403/233689825-552a3b92-ef42-4116-b664-88cde4b0d72b.gif)


### Eliminar producto
Para eliminar un producto seleccionamos el id del producto a eliminar y daremos clic en eliminar. 
![eliminar](https://user-images.githubusercontent.com/45029403/233690101-0cdf8ca5-f7f1-4a56-822f-7452916aad52.gif)







