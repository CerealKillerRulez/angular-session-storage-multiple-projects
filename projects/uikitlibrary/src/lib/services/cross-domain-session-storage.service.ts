import { CrossDomainStorageService } from "./cross-domain.storage.service";
import  *  as CryptoJS from  'crypto-js';
import { filter, fromEvent, Observable, Subject, Subscription } from "rxjs";
import { Injectable, OnDestroy } from "@angular/core";

/** Contratto di un servizio di gestione dati criptati in uno storage.
 *  Può avere più declinazioni in base all'implementazione: Session Storage, Local Storage, File di testo, Api di caching
 */
 @Injectable({ providedIn: 'root' })
export class CrossDomainSessionStorageService implements CrossDomainStorageService, OnDestroy {
    private ENCRYPT_KEY: string = 'ENCRYPT_KEY';
    private containerWindow: Window = window;
    private subs = new Subscription();
    private hostBounded$ = new Subject<void>();

    ngOnDestroy(): void {
        this.subs.unsubscribe();
        this.hostBounded$.unsubscribe();
    }

    public setEncryptKey(key: string): void {
        this.ENCRYPT_KEY = key;
    }

    public isHostBounded(): Observable<void> {
        return this.hostBounded$.asObservable();
    }

    public unboundHost(): void {
        this.hostBounded$.complete();
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
                action: 'message',
                key,
                value: this.encrypt(jsonValue)
            }
            , '*'
        );
    }

    /** Ottiene un valore salvato nella session storage */
    public getItem<T>(key: string): T {
        const savedValue = sessionStorage.getItem(key) as string;
        if(!savedValue)
            return <T>{};

        const decryptedValue = this.decrypt(savedValue);

        return JSON.parse(decryptedValue) as T;
    }

        /** Ottiene un valore salvato nella session storage */
        public setItem<T>(key: string, item: T): void {
            const encryptedValue = this.encrypt(JSON.stringify(item));
            sessionStorage.setItem(key, encryptedValue);
        }


    /** Ascolta le postmessage che arrivano dall'host per allineare i dati con la session storage del remote in ascolto */
    public startListeningFromHost(): void {
        this.validate();

        this.subs.add(
            fromEvent(window, 'message').subscribe(
              message => {
                this.messageHandler(message as MessageEvent);
                this.hostBounded$.next();
            })
        );
    }
   

    /** Handler dei messaggi in arrivo dall'host. Vengono salvati nella session storage, nel bucket associato al dominio del remote in ascolto */
    private messageHandler(event: MessageEvent): void {
        const { key, value } = event.data;
        sessionStorage.setItem(key, value as string);
    }

    /** Verifica che la window sia valorizzata, per poter fare post dei dati tra un app e l'altra */
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


