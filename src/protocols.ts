export type ApplicationError = {
    name: string;
    message: string;
};

export type UserParams = {
    name: string;
    email: string;
    password: string; 
};

export type AuthParams = {
    email: string;
    password:string;
};

export type ScrapbookParams = {
    name: string,
    userId: number,
    numberPictures: number
}

export type PictureParams = {
    url: string,
    name: string,
    scrapBookId: number,
    comment: string,
}

export type ArrayPictureParams = PictureParams[]

export type UpdatePictureParams = Omit<PictureParams, "scrapBookId">