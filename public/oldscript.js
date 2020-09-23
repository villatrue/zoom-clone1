// request video and audio
const videoGrid = document.getElementById('video-grid')
console.log(videoGrid)
const myVideo = document.createElement('video');
myVideo.muted = true;

let myVideoStream
navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(stream =>{
    myVideoStream = stream;
    addVideoStream(myVideo, stream);
} )

// we need to get access to the promis

const addVideoStream = (video, stream) => {
    video.srcObject = stream; // when data is loaded //play video
    video.addEventListener('loadmetadata', () =>{
        video.play();
    })
    videoGrid.append(video);

} 