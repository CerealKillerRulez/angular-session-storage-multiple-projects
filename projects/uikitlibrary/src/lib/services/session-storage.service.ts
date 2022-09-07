import { Injectable } from '@angular/core';
import { TitleStrategy } from '@angular/router';
import  *  as CryptoJS from  'crypto-js';
import { StorageService } from './storage.service';

@Injectable({
    providedIn: 'root'
})
export class SessionStorageService implements StorageService {
    private ENCRYPT_KEY: string = 'ENCRYPT_KEY';


    public setEncryptKey(key: string): void {
        this.ENCRYPT_KEY = key;
    }

    public setItem<T>(key: string, value: T): void {
        const jsonValue = JSON.stringify(value);
        sessionStorage.setItem(key, this.encrypt(jsonValue));
    }

    public getItem<T>(key: string): T {
        const savedValue = sessionStorage.getItem(key) as string;
        const decryptedValue = this.decrypt(savedValue);

        return JSON.parse(decryptedValue) as T;
    }

    public clear(): void {
        sessionStorage.clear();
    }



    private encrypt(txt: string): string {
        return CryptoJS.AES.encrypt(txt, this.ENCRYPT_KEY).toString();
    }

    private decrypt(txtToDecrypt: string) {
        return CryptoJS.AES.decrypt(txtToDecrypt, this.ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);
    }
}