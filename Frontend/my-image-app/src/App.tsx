import { useEffect, useState} from 'react'
import './App.css'
import axios from 'axios'

function App() {

const [images, setImages] = useState('');

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
              <img src={img.ImageUrl} alt={img.Description} width="300" height="300" />
            </li>
          ))}
        </ul>
      )}
    </div>  
  )
}

export default App
