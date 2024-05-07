from flask import Flask, jsonify, Blueprint, request
from flask_cors import CORS
from pymongo import MongoClient
from bson.objectid import ObjectId

employee_bp = Blueprint('employee_bp', __name__)

CORS(employee_bp)

# MongoDB connection
client = MongoClient("mongodb+srv://broti:Broti143@cluster0.bjvjbsy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0") 
db = client['sampledata'] 
collection = db['data'] 

@employee_bp.route('/', methods=['GET', 'POST'])
def employees():
    if request.method == 'GET':
        data = collection.find() 
        output = []
        for employee in data:
            output.append({
                    '_id': str(employee['_id']),  
                    'employee_id': employee['employee_id'],
                    'name': employee['name'],
                    'position': employee['position'],
                    'salary': employee['salary']
                })
        return jsonify({'employee': output})
    elif request.method == 'POST':
        new_employee = request.json
        collection.insert_one(new_employee)
        return jsonify({'message': 'Employee added successfully'})

@employee_bp.route('/<_id>', methods=['PUT', 'DELETE'])
def employee(_id):
    if request.method == 'PUT':
        updated_employee = request.json
        print("Updated Employee:", updated_employee)
        collection.update_one({'_id': ObjectId(_id)}, {'$set': updated_employee})
        return jsonify({'message': 'Employee updated successfully'})
    elif request.method == 'DELETE':
        collection.delete_one({'_id': ObjectId(_id)})
        return jsonify({'message': 'Employee deleted successfully'})

def create_app():
    app = Flask(__name__)
    app.register_blueprint(employee_bp, url_prefix='/employees')
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
