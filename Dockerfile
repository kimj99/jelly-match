#Stage 1 - build the frontend
FROM node:8 as build-frontend

WORKDIR /app

COPY ./jelly-web/ .
RUN npm install
RUN npm run build


FROM python:3.7-alpine as build-backend
WORKDIR /app

COPY ./jelly-server/ .
COPY --from=build-frontend /app/build ./src/static
RUN pip install wheel
RUN python setup.py bdist_wheel

#DEPLOY
FROM python:3.7.2-slim as deploy
WORKDIR /app
ENV FLASK_APP src
COPY --from=build-backend /app/dist ./temp

RUN pip install temp/src-1.0.0-py3-none-any.whl

RUN pip install waitress
CMD ["waitress-serve", "--threads", "8", "--call", "src:create_app"]

