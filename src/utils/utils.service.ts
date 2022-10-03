import { Injectable } from '@nestjs/common';
import { AES, HmacSHA1 } from 'crypto-js';
import { Base64  } from 'js-base64';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UtilsService {
    constructor(
        private config: ConfigService
    ){}

    fetchErrorInsideString(detail: string): string{
        let regExp = /\(([^)]+)\)/;
        let matches = regExp.exec(detail);
        if(matches){
            return matches[1];
        }
    }

    ecryptObj(planData: any){
        const encryptData = AES.encrypt(JSON.stringify(planData), this.config.get('SECRET_CRYPT')).toString();
        const base64Encode = Base64.btoa(encryptData); 
        return base64Encode;
    }

    decrypt(encryptData: any){
        var CryptoJS = require("crypto-js");
        const base64 = Base64.atob(encryptData);
        var bytes  = CryptoJS.AES.decrypt(base64, this.config.get('SECRET_CRYPT'));
        var originalText = bytes.toString(CryptoJS.enc.Utf8);
        return originalText;
    }

    async genPhone(phone: string): Promise<string> {
        const tmpPhone: string = phone;
        const regex = new RegExp(/^(\+62|62)?[\s-]?0?8[1-9]{1}\d{1}[\s-]?\d{4}[\s-]?\d{2,5}$/);
        if (regex.test(phone)) {
            if (tmpPhone.substring(0, 2) === '08') {
                return `+628${phone.substring(2, phone.length)}`;
            }
        } else {
            return '';
        }
    }

    formatDate(d: Date): string{
        const t = new Date(d).getDate();
        const b = new Date(d).getMonth() + 1;
        const thn = new Date(d).getFullYear();
        let tgl = '';
        let bln = '';
        if(t < 10){
            tgl = `0${t}`;
        } else {
            tgl = `${t}`;
        }
        if(b < 10){
            bln = `0${b}`;
        } else {
            bln = `${b}`;
        }
        return `${thn}-${bln}-${tgl}`; 
    }

}
