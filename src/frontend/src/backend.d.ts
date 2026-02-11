import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Contribution {
    address: string;
    timestamp: Time;
    amount: bigint;
}
export interface Allocation {
    address: string;
    amount: bigint;
}
export type Time = bigint;
export interface backendInterface {
    getAllContributionsForAddress(address: string): Promise<Array<Contribution>>;
    getAllContributors(): Promise<Array<Contribution>>;
    getPresaleStatus(): Promise<{
        active: boolean;
        depositAddress: string;
        totalIcp: bigint;
        remainingIcp: bigint;
    }>;
    getTotalAllocation(address: string): Promise<Allocation>;
    updatePresaleProgress(newAmount: bigint, contributor: string, depositAddress: string): Promise<void>;
}
