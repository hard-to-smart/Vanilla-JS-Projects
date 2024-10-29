const right = document.getElementById("right");

const audio_path = "assets/audio/";
const image_path = "assets/images";

let instrument=['crash', 'kick', 'snare', 'tom'];

for(let key of instrument){
    const image_container = document.createElement("div");

    image_container.classList.add("box")
    const img = document.createElement("img");
    img.setAttribute("id", key)
    img.src = `${image_path}/${key}.png`
    right.appendChild(image_container).appendChild(img);
    right.addEventListener('click', (event) => {
        if (event.target.tagName === 'IMG') {
            const instrumentKey = event.target.id;
            playSound(instrumentKey);
        }}
    )
}

document.addEventListener("keydown", (event) => keyPressed(event));


function keyPressed (event) {
    console.log(`Key pressed: ${event.key}`);
    switch (event.key){
    case 'c':
        {
        playSound("crash");
        displayKey('c', 'crash')
        break
    }
    case 'k':
        {
        playSound("kick");
        displayKey('k', 'kick')
        break
    }

    case 's':
        {
        playSound("snare");
        displayKey('s', 'snare')
        break

    }

    case 't':
        {
        playSound("tom");
        displayKey('t', 'tom')
        break
    }
    }
}

function playSound( key){
    const audio = document.createElement("audio");
    audio.src = `${audio_path}/${key}.mp3`;
    console.log(" playing audio")
    audio.play()
}

function displayKey( keyChar, instrumentKey ){
    const displayKeyPressed = document.createElement('p');
    displayKeyPressed.classList.add("key", "keyhover");
    displayKeyPressed.textContent = keyChar;
    right.querySelector(`#${instrumentKey}`).parentElement.appendChild(displayKeyPressed);
    setTimeout(()=>{displayKeyPressed.remove()}, 1000)
}


// pass right in click event listener and access the values using child nodes. 
//  pass the parent div in displaykey for it to access the div. use parent right and access the child