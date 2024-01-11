// Календарь

const readline = require('readline');
const fs = require('fs');

class Calendar {
    constructor() {
        this.events = {};
    }

    addEvent(date, event) {
        if (!this.events[date]) {
            this.events[date] = [];
        }
        this.events[date].push(event);
    }

    viewCalendar() {
        console.log(this.events);
    }

    viewEventsForDate(date) {
        console.log(this.events[date] || 'На данную дану ничего не назначено');
    }

    saveToFile(filename) {
        fs.writeFileSync(filename, JSON.stringify(this.events));
    }

    restoreFromFile(filename) {
        this.events = JSON.parse(fs.readFileSync(filename));
    }
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const calendar = new Calendar();

rl.on('line', (input) => {
    const [command, ...params] = input.split(' ');

    switch (command) {
        case 'viewCalendar':
            calendar.viewCalendar();
            break;
        case 'viewEventsForDate':
            calendar.viewEventsForDate(params[0]);
            break;
        case 'addEvent':
            calendar.addEvent(params[0], params.slice(1).join(' '));
            break;
        case 'saveToFile':
            calendar.saveToFile(params[0]);
            break;
        case 'restoreFromFile':
            calendar.restoreFromFile(params[0]);
            break;
        default:
            console.log('Unknown command');
    }
});

console.log('Доступные команды: viewCalendar, addEvent (Пример: addEvent 7.7.2023 Встреча с друзьями), viewEventsForDate (Пример: viewEventsForDate 7.7.2023), saveToFile (Пример: saveToFile MyCalendar.json), restoreFromFile (Пример: restoreFromFile MyCalendar.json)');
