const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {

    client.on('nextTicket', (data, callback) => {
        const next = ticketControl.nextTicket()
        console.log(next);
        callback(next);
    });


    client.emit('currentState', {
        current: ticketControl.getLastTicket(),
        lastFour: ticketControl.getLastFour()
    })

    client.on('serverTicket', (data, callback) => {
        console.log(data);
        if (!data.desktop) {
            return callback({
                err: true,
                message: 'El escritorio es necesario'
            })
        }

        let serverTicket = ticketControl.serverTicket(data.desktop);

        callback(serverTicket)

        client.broadcast.emit('lastFour', { lastFour: ticketControl.getLastFour() })
    })

});