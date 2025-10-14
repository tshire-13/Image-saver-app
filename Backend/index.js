import express from 'express'
import admin from 'firebase-admin'
import bodyParser from 'body-parser' 
import dotenv from 'dotenv'
import { createPresignedPost } from "@aws-sdk/s3-presigned-post"
import { S3Client } from "@aws-sdk/client-s3"
import { initializeApp } from 'firebase/app'
import multer from 'multer'

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const app = express();
const port = process.env.PORT || 3000

app.use(express.json());

import { readFileSync } from 'fs'
const serviceAccount = JSON.parse(
readFileSync(new URL('./firebaseAdminConfig.json', import.meta.url), 'utf8')
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

const db = admin.firestore();
const collection = db.collection('imageCollections')

app.post('/images', upload.single('ImageUrl'), async(req, res) => {
  try {
  
    const file = req.file
    const body = req.body

    await collection.add(body)

    console.log("Data sent to Firestore:", req.body)
    console.log("Uploaded file info:", req.file)
    console.log("Data saved to Firestore with ID:", collection.id);
    res.status(201).json({ id: collection.id });
    res.send({})

  } catch (error) {
    
    console.error('Error adding image:', error.message)
    res.status(500).json({ error: error.message})
  
  }
})

app.get('/images', async(req, res) => {

  const db = admin.firestore()

  try {
      
    const snapshot = await db.collection('imageCollections').get()
    console.log('number of docs found:', snapshot.size)
    if (snapshot.empty) {
      console.log('No documents found.')
      return res.status(404).json({ message: 'No images found' })
    }

    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
     console.log('Data:', data)
    
    res.json(data)

  } catch (error) {
    
    res.status(500).send(error)

  }

})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
});
