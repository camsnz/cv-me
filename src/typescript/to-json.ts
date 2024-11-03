import { exit } from "node:process";
import { writeFileSync } from 'node:fs';
import {typedData} from "../../inputs/content-example.ts"

const json = JSON.stringify(typedData);
try {
    writeFileSync('bin/json-content.json', json, 'utf-8');
    console.log('JSON file has been saved successfully');
} catch (error) {
    console.error('Error writing JSON file:', error);
    exit(1);
}

