const EventEmitter = require('events');

// Create an instance of EventEmitter
const myEmitter = new EventEmitter();

// Define an event listener
myEmitter.on('userRegistered' , (user) =>{
    console.log(`welcome , ${user.name}`);
})
myEmitter.on('userRegistered' , (user) =>{
    console.log(`Hope you're , ${user.name}`);
})

// Emit the event
myEmitter.emit('userRegistered', {name: 'John Doe'});

