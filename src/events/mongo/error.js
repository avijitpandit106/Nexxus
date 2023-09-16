const chalk = require('chalk');

module.exports = {
    name: 'error',
    execute(err) {
        console.log(chalk.red(`An error occured while conecting to the database: \n${err}`));
    }
}