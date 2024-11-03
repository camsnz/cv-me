import { Contact, DateTimeValue, EducationItem, JobRole, JobRoleId, Person, References, ResumeData, TimeSpan } from "./types.ts"
import {parse, format} from "date-fns"

// \`\`\`
// ${JSON.stringify(data)}
// \`\`\`

export const FmtToMarkDown = (data:ResumeData) => `${TitleHeader(data.person)}

${FocusedRoles(data.roles, data.focusedRoles)}

${FullCareerHistory(data.roles, data.focusedRoles)}

${academicSection(data.education)}

${references(data.references)}

`

const TitleHeader = (person:Person) => `
# ${person.name} <span>${person.careerTitle}</span>

<hgroup>

${person.contacts.map(c => `* ${fmtContact(c)}
`).join("")}
</hgroup>
`

const fmtContact = (contact:Contact) => {
  switch(contact.kind) {
    case "email":
      return `[${contact.value}](mailto:${contact.value})`
    case "phone": 
      return `[${contact.value}](tel:${contact.value})`
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
const asDate = (val:DateTimeValue):Date => {
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

const unoDate = new Date(1);
const fmtShortDate = (date:Date):string => {
  if(unoDate > date) {
    return "Now"
  }
  return format(date, "LLL yy").split(" ").join("'")
}

const fmtTimeSpanToShortDate = (span:TimeSpan):string => {
  const start = asDate(span.start)
  const end = asDate(span.end)
  return `${fmtShortDate(start)} - ${fmtShortDate(end)}`
}

const FocusedRoles = (roles:JobRole[], focusedRoles:JobRoleId[]) => {
  const content = roles.filter(r => focusedRoles.includes(r.id)).map(r => `
### ${r.roleTitle} ${fmtEmployer(r)} <span>${[r.roleLocations.join(", "),fmtTimeSpanToShortDate(r.timespan)].join(" | ")}</span>

\`${r.technologies.join(" | ")}\`

${r.achievements.map(ach => `* ${ach}
`).join("")}`).join("");

  return `## Summary
${content}`;
}


const FullCareerHistory = (allRoles:JobRole[], focusedRoles:JobRoleId[]) => {
const pre = `
## Full Career History
<div class="work-history">
`
const tableHead = `
| When | Where | What           |
|--------|---------|----------------- |
`
const roles = allRoles.filter(r => !focusedRoles.includes(r.id)).sort((a,b) => asDate(a.timespan.start).getTime() - asDate(b.timespan.start).getTime())

const tableRows = roles.map(r => `| ${fmtTimeSpanToShortDate(r.timespan)} | ${r.roleTitle} @ ${fmtEmployer(r)} | ${r.technologies.join(" \\| ")} |`)

return `
## Full Career History
<div class="work-history">

${tableRows.map(r => `${tableHead}${r}
`).join("")}

</div>
`
}

const academicSection = (education:EducationItem[]) => `
## Academic Background
${education.map(e => `
### ${e.qualification} ${!e.title ? "" : `*${e.title}*`} <span>${[e.institution.name,fmtTimeSpanToShortDate(e.timespan)].join(" | ")}</span>

${!e.achievements ? "" : e.achievements.map(ach => `* ${ach}
`).join("")}`).join("")}`


const references = (references:References) => `
## References

${references.showDetail ? "" : "Available on Request" }

${references.reference.map(ref => `
#### ${ref.person.name}

${ref.person.careerTitle}
`).join("")}`
// - ${fmtEmployer(ref.role)}