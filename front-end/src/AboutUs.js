import "./AboutUs.css"
import { useState, useEffect } from 'react'
import axios from 'axios'
import loadingIcon from './loading.gif'

const AboutUs = props => {

  const [bio, setBio] = useState('')
  const [img, setImg] = useState('')
  const [error, setError] = useState('')
  const [loaded, setLoaded] = useState(false)
  /**
   * A nested function that fetches messages from the back-end server.
   */
  const fetchAboutUs = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_HOSTNAME}/aboutus`)
      .then(response => {
        // axios bundles up all response data in response.data property
        const bio = response.data.bio
        setBio(bio)
        const img = response.data.img
        setImg(img)
      })
      .catch(err => {
        const errMsg = JSON.stringify(err, null, 2) // convert error object to a string so we can simply dump it to the screen
        setError(errMsg)
      })
      .finally(() => {
        // the response has been received, so remove the loading icon
        setLoaded(true)
      })
  }

            // set up loading data from server when the component first loads
            useEffect(() => {
            // fetch messages this once
            fetchAboutUs()

            // set a timer to load data from server every n seconds
            const intervalHandle = setInterval(() => {
                fetchAboutUs()
            }, 5000)

            // return a function that will be called when this component unloads
            return e => {
            // clear the timer, so we don't still load messages when this component is not loaded anymore
            clearInterval(intervalHandle)
            }
        }, []) // putting a blank array as second argument will cause this function to run only once when component first loads
        if(!loaded) {
          return (
            <div>
            {!loaded && <img src={loadingIcon} alt="loading" />}
            </div>
          )
        }
        if(loaded) {return (
        <div className="AboutMe">            
          {bio.split('\n').map((line, index) => (
              <p key={index}>{line}</p>
            ))}            
          <img src={`${process.env.REACT_APP_SERVER_HOSTNAME}${img}`} alt="Ian Jiang"/>
        </div>
    )
  }    
}


export default AboutUs