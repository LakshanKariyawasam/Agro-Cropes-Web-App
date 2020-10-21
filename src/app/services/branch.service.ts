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

    public addBranch(payload) {
        return this.http.post(AppParams.BASE_PATH + "BranchService/addBranch", payload);
    }

    public editBranch(payload) {
        return this.http.put(AppParams.BASE_PATH + "BranchService/editBranch", payload);
    }

    public deleteBranch(payload) {
        return this.http.delete(AppParams.BASE_PATH + "BranchService/deleteBranch", payload);
    }

}
