const controls_container = document.querySelector(".controls-main");
const video = document.querySelector("video");
const video_btn = document.querySelector("btn-play");
const video_btn_icon = document.querySelector(".btn-play>i");
const valume_btn = document.querySelector(".valume-btn");
const valume_btn_icon = document.querySelector(".valume-btn>i");
const volume_show = document.querySelector(".volume-show");
const full_screen_btn = document.querySelector(".btn-full-screen");

function show_controls(){
    controls_container.style.opacity = 1;
}
function hide_controls(){
    controls_container.style.opacity = 0;
}
function control_animation(n){
    show_controls();
    setTimeout(hide_controls, 3000);
}
function play_video() {
    if (!video.paused){
        video_btn_icon.classList.remove("fa-pause");
        video_btn_icon.classList.add("fa-play");
        video.pause();
    }else{
        video_btn_icon.classList.remove("fa-play");
        video_btn_icon.classList.add("fa-pause");
        video.play();
    }
}

function seekButton(n){
    video.currentTime += n * 5;
}

video.addEventListener("timeupdate",()=>{
    let percent = video.currentTime/video.duration * 100;
    document.querySelector(".progress").style.width = percent+"%";
});

function volume_control(n){
    control_animation(3000);
    if (0 <= video.volume <= 1){
        video.volume = (video.volume + n * 0.2).toFixed(1);
        volume_show.textContent = video.volume*100+"%";  
        if(video.volume === 0){
            video.muted = true;
            valume_btn_icon.classList.remove("fa-volume");
            valume_btn_icon.classList.add("fa-volume-mute");
            simpleAnimation(volume_show,200);
        }else{
            video.muted = false;
            valume_btn_icon.classList.add("fa-volume");
            valume_btn_icon.classList.remove("fa-volume-mute");
            simpleAnimation(volume_show,200);
        }
    }
}

function simpleAnimation(elm,n){
    elm.style.opacity = 0.2;
    setTimeout(()=>{elm.style.opacity = 1},n)
}

document.onkeydown = (e) => {
    switch (e.key){
        case "ArrowRight":
            seekButton(1);
            break;
        case "ArrowLeft":
            seekButton(-1);
            break;
        case "ArrowUp":
            volume_control(1);
            break;
        case "ArrowDown":
            volume_control(-1);
            break;
        case " ":
            play_video();
            if(video.paused){
                show_controls();
            }else{
                hide_controls();
            }
            break; 
        case "Enter":
            full_screen();
            break;
    }
}

function toggle_mute(){
    if (video.muted){
        video.muted = false;
        valume_btn_icon.classList.add("fa-volume");
        valume_btn_icon.classList.remove("fa-volume-mute");
    }else{
        video.muted = true;
        // valume_btn_icon.classList.replace(" fa-volume"," fa-volume-mute")
        valume_btn_icon.classList.remove("fa-volume");
        valume_btn_icon.classList.add("fa-volume-mute");
    }
}

function full_screen(){
    if(video.requestFullscreen){
        video.requestFullscreen();
    }
    if(document.exitFullscreen){
        document.exitFullscreen();
    }
}

function stopVideo(){
    if (video.currentTime !== 0){
        play_video();
        video.currentTime = 0;
    }
}