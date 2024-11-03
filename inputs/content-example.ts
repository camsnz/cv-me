import { ContactKind, ResumeData } from "../src/typescript/types.ts"

export const typedData:ResumeData = {
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
                start: "1979-01-01",
                end: "1980-01-01",
            },
        }
    ],
    focusedRoles: ["2"],
    roles: [
        {
            id: "0",
            technologies: [
                "C"
            ],
            timespan: {
                start: "1980-01-01",
                end: "1983-01-01",
            },
            employers: [
                {name: "self employed"}
            ],
            companies: [],
            achievements: [
                "High school coding basically",
                "Lorem Epsom",
            ],
            roleLocations: [],
            roleTitle: "Hacker",
        },
        {
            id: "1",
            technologies: [
                "MS DOS"
            ],
            timespan: {
                start: "1983-01-01",
                end: "1985-01-01",
            },
            employers: [],
            companies: [{name: "Microsoft"}],
            achievements: [
                "Buy MS DOS from guy",
                "License MS DOS to IBM",
                "Start Company",
            ],
            roleLocations: [],
            roleTitle: "Canny Business Man",
        },
        {
            id: "2",
            technologies: [
                "C++"
            ],
            timespan: {
                start: "1985-01-01",
                end: "1990-01-01",
            },
            employers: [],
            companies: [{name: "Microsoft"}],
            achievements: [
                "Put computers everywhere",
                "Sell licenses for everything PCs need",
            ],
            roleLocations: [],
            roleTitle: "CEO",
        },
        {
            id: "3",
            technologies: [
                "C#"
            ],
            timespan: {
                start: "1990-01-01",
                end: "",
            },
            employers: [],
            companies: [{name: "Microsoft"}],
            achievements: [
                "Throw office-partnership freebee to Jobs",
                "Start literally saving lives",
            ],
            roleLocations: [],
            roleTitle: "King of Capitalism",
        },
    ],
    references: {
        showDetail: false,
        reference: [
            { person: {name: "Steve Ballmer", careerTitle: "Sales", contacts:[]},},
            { person: {name: "Stephen Jobs", careerTitle: "Office Partner", contacts:[]},},
        ]
    }


}
