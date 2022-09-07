
export abstract class StorageService {
    public abstract setItem<T>(key: string, value: T): void;
    public abstract getItem<T>(key: string): T;
    public abstract setEncryptKey(key: string): void;
    public abstract clear(): void;
}