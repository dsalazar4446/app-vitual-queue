//  Comando para establecer la conexion
var socket = io()
var label = $('#lblNuevoTicket');

socket.on('connect', function() {
    console.log('conectado al servidor');
})


socket.on('disconnect', function() {
    console.log('Desconectado del servidor');
})

socket.on('currentState', function(data) {
    label.text(data.current)
})

$('button').on('click', function() {
    socket.emit('nextTicket', null, function(nextTicket) {
        label.text(nextTicket);
    })
})