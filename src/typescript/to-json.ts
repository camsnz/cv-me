import { exit } from "node:process";
import { writeFileSync } from 'node:fs';
import {typedData as userData} from "../../input/cv-data.ts"
import type { ResumeData } from "./types.ts";

const selectData = ():ResumeData => userData;

const writeToJson = () => {
    const data = selectData();
    const json = JSON.stringify(data);
    try {
        writeFileSync('bin/json_blob.json', json, 'utf-8');
        console.log('JSON file has been saved successfully');
    } catch (error) {
        console.error('Error writing JSON file:', error);
        exit(1);
    }
        
}

writeToJson();