import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/components/common/messageservice';

@Injectable()
export class GrowlService {

  constructor(private messageService: MessageService) {

   }

   addMultipleSucess(msgs : string[]) {

    let msgArray = [];

    msgs.forEach(res=>{

      let obj = {
        severity:'success', 
        summary:'Info', 
        detail:res
      }

      msgArray.push(obj);

    });

    this.messageService.addAll(msgArray);
}

addSingleInfo(res) {

  let obj = {
    severity:'success', 
    summary:'Info', 
    detail:res
  }

  this.messageService.add(obj);

}

addSingleError(res) {

  let obj = {
    severity:'error', 
    summary:'Eror', 
    detail:res
  }
  
  this.messageService.add(obj);

}

}
