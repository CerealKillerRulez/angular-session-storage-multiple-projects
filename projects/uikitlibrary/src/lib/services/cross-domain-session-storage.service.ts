import { CrossDomainStorageService } from "./cross-domain.storage.service";
import  *  as CryptoJS from  'crypto-js';
import { filter, fromEvent, Subscription } from "rxjs";
import { Injectable, OnDestroy } from "@angular/core";

/** Contratto di un servizio di gestione dati criptati in uno storage.
 *  Può avere più declinazioni in base all'implementazione: Session Storage, Local Storage, File di testo, Api di caching
 */
 @Injectable({ providedIn: 'root' })
export class CrossDomainSessionStorageService implements CrossDomainStorageService, OnDestroy {
    private ENCRYPT_KEY: string = 'ENCRYPT_KEY';
    private containerWindow: Window = window;
    private subs = new Subscription();
    
    ngOnDestroy(): void {
        this.subs.unsubscribe();
    }

    public setEncryptKey(key: string): void {
        this.ENCRYPT_KEY = key;
    }


    /** Imposta la window di riferimento, usata per il passaggio di dati tra host e remote */
    public setContainerWindow(window: Window): void {
        this.containerWindow = window;
    }


    /** Esegue una postmessage ad un remote attraverso la iframe, criptando i dati */
    public sendDataToRemote<T>(key: string, value: T): void {
        this.validate();

        const jsonValue = JSON.stringify(value);
        this.containerWindow.postMessage(
            {
                action: 'sendToRemote',
                key,
                value: this.encrypt(jsonValue)
            }
            , '*'
        );
    }


    public getItem<T>(key: string): T {
        const savedValue = sessionStorage.getItem(key) as string;
        const decryptedValue = this.decrypt(savedValue);

        return JSON.parse(decryptedValue) as T;
    }


    /** Ascolta le postmessage che arrivano dall'host per allineare i dati con la session storage del remote in ascolto */
    public startListeningFromHost(): void {
        this.subs.add(
            fromEvent(window, 'message')
            .subscribe(
              message => this.messageHandler(message as MessageEvent)
            )
        );
    }
   

    /** Handler dei messaggi in arrivo dall'host. Vengono salvati nella session storage, nel bucket associato al dominio del remote in ascolto */
    private messageHandler(event: MessageEvent): void {
        this.validate();

        const { key, value } = event.data;
        sessionStorage.setItem(key, JSON.stringify(value))
    }


    private validate(): void {
        if(!this.containerWindow)
            throw Error('Window non inizializzata');
    }

    private encrypt(txt: string): string {
        return CryptoJS.AES.encrypt(txt, this.ENCRYPT_KEY).toString();
    }


    private decrypt(txtToDecrypt: string) {
        return CryptoJS.AES.decrypt(txtToDecrypt, this.ENCRYPT_KEY).toString(CryptoJS.enc.Utf8);
    }
}


