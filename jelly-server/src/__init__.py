from flask import Flask, make_response, jsonify, redirect, render_template
import os
from flask_cors import CORS


def create_app(test_config=None):
    from . import models, routes

    # app = Flask(__name__, static_folder="static/")
    ### FLASK CONFIG
    app = Flask(__name__, instance_relative_config=True, static_folder="static/")
    CORS(app, supports_credentials=True)

    if test_config is None:
        # load the instance config, if it exists, when not testing
        app.config.from_pyfile("config.py", silent=True)
    else:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    # ensure the instance folder exists
    try:
        # os.makedirs(app.instance_path)
        pass
    except OSError:
        pass

    #### END

    basedir = os.path.abspath(os.path.dirname(__file__))
    # Database
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///" + os.path.join(
        basedir, "database/db.sqlite"
    )
    print(app.config["SQLALCHEMY_DATABASE_URI"])
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    app.config["SECRET_KEY"] = "super-secret"
    app.config["SECURITY_PASSWORD_SALT"] = "super-secret"
    app.config["SECURITY_TRACKABLE"] = True
    app.config["SECURITY_REGISTERABLE"] = True
    app.config["WTF_CSRF_ENABLED"] = False
    app.config["SECURITY_SEND_REGISTER_EMAIL"] = False

    # Mail config
    app.config["MAIL_SERVER"] = "smtp.gmail.com"
    app.config["MAIL_PORT"] = 465
    app.config["MAIL_USERNAME"] = "formsender1@gmail.com"
    app.config["MAIL_PASSWORD"] = "JellyJam"
    app.config["MAIL_USE_TLS"] = False
    app.config["MAIL_USE_SSL"] = True

    from src.models.user import User, Role, db
    from flask_security import (
        SQLAlchemySessionUserDatastore,
        Security,
        login_required,
        current_user,
    )

    # Setup Flask-Security
    user_datastore = SQLAlchemySessionUserDatastore(db.session, User, Role)
    security = Security(app, user_datastore)

    import src.mail as mail

    models.init_app(app)
    routes.init_app(app)
    mail.init_app(app)

    from flask import send_from_directory

    # Serve React App
    @app.route("/", defaults={"path": ""})
    @app.route("/<path:path>")
    @login_required
    def serve(path):
        if path != "" and os.path.exists(app.static_folder + "/" + path):
            return send_from_directory(app.static_folder, path)
        else:
            return send_from_directory(app.static_folder, "index.html")

    @app.errorhandler(404)
    def page_not_found(e):
        return redirect("/"), 404

    @app.route("/schema")
    def get_schema():
        return render_template("schema.html")

    return app
