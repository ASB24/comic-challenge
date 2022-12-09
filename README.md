# ComicCon
### Reminder
Remember to create a .env file in the /server directory with "API_KEY" as your ComicVineAPI api key
== API_KEY = your_api_key ==
---
## Setup
### Run the FASTAPI server
In the /server directory run:
```bash
uvicorn main:app --reload
```
or
```bash
python -m uvicorn main:app --reload
```
Server should run on port 5000
### Run the React app
return to the root folder and run
```bash
npm run dev
```
App should run on port 5173