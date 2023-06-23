//Listen for submit
document.querySelector('#zipform').addEventListener('submit',getLocationInfo);

//Listen for delete
document.querySelector('body').addEventListener('click',deleteLocation);

function getLocationInfo(e) {
    e.preventDefault();

    //Get zip value
    const zip = document.querySelector('.zip').value;

    //Make request
    fetch(`https://api.zippopotam.us/IN/${zip}`)
    .then(response => {
        if(response.status != 200){
            document.querySelector('#output').innerHTML = 
                `
                <article class="message is-danger">
                <div class="message-body">
                   Invalid ZipCode , please try again.
                </div>
                </article>
                `;
            setTimeout(()=> {
                document.querySelector('#output').innerHTML = '';
            },1000);
        }
        else{
            return response.json();
        }
    })
    .then(data => {
        //Show location info
        let output = '';
        data.places.forEach(place => {
            output += `
              <article class = "message is-primary">
                <div class = "message-header">
                   <p>Location Info</p>
                   <button class="delete"></button>
                </div>
                <div class="message-body">
                <ul>
                   <li><strong>City: </strong>${place['place name']}</li>
                   <li><strong>State: </strong>${place['state']}</li>
                   <li><strong>Longitude: </strong>${place['longitude']}</li>
                   <li><strong>Latitude: </strong>${place['latitude']}</li>
                <ul>
                </div>
              </article>
            `;
        });
        //Insert into output
        document.querySelector('#output').innerHTML = output;
    })
}

//Delete 
function deleteLocation(e) {
    if(e.target.className == 'delete'){
        document.querySelector('.message').remove();
        document.querySelector('.zip').value = '';
    }
}