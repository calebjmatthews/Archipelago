from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import backref
from flask_potion.routes import Relation
from flask_potion import Api, ModelResource, fields

app = Flask(__name__)
db = SQLAlchemy(app)

class Land(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	landID = db.Column(db.Integer, nullable=False)
	lSize = db.Column(db.Integer, nullable=False)
	lShape = db.Column(db.Integer, nullable=False)
	lClimate = db.Column(db.Integer, nullable=False)

class Tile(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	hexID = db.Column(db.Integer, nullable=False)
	parentID = db.Column(db.Integer, db.ForeignKey(Land.landID), nullable=False)
	axialRow = db.Column(db.Integer, nullable=False)
	axialCol = db.Column(db.Integer, nullable=False)
	landscape = db.Column(db.Integer, nullable=False)
	development = db.Column(db.Integer)
	ownedBy = db.Column(db.Integer)

	land = db.relationship(Land, backref=backref('tiles', lazy='dynamic'))

db.create_all()

class TileResource(ModelResource):
	class Meta:
		model = Tile

	class Schema:
		land = fields.ToOne('land')
		landscape = fields.Integer(maximum=5)

class LandResource(ModelResource):
	tiles = Relation('tile')

	class Meta:
		model = Land

	class Schema:
		lSize = fields.Integer(maximum=3)
		lShape = fields.Integer(maximum=4)
		lClimate = fields.Integer(maximum=5)

api = Api(app)
api.add_resource(TileResource)
api.add_resource(LandResource)

#!flask/bin/python
from app import app
if __name__ == '__main__':
	app.run(host='0.0.0.0', debug=True)