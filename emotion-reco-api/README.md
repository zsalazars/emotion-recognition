This is a **Python project** managed with [Poetry](https://python-poetry.org/) and [FastAPI](https://fastapi.tiangolo.com/).

### Project Structure

```bash
emotion-reco-api/
├── docker-compose.yml
├── .env.example
└── emotion-reco-api
    ├── Dockerfile
    ├── pyproject.toml
    ├── poetry.lock
    ├── app/
    │   ├── main.py
    │   ├── core/          # Config & database
    │   ├── crud/          # DB operations
    │   ├── models/        # SQLAlchemy models
    │   ├── routes/        # API endpoints
    │   └── schemas/       # Pydantic schemas
    └── tests/
```

### Requirements

- Python 3.12
- Poetry
- Docker

### Install dependencies

You should run:
`poetry install`

### How to run?

Create a .env file for credentials based on the example provided:

`/emotion-recognition/.env.example`

Start the project with Docker:

`docker-compose up`

The API will be available at: `http://localhost:8000`
