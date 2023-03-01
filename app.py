from flask import Flask, render_template, flash, redirect, request
from flask_pymongo import PyMongo, MongoClient
from forms import TodoForm
from werkzeug.datastructures import ResponseCacheControl
from datetime import datetime
from bson import ObjectId

app = Flask(__name__)

client = MongoClient('mongodb://localhost:27017/')
db = client.capybara_local
app.config['MONGO_URI'] = 'mongodb://localhost:27017/capybara_local'
app.config['SECRET_KEY'] = '66be5365775d34610039190a650cae2dc2cb3980'

mongo = PyMongo(app)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/add_todo', methods=['POST', 'GET'])
def add_todo():
    if request.method == 'POST':
        form = TodoForm(request.form)
        todo_name = form.name.data
        todo_description = form.description.data
        completed = form.completed.data
        db.capybara_movies.insert_one({
            "name": todo_name,
            "description": todo_description,
            "completed": completed,
            "date_created": datetime.utcnow()
        })
        flash('Todo successfully inserted', 'success')
        return redirect('/add_todo')
    ###
    todos = []
    for todo in db.capybara_movies.find().sort('date_created', -1):
        todo['_id'] = str(todo['_id'])
        todo['date_created'] = todo['date_created'].strftime('%b %d %Y %H:%M%S')
        todos.append(todo)
    form = TodoForm()
    return render_template('forms_test.html', form=form, todos=todos)


@app.route('/update/todo/<id>', methods=['POST', 'GET'])
def update_todo(id):
    if request.method == 'POST':
        form = TodoForm(request.form)
        todo_name = form.name.data
        todo_description = form.description.data
        completed = form.completed.data
        db.capybara_movies.find_one_and_update({"_id": ObjectId(id)}, {"$set": {
            "name": todo_name,
            "description": todo_description,
            "completed": completed,
            "date_created": datetime.utcnow()
        }})
        flash('Todo successfully updated', 'success')
        return redirect('/add_todo')
    else:
        form = TodoForm()
        todo = db.capybara_movies.find_one_or_404({'_id': ObjectId(id)})
        form.name.data = todo.get('name', None)
        form.description.data = todo.get('description', None)
        form.completed.data = todo.get('completed', None)

        todos = []
        for todo in db.capybara_movies.find().sort('date_created', -1):
            todo['_id'] = str(todo['_id'])
            todo['date_created'] = todo['date_created'].strftime('%b %d %Y %H:%M%S')
            todos.append(todo)

    return render_template('forms_test.html', form=form, todos=todos)


@app.route('/delete_todo/<id>')
def delete_todo(id):
    db.capybara_movies.find_one_and_delete({'_id': ObjectId(id)})
    flash('Todo successfully deleted', 'success')
    return redirect('/add_todo')


if __name__ == '__main__':
    app.run(debug=True)
