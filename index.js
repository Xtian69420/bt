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

    // Random date within the past 4 months
    const now = moment();
    const fourMonthsAgo = moment().subtract(4, "months");
    const randomDate = moment(fourMonthsAgo.valueOf() + Math.random() * (now.valueOf() - fourMonthsAgo.valueOf())).format();

    const data = {
        date: randomDate
    };

    console.log(randomDate);

    jsonfile.writeFile(FILE_PATH, data);

    await simpleGit().add([FILE_PATH]).commit(randomDate, { '--date': randomDate });

    makeCommit(n - 1);
};

makeCommit(40);