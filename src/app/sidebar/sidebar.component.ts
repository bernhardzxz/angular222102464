import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'app-sidebar',
    imports: [RouterModule],
    standalone: true,
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit{
  constructor(private router: Router, private cookieService: CookieService){}
  @Input() moduleName: string = "";
  username: string = "";

  ngOnInit(): void {
    this.username = this.cookieService.get("userId");
  }

  logout(){
    this.cookieService.delete('userId', '/', 'localhost', false, 'Lax');
    console.log("Session data berhasil dihapus");


    this.router.navigate(["/login"])
  }
  
}
