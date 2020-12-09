import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilityService } from 'src/app/shared/utility/utility.service';

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent {

  toggleClass = "ft-maximize";
  public isCollapsed = true;
  ToggleClass() {
    if (this.toggleClass === "ft-maximize") {
      this.toggleClass = "ft-minimize";
    } else this.toggleClass = "ft-maximize";
  }
  constructor(public utilityService: UtilityService,private router:Router) {

  }

  ngOnInit() {

  }
  onLogOut() {
    this.router.navigate([""])
  }
}
