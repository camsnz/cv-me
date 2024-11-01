import { Contact, DateTimeValue, EducationItem, JobRole, JobRoleId, Person, References, ResumeData, TimeSpan } from "./types"

export const FmtMarkDown = (data:ResumeData) => {

  return TitleHeader(data.person) + ""

}

const TitleHeader = (person:Person) => `
# ${person.name} <span>${person.careerTitle}</span>

<hgroup>

${person.contacts.map(c => `* ${fmtContact(c)}`)}
  
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
  if(role.employers)
    return `*${role.employers[0]}*`
  if(role.companies)
    return `*${role.companies[0]}*`
  return "";
}
const asDate = (val:DateTimeValue) => new Date()
const fmtShortDate = (span:TimeSpan) => {
  return "start - end"
}


const Roles = (roles:JobRole[]) => roles.map(r => `

### ${r.roleTitle} ${fmtEmployer(r)} <span>${[r.roleLocations.join(", "),fmtShortDate(r.timespan)].join(" | ")}</span>

\`${r.technologies.join(" | ")}\`

${r.achievements.map(ach => "* " + ach)}

`).join("\n")

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

const tableRows = roles.map(r => `| ${fmtShortDate(r.timespan)} | ${r.roleTitle} @ ${fmtEmployer(r)} | ${r.technologies.join(" \\| ")} |`)

return pre + tableRows.map(r => tableHead + r)
}

const academicSection = (education:EducationItem[]) => `

## Academic Background

${education.map(e => `
${e.institution} ${e.qualification} ${e.title} ${fmtShortDate(e.timespan)}
`)}

`

const references = (references:References) => `

## References

${references.showDetail ? "" : "Available on Request" }

${references.reference.map(ref => `

  #### ${ref.person.name}

  ${ref.person.careerTitle} - ${fmtEmployer(ref.role)}

`)}
`