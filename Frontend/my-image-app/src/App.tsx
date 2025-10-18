import { useEffect, useState} from 'react'
import './App.css'
import axios from 'axios'
import React from 'react'

function App() {

  const [images, setImages] = useState('');
  const [Description, setDescrition] = useState('');
  const [ImageUrl, setimagesUrl] = useState('');
  
  const handleSubmit = async (e)=> {
    e.preventDefault();

    try {
      const res = await axios.post(
        'http://localhost:3000/images',
        {
          Description,
          ImageUrl
        }
      ) 
      alert('POSTED!!!!!!')
    } catch (error) {
      console.error('Axios error:', error)
    }

  }

  useEffect(() => {
     
  axios.get('http://localhost:3000/images')
  .then(res => setImages(res.data))
  .catch(error => console.error('Error fetching data:', error ))
  }, [])
  return (
       <div>
      <h1>Image Gallery</h1>
      {images.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {images.map((img) => (
            <li key={img.id}>
              <p>{img.Description}</p>
              <img src={img.ImageUrl} width="300" height="300" />
            </li>
          ))}
        </ul>
      )}
      <form onSubmit={handleSubmit}>

      <label htmlFor="Description">Enter Description: </label> 
      <input 
        value={Description} 
        id="Description" 
        name="Description"
        onChange={(e) => setDescrition(e.target.value)} 
      /> <br></br> <br></br>
      <label htmlFor="Description">Enter ImageUrl : </label> 
      <input 
        value={ImageUrl} 
        id="ImageUrl" 
        name="ImageUrl"
        onChange={(e) => setimagesUrl(e.target.value)} 
        /> <br></br> <br></br>
      <button type="submit">Upload Image</button> 

      </form>
    </div>  
  )
}

export default App
