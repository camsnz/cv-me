import { exit } from "node:process";
import { writeFileSync } from 'node:fs';
import {typedData as userData} from "../../inputs/user-content.ts"
import {typedData as egData} from "../../inputs/example-content.ts"
import type { ResumeData } from "./types.ts";

const selectData = ():ResumeData => {
    if(userData?.person?.name == "") {
        console.log("No user data found, will use: `inputs/example-content.ts`")
        console.log("> Edit the file `inputs/user-content.ts` to make a custom document")
        console.log()
        return egData;
    }
    return userData;
}

const writeToJson = () => {
    const data = selectData();
    const json = JSON.stringify(data);
    try {
        writeFileSync('bin/json-content.json', json, 'utf-8');
        console.log('JSON file has been saved successfully');
    } catch (error) {
        console.error('Error writing JSON file:', error);
        exit(1);
    }
        
}

writeToJson();