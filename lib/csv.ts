import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';

export function parse(filePath: string) {
    const csvFile = fs.readFileSync(path.resolve(filePath), 'utf8');
    const { data } = Papa.parse(csvFile, {
        header: true,
        skipEmptyLines: true
    });
    return data;
}