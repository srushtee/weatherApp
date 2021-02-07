console.log('connecting to file');


// fetch('http://puzzle.mead.io/puzzle').then((resp) => {
//     resp.json().then((data) => {
//         console.log(data);
//     })
// })



const weatherForm = document.querySelector('form')

const search = document.querySelector('input')

const messageOne = document.getElementById('messageOne')
const messageTwo = document.getElementById('messageTwo')

// messageOne.textContent = ''


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const url = `/weather?address=${search.value}`

    console.log(url);

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch(url).then((resp) => {
    resp.json().then((data) => {
        if(data.error){
            console.log(data.error);
            messageOne.textContent = data.error
          
        }
        else{
            console.log(data.forecast);
            messageOne.textContent = `Forecase for the location ${search.value}`
            messageTwo.textContent = `Temperature is ${data.forecast.temp}. Precipitation is ${data.forecast.precip}. Weather is ${data.forecast.weatherDesc}`
        }
        
        
    })
}).catch(err => console.log(err))
})




