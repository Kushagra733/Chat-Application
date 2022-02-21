const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInp = document.getElementById('messageInp');
const messagecontainer = document.querySelector('.container');

const x = prompt("enter your name to join"); 
socket.emit('new-user-joined',x);

const append = (message,position)=>{

    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messagecontainer.append(messageElement);
};

socket.on('user-joined', x =>{
    append(`${x} joined the chat`,'right');
})


form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInp.value;
    append(`You : ${message}`,'right');
    socket.emit(`send` , message);
    messageInp.value='';
})
socket.on('receive',data =>{
    append(`${data.name}: ${data.message}`,'left');
})