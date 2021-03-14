interface Education {
    name: string;
    date: string;
    description: string;
}

interface Work {
    name: string;
    date: string;
    description: string;
}

interface Skills {
    skill: string;
    level: number;
}

export interface Resume {
    name: string;
    birthDay?: string;
    phoneNumber: string;
    email: string;
    description?: string;
    socialMediaUrls?: string[];
    photo?: string;
    education: Education[];
    work: Work[];
    skills: Skills[];
    additionalInformation?: string;
    lawDisclaimer: boolean;
}
