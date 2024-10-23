from fastapi import FastAPI, Form, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import re
from pydantic import BaseModel, EmailStr, Field
from pymongo import MongoClient
from passlib.context import CryptContext
import joblib
import numpy as np
import jwt
import datetime

# MongoDB connection
client = MongoClient("mongodb://localhost:27017")
db = client["user_database"]
users_collection = db["users"]

# FastAPI app instance
app = FastAPI()

# CORS middleware to allow requests from React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Password hashing context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Load the pre-trained anomaly detection model
model = joblib.load("anomaly_detection_model.sav")

# Security settings for JWT
SECRET_KEY = "your_secret_key_here"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

class AnomalyDetectionInput(BaseModel):
    container_fs_usage_bytes: float
    container_memory_rss: float
    container_cpu_system_seconds_total: float
    container_network_receive_bytes_total: float
    container_network_receive_errors_total: float
    container_memory_failures_total: float

class LoginInput(BaseModel):
    email: str
    password: str

class SignupInput(BaseModel):
    name: str = Field(..., min_length=3, max_length=50)
    email: EmailStr
    password: str = Field(..., min_length=8)

# Utility functions for password handling
def hash_password(password: str):
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def validate_password_strength(password: str):
    if not re.match(r'^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$', password):
        raise HTTPException(
            status_code=400,
            detail="Password must contain at least 8 characters, including an uppercase letter, a lowercase letter, a number, and a special character."
        )

# JWT token creation
def create_access_token(data: dict, expires_delta: datetime.timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.datetime.utcnow() + expires_delta
    else:
        expire = datetime.datetime.utcnow() + datetime.timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

@app.post("/signup")
def signup(user_data: SignupInput):
    if users_collection.find_one({"email": user_data.email}):
        raise HTTPException(status_code=400, detail="User already exists with this email")

    validate_password_strength(user_data.password)
    hashed_password = hash_password(user_data.password)

    users_collection.insert_one({
        "name": user_data.name,
        "email": user_data.email,
        "password": hashed_password
    })

    return {"message": "User registered successfully"}

@app.post("/login")
async def login(form_data: LoginInput):
    user = users_collection.find_one({"email": form_data.email})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    if not verify_password(form_data.password, user["password"]):
        raise HTTPException(status_code=401, detail="Incorrect password")

    access_token_expires = datetime.timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(data={"sub": user["email"]}, expires_delta=access_token_expires)

    return {"access_token": access_token, "token_type": "bearer", "user_id": str(user["_id"])}

@app.post("/detect-anomaly")
async def detect_anomaly(input_data: AnomalyDetectionInput):
    features = [
        input_data.container_fs_usage_bytes,
        input_data.container_memory_rss,
        input_data.container_cpu_system_seconds_total,
        input_data.container_network_receive_bytes_total,
        input_data.container_network_receive_errors_total,
        input_data.container_memory_failures_total
    ]

    prediction = model.predict([features])
    anomaly_class = int(prediction[0])

    return {"anomaly_class": anomaly_class}

@app.post("/send-email/")
async def send_email(name: str = Form(...), email: str = Form(...), message: str = Form(...)):
    sender_email = "hh8211318@gmail.com"
    sender_password = "your_app_password_here"  # Use App Password here
    recipient_email = "janarthananharismenan001@gmail.com"

    subject = f"Contact Us Form Submission from {name}"
    body = f"Name: {name}\nEmail: {email}\nMessage:\n{message}"

    try:
        msg = MIMEMultipart()
        msg['From'] = sender_email
        msg['To'] = recipient_email
        msg['Subject'] = subject
        msg.attach(MIMEText(body, 'plain'))

        with smtplib.SMTP('smtp.gmail.com', 587) as server:
            server.starttls()
            server.login(sender_email, sender_password)
            server.send_message(msg)

        return JSONResponse(content={"message": "Email sent successfully!"}, status_code=200)

    except smtplib.SMTPAuthenticationError:
        return JSONResponse(content={"error": "SMTP Authentication failed. Check your credentials."}, status_code=500)
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

# To run the app, use the command:
# uvicorn main:app --reload