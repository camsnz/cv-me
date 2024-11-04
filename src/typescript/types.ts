
export type ResumeData = {
    person: Person,
    roles: JobRole[],
    focusedRoles: JobRoleId[],
    education: EducationItem[],
    references: References,
}

export type Person = {
    name: string,
    careerTitle: string,
    careerBlurb?: string[],
    contacts: Contact[],
}

export type WorkReference = Person & {
    companyName: string,
}

export enum ContactKind {
    email = "email",
    phone = "phone",
    linkedin = "linkedin",
    github = "github",
    location = "location",
    website = "website",
}

export type Contact = {
    kind: ContactKind,
    value: string,
}

export type JobRoleId = string;
export type Technology = string;
export type Achievement = string;

export type DateTimeValue = Date | string;
export type TimeSpan = {
    start: DateTimeValue,
    end: DateTimeValue,
}
// export type DateString = string;
export type Entity = {
    id?: string;
    name: string;
    location?: string;
    industry?: string;
    website?: string;
    notssl?: boolean,
    logo?: string;
};

export type JobRole = {
    id: JobRoleId,
    blurb?: string[],
    roleTitle: string,
    roleLocations: string[],
    employers: Entity[],
    companies: Entity[],
    timespan: TimeSpan,
    technologies: Technology[],
    achievements: Achievement[],
}
// export type JobTenure = {
//     employer: Employer;
//     title: string;
//     description: string[];
//     technology: string[];
//     start: DateString;
//     end: DateString;
//     accomplishments: string[];
//     summaryOnly?: boolean;
//     ignore?: boolean;
// };

export type EducationItem = {
    institution: {
        id?: string;
        name: string;
        location?: string;
        website?: string;
    };
    qualification: string;
    title?: string;
    timespan: TimeSpan;
    achievements?: string[]
};



export type References = {
    showDetail: boolean,
    references: WorkReference[]
        // , //role: JobRole },
    // ],
}