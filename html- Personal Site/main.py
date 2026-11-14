# The site is now fully static (see ./public). Render serves it as a Static Site,
# which never sleeps. This Flask app is kept only as a fallback for the old web service.
from flask import Flask, send_from_directory

app = Flask(__name__, static_folder="public", static_url_path="")


@app.route("/")
def index():
    return send_from_directory(app.static_folder, "index.html")


if __name__ == "__main__":
    app.run(debug=True)
