import { AfterViewInit, Component, OnInit, Renderer2 } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FooterComponent } from '../footer/footer.component';

declare const $ : any;

@Component({
    selector: 'app-mahasiswa',
    // standalone : true,
    imports: [HeaderComponent, SidebarComponent, FooterComponent],
    templateUrl: './mahasiswa.component.html',
    styleUrl: './mahasiswa.component.css'
})

export class MahasiswaComponent implements AfterViewInit{
  data: any;
  table1: any;

  constructor(private HttpClient: HttpClient, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.renderer.removeClass(document.body, "sidebar-open");
    this.renderer.addClass(document.body, "sidebar-closed");
    this.renderer.addClass(document.body, "sidebar-collapse")


    this.table1 = $("#table1").DataTable();

    this.bindMahasiswa();
  }

  bindMahasiswa(): void{
    this.HttpClient.get("https://stmikpontianak.cloud/011100862/tampilMahasiswa.php").subscribe((data: any) => {
      console.log(data);

      this.table1.clear();

      data.forEach((element: any)=>{
        var tempatTanggalLahir = element.TempatLahir + ", " + element.TanggalLahir;

        // const jenisKelaminFormatted = (element.jenisKelamin == "Perempuan" || element.jenisKelamin == "perempuan")? "<i class=></i>"

        var row = [
          element.NIM,
          element.Nama,
          element.jenisKelamin,
          tempatTanggalLahir,
          element.JP,
          element.Alamat,
          element.StatusNikah,
          element.TahunMasuk
        ]

        this.table1.row.add(row);
      });
      this.table1.draw(false);
    });
  }

  showTambahModal(): void {
    $("#tambahModal").modal();
  }

  postRecord(): void{
    var alamat = $("#alamatText").val();
    var jenisKelamin = $("#jenisKelaminSelect").val();
    var jp = $("#jpSelect").val();
    var nama = $("#namaText").val();
    var nim = $("#nimText").val();
    var statusNikah = $("#statusNikahSelect").val();
    var tahunMasuk = $("#tahunMasukText").val();
    var tanggalLahir = $("#tanggalLahirText").val();
    var tempatLahir = $("#tempatLahirText").val();

    if (nim.length == 0){
      alert("NIM belum di isi");
      return;
    }

    if (nama.length == 0){
      alert("Nama belum di isi");
      return;
    }

    if (tempatLahir.length == 0){
      alert("Tempat lahir belum di isi");
      return;
    }

    if (tanggalLahir.length == 0){
      alert("Tanggal lahir belum di isi");
      return;
    }

    if (alamat.length == 0){
      alert("Alamat belum di isi");
      return;
    }

    if (tahunMasuk.length == 0){
      alert("Tahun masuk belum di isi");
      return;
    }

    alamat = encodeURIComponent(alamat);
    jenisKelamin = encodeURIComponent(jenisKelamin);
    jp = encodeURIComponent(jp);
    nama = encodeURIComponent(nama);
    nim = encodeURIComponent(nim);
    statusNikah = encodeURIComponent(statusNikah);
    tahunMasuk = encodeURIComponent(tahunMasuk);
    tanggalLahir = encodeURIComponent(tanggalLahir);
    tempatLahir = encodeURIComponent(tempatLahir);

    var url = "https://stmikpontianak.cloud/011100862/tambahMahasiswa.php" +
    "?alamat=" + alamat +
    "&jenisKelamin=" + jenisKelamin +
    "&jp=" + jp +
    "&nama=" + nama +
    "&nim=" + nim +
    "&statusPernikahan=" + statusNikah +
    "&tahunMasuk=" + tahunMasuk +
    "&tanggalLahir=" + tanggalLahir +
    "&tempatLahir=" + tempatLahir;
    
    this.HttpClient.get(url)
    .subscribe((data : any) => {
      console.log(data);
      alert(data.status + " --> " + data.message);

      this.bindMahasiswa();
      $("#tambahModal").modal("hide");
    });
  }
}
