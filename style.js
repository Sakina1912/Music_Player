const music_container = document.getElementById('music-container')
const title = document.getElementById('title')
const audio = document.getElementById('audio')
const img_music = document.getElementById('img-music')
const playBtn = document.getElementById('play')
const nextBtn = document.getElementById('next')
const prevBtn = document.getElementById('prev')
const progressContainer = document.getElementById('progress-container')
const progress = document.getElementById('progress')


let songs=['Friends','Love','Nature']

let songIndex = 0

loadSong(songs[songIndex])

function loadSong(song){
    title.innerText = song
    audio.src = `audio/${song}.mp3`
    img_music.src = `/img/${song}.jpg`
}

function playSong(){
    music_container.classList.add('play')
    playBtn.querySelector('i.fas').classList.remove('fa-play')
    playBtn.querySelector('i.fas').classList.add('fa-pause') 

    audio.play()
}

function pauseSong(){
    music_container.classList.remove('play')
    playBtn.querySelector('i.fas').classList.add('fa-play')
    playBtn.querySelector('i.fas').classList.remove('fa-pause') 

    audio.pause()
}

function updateProgress(e){
    const {duration, currentTime} = e.srcElement
    const progressPercentage = (currentTime/duration) * 100
    progress.style.width =`${progressPercentage}%`
}

function onClickProgress(e){
    const width = this.clientWidth
    const click = e.offsetX
    const duration = audio.duration
    audio.currentTime = (click/width) * duration
}

function prevSong(){
    songIndex--
    if(songIndex < 0){
        songIndex = songs.length-1
    }

    loadSong(songs[songIndex])
    playSong()
}

function nextSong(){
    songIndex++

    if(songIndex > songs.length-1){
        songIndex = 0
    }

    loadSong(songs[songIndex])
    playSong()
}


playBtn.addEventListener('click',()=>{
    const playing = music_container.classList.contains('play')

    if(playing){
        pauseSong()
    }else{
        playSong()
    }
})

prevBtn.addEventListener('click',prevSong)
nextBtn.addEventListener('click',nextSong)

audio.addEventListener('timeupdate',updateProgress)

progressContainer.addEventListener('click',onClickProgress)