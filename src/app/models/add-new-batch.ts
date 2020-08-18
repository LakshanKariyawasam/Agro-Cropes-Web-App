import { BatchItem } from "../models/batch-item";

export class AddNewBatch {

    batchId: number = 0;
    batchCode: string = null;
    description: string = null;
    batchDate: string = null;
    batchStatus: number = 1;
    batchItemList: BatchItem[] = new Array<BatchItem>();

}