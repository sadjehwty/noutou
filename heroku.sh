#!/bin/bash
cd frontend
ng build
cp -R dist/* ../backend/public/
cd ../backend/
git add 
git add .
git push heroku master -f
