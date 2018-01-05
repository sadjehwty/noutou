#!/bin/bash
cd frontend
ng build
cp -R dist/* ../backend/public/
cd ../backend/
git push heroku master -f
