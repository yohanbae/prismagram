import {adjectives, nouns} from './words';
import nodemailer from 'nodemailer';
import sgTransport from 'nodemailer-sendgrid-transport';
import jwt from "jsonwebtoken";


export const secretGenerator = () => {
    const randomNumber = Math.floor(Math.random() * adjectives.length);
    return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
}

console.log('Util', process.env.JWT_SECRET);

// You need to manual to perform this
export const sendMail = (email) => {
    const options = {
        auth: {
            api_user: process.env.SENDGRID_USERNAME,
            api_key: process.env.SENDGRID_PASSWORD
        }
    }    
    const client = nodemailer.createTransport(sgTransport(options));
    return client.sendMail(email);
}



export const sendSecretMail = (address, secret) => {
    const email = {
        from: "gentlebae@gmail.com",
        to: address,
        subject: "Login Secret for Prismagram",
        html: `Hello! Your secret code is ${secret}.<br />Copy paste on the app to log in.`        
    };
    return sendMail(email);
}

export const generateToken = id => jwt.sign({ id }, process.env.JWT_SECRET);
