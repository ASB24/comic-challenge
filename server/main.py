from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import requests
import os

load_dotenv()

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

COMIC_URL = "http://comicvine.gamespot.com/api"

@app.get("/")
async def root():
    return {"message":"It works!"}

@app.get("/issues")
async def issues(field_list = None, filter = None, limit = 100, offset = 0, sort = None):
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36'}
    issues = requests.get(COMIC_URL + "/issues", params={"api_key": os.getenv("API_KEY"), "format": "json", "field_list": field_list, "filter":filter, "limit": limit, "offset": offset, "sort": sort}, headers=headers)
    return issues.json()

@app.get("/issue/{id}")
async def volume(id, field_list = None):
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36'}
    issue = requests.get(COMIC_URL + "/issue/4000-" + id, params={"api_key": os.getenv("API_KEY"), "format": "json", "field_list": field_list}, headers=headers)
    return issue.json()