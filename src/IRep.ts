export interface IRep {
    name: string;
    photo_url: string;
    offices: {
        [key:string]: {
            postal: string;
            tel: string;
            type: string;
        }
    }
    email: string;
    district_name: string;
    elected_office: string;
}