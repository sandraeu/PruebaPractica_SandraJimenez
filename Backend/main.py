from flask import Flask, request
from flaskext.mysql import MySQL

app = Flask(__name__)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = '12345'
app.config['MYSQL_DB'] = 'PRACTICA_SJ'

mysql = MySQL(app) 

@app.route('/')
def Index():
    return '<h1 align="center"> Aplicación Flask </h1> <h2 align="center">Prueba Practica <br><br> Sandra Jiménez </h2>'

@app.route('/product/create/product', methods = ['POST'])
def create_product():
    if request.method == 'POST':
        content = request.get_json()
        nombre = content['nombre']
        descripcion = content['descripcion']
        stock = content['stock']

        cursor = mysql.get_db().cursor()
        #cursor.execute(''' INSERT INTO CATEGORIA (nombre, descripcion) VALUES (%s, %s) ''', (nombre,descripcion))
        #mysql.connection.commit()

        return 'recibido'


@app.route('/product/create/category')
def create_category():
    return 'create category'

@app.route('/product/edit')
def edit_product():
    return 'edit product'

@app.route('/product/read')
def read_product():
    return 'read product'


@app.route('/product/delete')
def delete_product():
    return 'delete product'



if __name__ == '__main__':
    app.run(port = 5000, debug = True)
