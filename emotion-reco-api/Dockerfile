FROM python:3.11-slim

# Set workdir
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
  build-essential \
  && rm -rf /var/lib/apt/lists/*

# Install Poetry
RUN pip install --no-cache-dir poetry

# Configure Poetry: don't create virtual env (we're already in container)
RUN poetry config virtualenvs.create false

# Copy poetry files
COPY pyproject.toml poetry.lock* ./

# Install Python dependencies directly (no virtual env needed in container)
RUN poetry install --no-root --only=main

# Copy source code
COPY . .

# Create non-root user for security
RUN useradd --create-home --shell /bin/bash app \
  && chown -R app:app /app
USER app

# Expose FastAPI port
EXPOSE 8000

# Run app with uvicorn directly (no poetry run needed since deps are global)
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]