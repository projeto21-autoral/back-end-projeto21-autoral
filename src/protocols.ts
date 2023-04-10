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