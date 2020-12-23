const fs = require('fs')

class Ticket {
    constructor(number, desktop) {
        this.number = number;
        this.desktop = desktop;
    }
}


class TicketControl {

    constructor() {
        this.last = 0;
        this.today = new Date().getDate()
        this.ticktets = [];
        this.lastFour = []
        let data = require('../data/data.json');
        if (data.today == this.today) {
            this.last = data.last;
            this.tickets = data.tickets;
            this.lastFour = data.lastFour;
        } else {
            this.reebootCounter()
        }
    }

    nextTicket() {
        this.last += 1;

        const ticket = new Ticket(this.last, null);
        this.tickets.push(ticket)

        this.saveFile()
        return `Ticket ${this.last}`
    }

    reebootCounter() {
        this.last = 0;
        this.tickets = [];
        this.lastFour = [];
        console.log('Se ha inicializado el sistema');
        this.saveFile();

    }


    saveFile() {
        let data = {
            last: this.last,
            today: this.today,
            tickets: this.tickets,
            lastFour: this.lastFour
        }

        data = JSON.stringify(data);
        fs.writeFileSync('./server/data/data.json', data);
    }

    getLastTicket() {
        return `Ticket ${this.last}`
    }
    getLastFour() {
        return this.lastFour;
    }

    serverTicket(desktop) {
        if (this.tickets.length == 0) {
            return 'No hay tickets'
        }

        let ticketNumber = this.tickets[0].number;
        this.tickets.shift()

        let currentTicket = new Ticket(ticketNumber, desktop)

        this.lastFour.unshift(currentTicket);

        if (this.lastFour.length > 4) {
            this.lastFour.splice(-1, 1) // borra el ultimo
        }

        console.log('Ultimos 4');
        console.log(this.lastFour);

        this.saveFile();

        return currentTicket;

    }

}

module.exports = {
    TicketControl
}