# JellyMatch

Matchmaking project for CS 455

ReactJS - Frontend

Python/Flask - Backend

SQLite - Database

Gitlab - Source control & CI/CD

Docker - Deployment

In order to get our project to run, docker must be installed on the host machine. You then will need to login to our docker registry (registery.gitlab.com) using your gitlab credentials. Then you just need to run the command ```docker run -p 80:8080 -v database:/usr/local/lib/python3.7/site-packages/src/database -d registry.gitlab.com/pugetsound/jellymatch:latest```. Docker will then grab the latest build and deploy it.