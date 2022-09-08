import { Observable, Subject } from "rxjs";

/** Contratto di un servizio di gestione dati criptati in uno storage.
 *  Può avere più declinazioni in base all'implementazione: Session Storage, Local Storage, File di testo, Api di caching
 */
export abstract class CrossDomainStorageService {
    public abstract setEncryptKey(key: string): void;
    public abstract setContainerWindow(window: Window): void;
    public abstract sendDataToRemote<T>(key: string, value: T): void;
    public abstract startListeningFromHost(): void;
    public abstract getItem<T>(key: string): T;
    public abstract setItem<T>(key: string, item: T): void;
    public abstract isHostBounded(): Observable<void>;
    public abstract unboundHost(): void;
}