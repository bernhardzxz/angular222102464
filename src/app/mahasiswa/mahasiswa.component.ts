import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { SidebarComponent } from "../sidebar/sidebar.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-mahasiswa',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, FooterComponent],
  templateUrl: './mahasiswa.component.html',
  styleUrl: './mahasiswa.component.css'
})
export class MahasiswaComponent {

}
