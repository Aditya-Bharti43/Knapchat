const socket = io("http://localhost:8000");


const form = document.getElementById('send-container');

const messageInput = document.getElementById('messageInp')

const messageContainer = document.querySelector(".container");

// this sound pops up when you  recive the message or when someone leaves the chat
var audio=new Audio('livechat-129007.mp3');


const append=(message,position)=>{

    const messageElement=document.createElement('div')
    messageElement.innerText=message;
    messageElement.classList.add('message')
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
     
    if(position=='left')
        {
            audio.play();
        }


    }

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message=messageInput.value;
    append(`You: ${message}`,'right')
    socket.emit('send',message)
    messageInput.value=''
})

const name = prompt("Enter your name to join the chat");

socket.emit('new-user-joined', name);

socket.on('user-joined',name=>{
append(`${name} joined the chat`,'right')
})

socket.on('receive',data=>{
    append(`${data.name}: ${data.message}`,'left')
    })

    socket.on('left',name=>{
        append(`${name}: left the chat`,'left')
        })