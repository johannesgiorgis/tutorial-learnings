from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from database_setup import Base, Book


# Connect to Database and create database connection
engine = create_engine("sqlite:///books-collection.db")
Base.metadata.bind = engine

DBSession = sessionmaker(bind=engine)
session = DBSession()

# Landing page that displays all books in our database
# This function operates on the Read operation


@app.route("/")
@app.route("/books")
def showBooks():
    books = session.query(Book).all()
    return render_template("books.html", books=books)


# Allow us to create a new book and save it in our database
@app.route("/books/new/", methods=["GET", "POST"])
def newBook():
    if request.method == "POST":
        newBook = Book(
            title=request.form["name"],
            author=request.form["author"],
            genre=request.form["genre"],
        )
        session.add(newBook)
        session.commit()
        return redirect(url_for("showBooks"))
    else:
        return render_template("newBook.html")


# Allow us to update our books and save it in our database
@app.route("/books/<int:book_id>/edit/", methods=["GET", "POST"])
def editBook(book_id):
    editedBook = session.query(Book).filter_by(id=book_id).one()
    if request.method == "POST":
        if request.form["name"]:
            editedBook.title = request.form["name"]
            return redirect(url_for("showBooks"))
    else:
        return render_template("editBook.html", book=editedBook)


# Allow us to delet our book
@app.route("/books/<int:book_id>/delete/", methods=["GET", "POST"])
def deleteBook(book_id):
    bookToDelete = session.query(Book).filter_by(id=book_id).one()
    if request.method == "POST":
        session.delete(bookToDelete)
        session.commit()
        return redirect(url_for("showBooks", book_id=book_id))
    else:
        return render_template("deleteBook.html", book=bookToDelete)


if __name__ == "__main__":
    app.debug = False
    app.run(host="0.0.0.0", port=4996)
