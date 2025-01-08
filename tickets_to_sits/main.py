from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
import os
from dotenv import load_dotenv
import requests

app = Flask(__name__)
load_dotenv(".env")
if os.getenv("LOCAL") == "T":
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///blog.db'
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("DATABASE_URL")

app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
app.app_context().push()

project_pass = os.getenv("pass")


class Users(db.Model):
    p_k = db.Column(db.Integer, primary_key=True)
    id = db.Column(db.Integer)
    name = db.Column(db.String(100))
    seat = db.Column(db.Integer, unique=True)

    def __repr__(self):
        return f'<Users {self.name}>'


db.create_all()


@app.route('/<int:us_id>')
def home(us_id):
    # project_id = 1234
    # doc_num = us_id
    # doc_type = 1
    # req = requests.get(url=f"https://secure.cardcom.solutions/Interface/InvoiceGetHtml.aspx?UserName={project_id}"
    #                        f"&UserPassword={project_pass}&InvoiceNumber={doc_num}&InvoiceType={doc_type}&GetAsOriginal=true")
    #
    # if len(req.text) < 200:  # check if user is there
    #     return 404
    user_name = "name"
    tickets_am = 1

    users = db.session.query(Users).all()
    user = None
    for u in users:
        if u.id == us_id:
            user = u

    if user is None:
        for i in range(tickets_am):
            last = 0
            if db.session.query(Users).all():
                last = db.session.query(Users).all()[-1].seat

            user = Users()
            user.id = us_id
            user.name = user_name
            user.seat = last + 1
            db.session.add(user)
            db.session.commit()

    seat = user.seat
    row = 7
    rows = [34, 32, 30, 27, 21, 12]
    for r in rows:
        if seat > r:
            seat - r
            row += 1

    return render_template('main.html', user=user, seat=seat, row=row)


if __name__ == "__main__":
    app.run(debug=True)
