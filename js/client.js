const socket=io('http://localhost:8000');

const form=document.getElementById('send-container');
const messageinput=document.getElementById('messageinp');
const messagecontainer=document.querySelector(".container");
var audio=new Audio('ting.mp3');

const append=(message,position)=>{
    const messageElement=document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messagecontainer.append(messageElement);
    if(position=='left'){
        audio.play();

    }
   

}
form.addEventListener('submit',(e)=>{
     e.preventDefault(); //page will not get reload again and again
     const message =messageinput.value;
     append(`You :${message}`,'right');
     socket.emit('send',message);
     messageinput.value='';
})

const username=prompt("Enter Your Name To Join");
socket.emit('new-user-joined',username);
//join the chat
socket.on('user-joined',data =>{
append(`${username} joined the chat`,'right');

 } )
 //receiving the message
socket.on('receive',data =>{
append(` ${data.username}: ${data.message} `,'left');
})

//disconnect
socket.on('leave',name =>{
append(` ${name} left the chat `,'left');

})
