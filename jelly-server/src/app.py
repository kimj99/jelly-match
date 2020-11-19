from src import create_app

app = create_app()
DEBUG_TOGGLE = False

if __name__ == "__main__":
    if DEBUG_TOGGLE:
        import logging

        logging.basicConfig()
        logging.getLogger("sqlalchemy.engine").setLevel(logging.INFO)

    app.run(debug=True, threaded=True)
