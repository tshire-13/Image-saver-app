# Project: A Personal Photo Management App

## Project Overview

Build a photo management app where users can:
	
Sign up and log in (using Firebase Auth)
	
Upload images (stored in AWS S3)

View, search, and organize photos (React frontend)
	
Tag images and store metadata (Firebase Firestore or Realtime DB)
		
Backend (Node.js + Express) to handle secure upload URLs, API logic

## Tech Stack Breakdow
### Feature	& Tech Used

Frontend	                  React.js
Backend API	                   Node.js + Express
Image Storage	               AWS S3
Auth & Realtime DB	           Firebase (Auth + Firestore)

## Features to Implement
### User Authentication
	
Use Firebase Auth (Email/Password, Google Sign-In)
		
Protect routes on both frontend and backend
	
## Image Upload & Storage

Upload photos from React app
	
Send image to Node.js backend, which generates a pre-signed S3 URL
	
Store image metadata (filename, S3 URL, tags, userID, upload date) in Firebase Firestore

## Photo Gallery UI
	
Display photos in a responsive grid 

### Allow filtering by:

Upload date

Tags
	
Search by name or description

## Security
	
Only logged-in users can upload/view their own images
	
Backend verifies user token before generating S3 upload URLs

