const chalk = require('chalk');

module.exports = {
    name: 'disconnected',
    execute() {
        console.log(chalk.gray('[Database Status]: Disconnected'));
    }
}