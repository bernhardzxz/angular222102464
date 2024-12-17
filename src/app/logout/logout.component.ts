import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent{
  constructor(private router: Router, private cookieService: CookieService){}

  ngOnInit(): void{
    this.cookieService.deleteAll();
    console.log("session data berhasil dihapus")

    this.router.navigate(['/login']);
  }
}
