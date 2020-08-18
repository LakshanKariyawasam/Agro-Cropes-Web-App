import { Component, OnInit, ViewContainerRef, NgZone } from '@angular/core';
import { UtilService } from '../services/util.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public username: string = "";
  public name: string = "";

  public show :boolean = false;
  constructor(public util: UtilService, public router: Router, private zone: NgZone) {

  }


  ngOnInit() {
    let userObj = this.util.getLoggedInData();
    console.log("userObj: ", userObj);
    
    if(userObj[0] != undefined){
      this.username = userObj[0].firstName;
      this.name = userObj[0].userId;
      this.show = true;
      console.log("firstName: ", this.username);
      localStorage.setItem("user",userObj[0].userId);
     
   }
    
    
   
  }

  reloadPage() { // click handler or similar
    this.zone.runOutsideAngular(() => {
        location.reload();
    });
} 


  logout() {
    console.log("logging out");
    let userObj = this.util.setLoggedInData(null);
    sessionStorage.clear();
    let me = this;
    this.username;
    this.show = false;
    me.router.navigateByUrl('/');
  }

}
