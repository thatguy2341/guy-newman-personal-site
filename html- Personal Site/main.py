from flask import Flask, render_template
from datetime import datetime

app = Flask(__name__)

@app.context_processor
def get_year():
    return dict(age=(datetime.now() - datetime(year=2005, month=8, day=10)).days // 360)

@app.route('/')
def hello_world():
    return render_template('main.html')

if __name__ == "__main__":
    app.run(debug=True)
