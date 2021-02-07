
const weatherForm = document.querySelector('form')

const search = document.querySelector('input')

const messageOne = document.getElementById('messageOne')
const messageTwo = document.getElementById('messageTwo')

// messageOne.textContent = ''


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const url = `/weather?address=${search.value}`

   

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch(url).then((resp) => {
    resp.json().then((data) => {
        if(data.error){
          
            messageOne.textContent = data.error
          
        }
        else{
           
           
            messageOne.textContent = `Forecase for the location ${search.value}`
            messageTwo.textContent = `Temperature is ${data.forecast.temp}, feels like ${data.forecast.feelsLike}. Precipitation is ${data.forecast.precip}. Weather is ${data.forecast.weatherDesc}. Windspeed is ${data.forecast.windSpeed}`
        }
        
        
    })
}).catch(err => console.log(err))
})




