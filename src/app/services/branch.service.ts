import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppParams } from '../app.module';
import { Res } from '../models/response';

@Injectable()
export class BranchService {

    constructor(public http: HttpClient) { }

    public getAllBranch() {
        return this.http.get<Res>(AppParams.BASE_PATH + "BranchService/getBranchDetails");
    }

}
