import { ContactKind, ResumeData } from "./types"


const blob:ResumeData = {
    person: {
        name: "Bill Gatos",
        careerTitle: "Super Capitalist",
        contacts: [
            {kind: ContactKind.email, value: "some@email.net"},
            {kind: ContactKind.phone, value: "+15551234678"},
            {kind: ContactKind.github, value: "microsoft"},
            {kind: ContactKind.linkedin, value: "billgates"},
            {kind: ContactKind.location, value: "Seattle USA"},
            {kind: ContactKind.website, value: "https://microsoft.com"},
        ],
    },
    education: [
        {
            title: "Drop Out",
            institution: {
                name: "Harvard",
            },
            qualification: "Hacking Capitalism",
            timespan: {
                start: "1980",
                end: "1980",
            },
        }
    ],
    focusedRoles: [],
    roles: [
        {
            id: "1",
            technologies: [
                "Visual Basic"
            ],
            timespan: {
                start: "",
                end: "",
            },
            employers: [],
            companies: [],
            achievements: [],    
            roleLocations: [],
            roleTitle: "",
        },
        {
            id: "2",
            technologies: [
                "C++"
            ],
            timespan: {
                start: "",
                end: "",
            },
            employers: [],
            companies: [],
            achievements: [],    
            roleLocations: [],
            roleTitle: "",
        },
        {
            id: "3",
            technologies: [
                "C#"
            ],
            timespan: {
                start: "",
                end: "",
            },
            employers: [],
            companies: [],
            achievements: [],    
            roleLocations: [],
            roleTitle: "",
        },
    ],


}
