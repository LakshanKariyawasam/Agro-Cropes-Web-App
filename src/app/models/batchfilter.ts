import {ClrDatagridStringFilterInterface} from "@clr/angular";
import { BatchItem } from "../models/batch-item";
import { Component } from "@angular/core";
import { AddNewBatch } from "../models/add-new-batch";

class BatchFilter implements ClrDatagridStringFilterInterface<AddNewBatch> {
    accepts(addNewBatch: AddNewBatch, search: string):boolean {
        return "" + addNewBatch.batchCode == search
            || addNewBatch.batchCode.toLowerCase().indexOf(search) >= 0;
    }
}

@Component({ /* ... */ })
class MyComponent {
    private pokemonFilter = new BatchFilter();
}