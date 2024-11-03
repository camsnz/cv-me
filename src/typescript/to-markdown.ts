import { exit } from "node:process";
import { writeFileSync } from 'node:fs';

import {FmtToMarkDown} from "./templater.ts"
import type { ResumeData } from "./types.ts";

import jsonBlob from "../../bin/json-content.json" with { type: "json" }

const data:ResumeData = jsonBlob;

const markdown = FmtToMarkDown(data);

try {
    writeFileSync('bin/markdown-content.md', markdown, 'utf-8');
    console.log('Markdown file has been saved successfully');
} catch (error) {
    console.error('Error writing Markdown file:', error);
    exit(1);
}

