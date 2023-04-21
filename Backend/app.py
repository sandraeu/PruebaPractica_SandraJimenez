from flask import Flask, request
from flask_mysqldb import MySQL
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = '12345'
app.config['MYSQL_DB'] = 'PRACTICA_SJ'

mysql = MySQL(app) 

@app.route('/')
def Index():
    return '<h1 align="center"> Aplicación Flask </h1> <h2 align="center">Prueba Practica <br><br> Sandra Jiménez </h2>'

# METODO PARA CREACION DE PRODUCTO

@app.route('/product/create/product', methods = ['POST'])
def create_product():
    if request.method == 'POST':
        content = request.get_json()
        
        nombre = content['nombre']
        descripcion = content['descripcion']
        stock = content['stock']
        id_categoria = content['id_categoria']

        sql = ''' INSERT INTO PRODUCTO (nombre, descripcion, stock, id_categoria) VALUES(%s,%s,%s,%s) '''
        
        cursor = mysql.connection.cursor()
        cursor.execute(sql,(nombre,descripcion,stock,id_categoria))
        
        mysql.connection.commit()
        cursor.close()

        return {'msg' : 'Se creo el producto exitosamente'}



@app.route('/product/create/category', methods = ['POST'])
def create_category():
    if request.method == 'POST':
        content = request.get_json()
        nombre = content['nombre']
        descripcion = content['descripcion']
        

        cursor = mysql.connection.cursor()
        cursor.execute(''' INSERT INTO CATEGORIA (nombre, descripcion) VALUES(%s,%s)''',(nombre,descripcion))
        mysql.connection.commit()
        cursor.close()

        return {'msg' : 'Se creo la categoria exitosamente'}


@app.route('/product/create/subcategory', methods = ['POST'])
def create_subcategory():
    if request.method == 'POST':
        content = request.get_json()
        nombre = content['nombre']
        descripcion = content['descripcion']
        id_categoria_padre = content['id_categoria_padre']

        cursor = mysql.connection.cursor()
        cursor.execute(''' INSERT INTO CATEGORIA (id_categoria_padre, nombre, descripcion) VALUES(%s,%s,%s)''',(id_categoria_padre,nombre,descripcion))
        mysql.connection.commit()
        cursor.close()

        return {'msg' : 'Se creo la subcategoria exitosamente'}


@app.route('/product/edit', methods = ['POST'])
def edit_product():
    if request.method == 'POST':
        content = request.get_json()
        id_producto = content['id_producto']
        nombre = content['nombre']
        descripcion = content['descripcion']
        stock = content['stock']
        
        id_categoria = content['id_categoria']
        

        sql = ''' UPDATE PRODUCTO SET nombre = %s, descripcion = %s, stock = %s, id_categoria = %s WHERE id_producto = %s '''
        cursor = mysql.connection.cursor()

        try:
            
            cursor.execute(sql,(nombre,descripcion,stock,id_categoria,id_producto))

            mysql.connection.commit()
            cursor.close()
        except:
            # Rollback in case there is any error
            mysql.connection.rollback()
            cursor.close()

        return {'msg' : 'Se edito el producto exitosamente'}


@app.route('/product/edit/category', methods = ['POST'])
def edit_category():
    if request.method == 'POST':
        content = request.get_json()
        
        id_categoria = content['id_categoria']
        nombre = content['nombre']
        descripcion = content['descripcion']
         
        sql = ''' UPDATE CATEGORIA SET nombre = %s, descripcion = %s WHERE id_categoria = %s '''
        cursor = mysql.connection.cursor()

        try:
            
            cursor.execute(sql,(nombre,descripcion,id_categoria))

            mysql.connection.commit()
            cursor.close()
        except:
            mysql.connection.rollback()
            cursor.close()

        return {'msg' : 'Se edito la categoria exitosamente'}


@app.route('/product/edit/subcategory', methods = ['POST'])
def edit_subcategory():
    if request.method == 'POST':
        content = request.get_json()
        
        id_categoria = content['id_categoria']
        nombre = content['nombre']
        descripcion = content['descripcion']
        id_categoria_padre = content['id_categoria_padre']
         
        sql = ''' UPDATE CATEGORIA SET nombre = %s, descripcion = %s, id_categoria_padre = %s WHERE id_categoria = %s '''
        
        try:
            
            cursor = mysql.connection.cursor()
            cursor.execute(sql,(nombre,descripcion,id_categoria_padre,id_categoria))

            mysql.connection.commit()
            cursor.close()
        except:
            mysql.connection.rollback()

        return {'msg' : 'Se edito la subcategoria exitosamente'}

@app.route('/product/get', methods = ['GET'])
def get_productos():
    if request.method == 'GET':
         
        sql = ''' SELECT * FROM PRODUCTO '''
        
        try:
            
            cursor = mysql.connection.cursor()
            cursor.execute(sql)

            myresult = cursor.fetchall()

            mysql.connection.commit()
            cursor.close()

            return {'productos' : myresult}

            mysql.connection.commit()
            cursor.close()
        except:
            mysql.connection.rollback()

        return {'msg' : 'exitosamente'}


@app.route('/category/get', methods = ['GET'])
def get_categorias():
    if request.method == 'GET':
         
        sql = ''' SELECT * FROM CATEGORIA '''
        
        try:
            
            cursor = mysql.connection.cursor()
            cursor.execute(sql)

            myresult = cursor.fetchall()

            mysql.connection.commit()
            cursor.close()

            return {'categoria' : myresult}

            mysql.connection.commit()
            cursor.close()
        except:
            mysql.connection.rollback()

        return {'msg' : 'exitosamente'}



@app.route('/product/read', methods = ['GET'])
def read_product():
    if request.method == 'GET':
         
        sql = ''' WITH RECURSIVE subcategorias AS (
                    SELECT id_categoria, id_categoria_padre, nombre
                    FROM categoria
                    WHERE id_categoria_padre IS NULL
                    UNION ALL
                    SELECT c.id_categoria, c.id_categoria_padre, c.nombre
                    FROM categoria c
                    JOIN subcategorias s ON c.id_categoria_padre = s.id_categoria
                ), 
                productos_por_categoria AS (
                    SELECT c.id_categoria, p.id_producto, p.stock as cantidad_productos
                    FROM categoria c
                    JOIN producto p ON c.id_categoria = p.id_categoria
                )
                ,
                resultado as(
                SELECT s.id_categoria, s.nombre, SUM(pc.cantidad_productos) as cantidad_productos, ppc.id_producto, ppc.cantidad_productos as cantidad_producto_categoria
                FROM subcategorias s
                LEFT JOIN productos_por_categoria pc ON s.id_categoria = pc.id_categoria
                LEFT JOIN productos_por_categoria ppc ON ppc.id_producto = pc.id_producto
                GROUP BY s.id_categoria, ppc.id_producto, s.nombre
                UNION ALL
                SELECT c.id_categoria, c.nombre, SUM(pc.cantidad_productos) as cantidad_productos, ppc.id_producto, ppc.cantidad_productos as cantidad_producto_categoria
                FROM categoria c
                JOIN subcategorias s ON c.id_categoria = s.id_categoria_padre
                JOIN productos_por_categoria pc ON s.id_categoria = pc.id_categoria
                JOIN productos_por_categoria ppc ON ppc.id_producto = pc.id_producto
                GROUP BY c.id_categoria, ppc.id_producto, s.nombre
                )

                select r.id_categoria as id_categoria, r.nombre as Nombre_categoria, c1.nombre as categoria_padre, ' - ' as producto,sum(r.cantidad_productos ) as cantidad from resultado r
                INNER JOIN CATEGORIA c on c.id_categoria = r.id_categoria
                INNER JOIN  CATEGORIA c1 on c1.id_categoria = c.id_categoria_padre
                group by id_categoria , r.nombre , c1.nombre

                union 

                Select c.id_categoria as id_categoria, c.nombre as Nombre_categoria, ' - ' AS categoria_padre, p.nombre as producto, p.stock as cantidad from CATEGORIA c 
                inner join PRODUCTO p on p.id_categoria = c.id_categoria

'''
        
        try:
            
            cursor = mysql.connection.cursor()
            cursor.execute(sql)

            myresult = cursor.fetchall()

            mysql.connection.commit()
            cursor.close()

            return {'productos' : myresult}
        except:
            mysql.connection.rollback()

        return {'msg' : 'se produjo un error'}


@app.route('/product/delete', methods = ['POST'])
def delete_product():
    if request.method == 'POST':
        content = request.get_json()
        
        id_producto = content['id_producto']
        #id_categoria = content['id_categoria']
        print(id_producto)

        sql = ''' DELETE FROM PRODUCTO WHERE id_producto = %s '''
        
        try:
            
            cursor = mysql.connection.cursor()
            cursor.execute(sql,(id_producto))

            mysql.connection.commit()
            cursor.close()
        except:
            mysql.connection.rollback()

        return {'msg' : 'Se elimino el producto exitosamente'}

@app.route('/category/delete', methods = ['POST'])
def delete_category():
    if request.method == 'POST':
        content = request.get_json()
        
        id_categoria = content['id_categoria']
        print(id_categoria)
        sql = ''' DELETE FROM CATEGORIA where id_categoria = %s '''
        
        try:
            
            cursor = mysql.connection.cursor()
            cursor.execute(sql,(id_categoria))

            mysql.connection.commit()
            cursor.close()
        except:
            mysql.connection.rollback()

        return {'msg' : 'Se elimino la categoria exitosamente'}


if __name__ == '__main__':
    app.run(port = 5000, debug = True)
