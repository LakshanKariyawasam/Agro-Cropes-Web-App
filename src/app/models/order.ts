export interface Order {
    $key: string;
    orderRef: string;
    totalCount: number;
    userId: string
    dateInserted: Date;
}