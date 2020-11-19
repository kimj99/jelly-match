from setuptools import find_packages, setup

setup(
    name='src',
    version='1.0.0',
    packages=find_packages(),
    include_package_data=True,
    zip_safe=False,
    install_requires=[
        'flask',
        'flask_security',
        'flask_sqlalchemy',
        'flask_marshmallow',
        'sqlalchemy',
        'marshmallow-sqlalchemy',
        'bcrypt==3.1.7',
        'flask-cors',
        'flask-wtf',
        'wtforms',
        'pathos',
        'numpy'
    ],
)