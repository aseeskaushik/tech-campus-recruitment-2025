const fs = require('fs');
const path = require('path');

function extractLogs(filename, date) {
    if (!fs.existsSync(filename)) {
        console.error("Error: Unable to open log file!");
        return;
    }

    const outputDir = path.join(__dirname, '../output');
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }
    const outputFilename = path.join(outputDir, `output_${date}.txt`);
    const outFile = fs.createWriteStream(outputFilename);

    const readStream = fs.createReadStream(filename, { encoding: 'utf8' });
    let buffer = '';

    readStream.on('data', chunk => {
        buffer += chunk;
        let lines = buffer.split('\n');
        buffer = lines.pop();

        lines.forEach(line => {
            if (line.startsWith(date)) {
                outFile.write(line + '\n');
            }
        });
    });

    readStream.on('end', () => {
        if (buffer.startsWith(date)) {
            outFile.write(buffer + '\n');
        }
        outFile.end();
        console.log(`Logs for ${date} saved to ${outputFilename}`);
    });

    readStream.on('error', err => {
        console.error("Error reading log file:", err);
    });
}

if (process.argv.length !== 3) {
    console.error("Usage: node extract_logs.js <YYYY-MM-DD>");
    process.exit(1);
}

const logFileName = path.join(__dirname, '../logs2024/logs_2024.log'); 
const date = process.argv[2];
extractLogs(logFileName, date);
