let c = (el)=> document.querySelector(el);
let ca = (el)=> document.querySelectorAll(el);




document.body.addEventListener('keyup', (event)=>{
    playSound(event.code.toLowerCase());
});

c('.composer button').addEventListener('click', ()=>{
    let song = c('#input').value;

    if(song !== ''){
        let songArray = song.split('');
        
        playSong(songArray);
    }
    
   
});

function playSound(sound){
    let audioElement = c(`#s_${sound}`);
    let keyElement = document.querySelector(`div[data-key="${sound}"]`);

    if(audioElement){
        audioElement.currentTime = 0;
        audioElement.play();
    }
    if(keyElement){
        keyElement.classList.add('active');
        setTimeout(()=>{keyElement.classList.remove('active');}, 100);
    }
}

function playSong(songArray){

    let timerWait = parseInt(c('#inputTimer').value);

    let wait = 0;

    for(let songItem of songArray){
        setTimeout(()=>{
            playSound(`key${songItem}`);
            console.log(wait);
        }, wait);

        wait += timerWait;
    }
}