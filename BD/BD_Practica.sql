CREATE database PRACTICA_SJ;
use PRACTICA_SJ;

-- Tabla de Categorias
CREATE TABLE PRACTICA_SJ.CATEGORIA(
	id_categoria INT AUTO_INCREMENT PRIMARY KEY,
    id_categoria_padre INT,
    nombre VARCHAR(50) NOT NULL,
    descripcion VARCHAR(50),
    stock INT,
    FOREIGN KEY(id_categoria_padre) REFERENCES CATEGORIA(id_categoria) ON DELETE CASCADE
);

-- Tabla de Productos
CREATE TABLE PRACTICA_SJ.PRODUCTO(
	id_producto INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    descripcion VARCHAR(50),
    stock INT NOT NULL,
    id_categoria INT NOT NULL,
    FOREIGN KEY(id_categoria) REFERENCES CATEGORIA(id_categoria) ON DELETE CASCADE
);

-- INSERT DATOS CATEGORIA
INSERT INTO CATEGORIA (id_categoria,nombre, descripcion) 
VALUES 
	(1, 'Aceites', 'Categoria Aceites');

INSERT INTO CATEGORIA (id_categoria, id_categoria_padre, nombre, descripcion) 
VALUES 
    (2,1, 'Motor', 'Categoria Motor'),
    (3,2, 'Minerales', 'Categoria Minerales'),
    (4,2, 'Sintéticos', 'Categoria Sintéticos'),
    (5,2, 'Semi-sintético', 'Categoria Semi-sintético');

-- INSERT DATOS PRODUCTO 
INSERT INTO PRODUCTO (nombre, descripcion, stock, id_categoria) 
VALUES 
	('Castrol 20w50', 'Producto Castrol', 15,3),
    ('Valvoline 15w', 'Producto Valvoline', 12, 3),
    ('Shell Helix Ultra SN 5w30', 'Producto Shell Helix Ultra SN',50,4),
    ('Castrol 5w30', 'Producto Castrol', 20, 4),
    ('Shell 5w30', 'Producto Shell', 14, 5),
    ('Valvoline 5w30', 'Producto Valvoline', 20, 5);

-- AREA DE CONSULTAS

SELECT * FROM CATEGORIA;
SELECT * FROM PRODUCTO;

-- REPORTE DE PRODUCTOS INGRESADOS CON SUMA DE CATEGORIAS 
WITH RECURSIVE subcategorias AS (
    SELECT 
		id_categoria, 
        id_categoria_padre, 
        nombre
    FROM CATEGORIA
    WHERE id_categoria_padre IS NULL
    UNION ALL
    SELECT 
		c.id_categoria, 
        c.id_categoria_padre, 
        c.nombre
    FROM CATEGORIA c
    JOIN subcategorias s ON c.id_categoria_padre = s.id_categoria
), 

productos_por_categoria AS (
    SELECT 
		c.id_categoria, 
        p.id_producto, 
        p.stock AS cantidad_productos
    FROM CATEGORIA c
    JOIN PRODUCTO p ON c.id_categoria = p.id_categoria
)
,
resultado AS (
	SELECT 
		s.id_categoria, 
        s.nombre, 
        SUM(pc.cantidad_productos) as cantidad_productos, 
        ppc.id_producto, 
        ppc.cantidad_productos as cantidad_producto_categoria
	FROM subcategorias s
	LEFT JOIN productos_por_categoria pc ON s.id_categoria = pc.id_categoria
	LEFT JOIN productos_por_categoria ppc ON ppc.id_producto = pc.id_producto
	GROUP BY s.id_categoria, ppc.id_producto, s.nombre
	UNION ALL
	SELECT 
		c.id_categoria, 
        c.nombre, 
        SUM(pc.cantidad_productos) as cantidad_productos, 
        ppc.id_producto, 
        ppc.cantidad_productos as cantidad_producto_categoria
	FROM categoria c
	JOIN subcategorias s ON c.id_categoria = s.id_categoria_padre
	JOIN productos_por_categoria pc ON s.id_categoria = pc.id_categoria
	JOIN productos_por_categoria ppc ON ppc.id_producto = pc.id_producto
	GROUP BY c.id_categoria, ppc.id_producto, s.nombre
)

SELECT 
	r.id_categoria AS id_categoria, 
    r.nombre AS Nombre_categoria, 
    c1.nombre AS categoria_padre, 
    ' - ' AS producto,
    sum(r.cantidad_productos ) AS cantidad 
FROM resultado r
INNER JOIN CATEGORIA c ON c.id_categoria = r.id_categoria
INNER JOIN  CATEGORIA c1 ON c1.id_categoria = c.id_categoria_padre
GROUP BY id_categoria , r.nombre , c1.nombre
UNION 
SELECT 
	c.id_categoria AS id_categoria, 
    c.nombre AS Nombre_categoria, 
    ' - ' AS categoria_padre, 
    p.nombre AS producto, 
    p.stock AS cantidad 
FROM CATEGORIA c 
INNER JOIN PRODUCTO p ON p.id_categoria = c.id_categoria

