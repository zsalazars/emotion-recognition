from fastapi import FastAPI

app = FastAPI(title="API de Identificación de Emociones")

@app.get("/")
def read_root():
    return {"mensaje": "Bienvenido a la API de emociones"}

@app.post("/predict")
def predict_emotion(text: str):
    # Aquí luego pones tu modelo de ML para identificar emociones
    return {"texto": text, "emocion": "alegría"}