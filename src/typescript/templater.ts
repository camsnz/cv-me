import { Contact, DateTimeValue, EducationItem, JobRole, JobRoleId, Person, References, ResumeData, TimeSpan } from "./types.ts"
import {parse, format} from "npm:date-fns"
import parsePhone from "npm:libphonenumber-js";

// \`\`\`
// ${JSON.stringify(data)}
// \`\`\`
export const FmtToMarkDown = (data:ResumeData) => applyMarkdownTemplate(remapData(data))

const applyMarkdownTemplate = (data:ResumeData) => `${TitleHeader(data.person)}

${SummaryAndFocusedRoles(data.person.careerBlurb, data.roles, data.focusedRoles)}

${FullCareerHistory(data.roles, data.focusedRoles)}

${academicSection(data.education)}

${references(data.references)}

`

const pipeReplace = (s:string) => s.replaceAll("|", "\\|")

const remapData = (data:ResumeData):ResumeData => ({
  ...data,
  roles: data.roles.map(r => ({
    ...r,
    roleTitle: pipeReplace(r.roleTitle),
    companies: r.companies.map(c => ({...c, name: pipeReplace(c.name)})),
    employers: r.employers.map(c => ({...c, name: pipeReplace(c.name)})),
  })),
})

const TitleHeader = (person:Person) => `
# ${person.name} <span>${person.careerTitle}</span>

<hgroup>

${person.contacts.map(c => `* ${fmtContact(c)}
`).join("")}
</hgroup>
`

const fmtTelephone = (str:string) => {
  const ph = parsePhone(str)
  return `[${ph.formatNational()}](${ph.getURI()})`
}

const fmtContact = (contact:Contact) => {
  switch(contact.kind) {
    case "email":
      return `[${contact.value}](mailto:${contact.value})`
    case "phone": 
      return fmtTelephone(contact.value) // `[${contact.value}](tel:${contact.value})`
    case "linkedin":
      return `[linkedin](https://linkedin.com/in/${contact.value})`
    case "github":
      return `[github](https://github.com/${contact.value})`
    case "website":
      return `[www](${contact.value})`
    case "location":
      return contact.value
    default:
      return contact.value
  }
}

const fmtEmployer = (role:JobRole) => {
  if(role.employers?.length > 0)
    return `*${role.employers[0]?.name}*`
  if(role.companies?.length > 0)
    return `*${role.companies[0]?.name}*`
  return "";
}
export const asDate = (val:DateTimeValue):Date => {
  if(!val) {
    return new Date(0);
  }
  if(val instanceof Date) {
    return val as Date;
  }
  if(typeof val != "string") {
    return new Date(0);
  }

  if(val.trim() == "" || val.toLowerCase() == "present") {
    return new Date();
  }
  return parse(val, "yyyy-MM-dd", new Date())
}

type DateFormatOptions = {
  year?:boolean,
  month?:boolean,
  day?:boolean,
}

const unoDate = new Date(1);
const fmtShortDate = (date:Date):string => {
  if(unoDate > date) {
    return "Now"
  }
  let formatted;
  try {
    formatted = format(date, "LLL yy").split(" ").join("'")
  } catch(e) {
    console.log({date})
    console.error(e);
    throw e;
  }
  return formatted;
}

const fmtMedDate = (date:Date, options:DateFormatOptions):string => {
  const fmtOpts = [];
  if(options.day) {
    fmtOpts.push("dd");
  }
  if(options.month) {
    fmtOpts.push("LLL");
  }
  if(options.year) {
    fmtOpts.push("yyyy");
  }
  const fmtSpec = fmtOpts.join(" ");

  if(unoDate > date) {
    return "Now"
  }
  let formatted;
  try {
    formatted = format(date, fmtSpec)//.split(" ").join("'")
  } catch(e) {
    console.log({date})
    console.error(e);
    throw e;
  }
  return formatted;
}


export const fmtTimeSpanToShortDate = (span:TimeSpan):string => {
  const start = asDate(span.start)
  const end = asDate(span.end)
  if(([start,end] as unknown as string[]).includes("Invalid Date")) {
    console.error({span, start, end})
  }
  return `${fmtShortDate(start)} - ${fmtShortDate(end)}`
}

export const fmtTimeSpanToMedDate = (span:TimeSpan, options:DateFormatOptions={month:true,year:true}):string => {
  const start = asDate(span.start)
  const end = asDate(span.end)
  if(([start,end] as unknown as string[]).includes("Invalid Date")) {
    console.error({span, start, end})
  }
  return `${fmtMedDate(start,options)} - ${fmtMedDate(end,options)}`
}

const fmtDateSpan = fmtTimeSpanToMedDate;

export const sortReverseChron = (a:JobRole,b:JobRole) => asDate(b.timespan.start).getTime() - asDate(a.timespan.start).getTime()

const SummaryAndFocusedRoles = (careerBlurb: string[]|undefined, roles:JobRole[], focusedRoles:JobRoleId[]) => {
  const focusedOnly = (r:JobRole) => focusedRoles.includes(r.id)

  const content = roles.sort(sortReverseChron).filter(focusedOnly).map(r => `
### ${r.roleTitle} ${fmtEmployer(r)} <span>${[r.roleLocations.join(", "),fmtDateSpan(r.timespan)].join(" | ")}</span>

\`${r.technologies.join(" | ")}\`

${!r.blurb ? "" : r.blurb.join(`

`)}

${r.achievements.map(ach => `* ${ach}
`).join("")}`).join("");

  return `
<div class="summary">

## Summary
${!careerBlurb ? "" : careerBlurb.join(`

`) }
${content}

</div>`;
}

const FullCareerHistory = (allRoles:JobRole[], focusedRoles:JobRoleId[]) => {

const filter = () => true
// const filter = (r:JobRole) => !focusedRoles.includes(r.id)
const roles = allRoles.filter(filter).sort(sortReverseChron)

// NOTE: table col ratio impacts html: |------|-------|------|
const tableColRatio = (nums:number[]):string =>
  nums.map(n => new Array(n).fill("-").join("")).join("|")

  const tableHead = `
| When | Where | What |
|${tableColRatio([11,14,23])}|`
const rowHead = ``

const tableRows = roles.map(r => 
  `| ${fmtDateSpan(r.timespan)} | ${r.roleTitle} <br>@ ${fmtEmployer(r)} | ${r.technologies.join(", ")} |
`)

return `<div class="work-history">

## Full Career History

${tableHead}
${tableRows.map(r => `${rowHead}${r}`).join("")}

</div>
`
}

const academicSection = (education:EducationItem[]) => `
## Academic Background
${education.map(e => `
### ${e.qualification} ${!e.title ? "" : `*${e.title}*`} <span>${[e.institution.name,fmtDateSpan(e.timespan,{year:true})].join(" | ")}</span>

${!e.achievements ? "" : e.achievements.map(ach => `* ${ach}
`).join("")}`).join("")}`


const references = (references:References) => `
## References
${references.showDetail ? "" : "Contact details available on request" }

${references.references.map(ref => `
#### ${ref.name} *${ref.careerTitle} @ ${ref.companyName}*

`).join("")}`
// - ${fmtEmployer(ref.role)}