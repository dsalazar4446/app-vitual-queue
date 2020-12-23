var socket = io();

var searchParams = new URLSearchParams(window.location.search)

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario')
}

var desktop = searchParams.get('escritorio');
console.log(desktop);

var label = $('small')

$('h1').text('Escritorio ' + desktop)

$('button').on('click', function() {
    socket.emit('serverTicket', { desktop: desktop }, function(resp) {
        label.text('Ticket ' + resp.number)

        if (resp === 'No hay tickets') {
            alert(resp)
            return
        }

        console.log('Ticket ' + resp.number);
    })
})