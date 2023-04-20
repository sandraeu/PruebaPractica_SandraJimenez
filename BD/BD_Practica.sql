CREATE database PRACTICA_SJ;
use PRACTICA_SJ;

-- Tabla de Categorias
CREATE TABLE PRACTICA_SJ.CATEGORIA(
	id_categoria INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    descripcion VARCHAR(50)
);

-- Tabla de Productos
CREATE TABLE PRACTICA_SJ.PRODUCTO(
	id_producto INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    descripcion VARCHAR(50),
    stock INT NOT NULL
);

-- Tabla de detalle de categorias y productos
CREATE TABLE PRACTICA_SJ.CATEGORIA_PRODUCTO(
	id_categoria INT NOT NULL,
    id_producto INT NOT NULL,
    stock INT,
    PRIMARY KEY(id_categoria,id_producto),
    FOREIGN KEY(id_categoria) REFERENCES CATEGORIA(id_categoria),
    FOREIGN KEY(id_producto) REFERENCES PRODUCTO(id_producto)
);
