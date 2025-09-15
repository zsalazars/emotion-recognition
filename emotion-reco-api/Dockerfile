# Use official Python 3.11 slim image
FROM python:3.11-slim

# Environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
  build-essential \
  libpq-dev \
  curl \
  git \
  && rm -rf /var/lib/apt/lists/*

# Install Poetry
RUN curl -sSL https://install.python-poetry.org | python3 -
ENV PATH="/root/.local/bin:$PATH"

# Copy only Poetry files first (for caching)
COPY pyproject.toml poetry.lock ./

# Install dependencies (without installing the project itself)
RUN poetry config virtualenvs.create false \
  && poetry install --no-root --only main

# Copy the rest of the project
COPY . .

# Expose Django port
EXPOSE 8000

# Default command
CMD ["poetry", "run", "python", "manage.py", "runserver", "0.0.0.0:8000"]
