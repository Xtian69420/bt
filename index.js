const jsonfile = require('jsonfile');
const moment = require('moment');
const simpleGit = require('simple-git');
const _ = require('lodash');
const FILE_PATH = './data.json';

const makeCommit = async (n) => {
    if (n === 0) {
        await simpleGit().push();
        return;
    }

    // Define the date range: from December 1st of last year to January 1st of this year
    const startOfDecemberLastYear = moment().subtract(1, 'year').month(11).date(1); // December 1st of last year
    const startOfJanuaryThisYear = moment().startOf('year'); // January 1st of this year

    // Generate a random date between December 1st of last year and January 1st of this year
    const randomDate = moment(startOfDecemberLastYear.valueOf() + Math.random() * (startOfJanuaryThisYear.valueOf() - startOfDecemberLastYear.valueOf())).format();

    const data = {
        date: randomDate
    };

    console.log(randomDate);

    jsonfile.writeFile(FILE_PATH, data);

    await simpleGit().add([FILE_PATH]).commit(randomDate, { '--date': randomDate });

    makeCommit(n - 1);
};

makeCommit(35);
