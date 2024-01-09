import { Component, OnInit } from '@angular/core';
import { UrlService } from '../service/url/url.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-url-list',
  templateUrl: './url-list.component.html',
  styleUrls: ['./url-list.component.css']
})
export class UrlListComponent implements OnInit {
  Url: any[];
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [3, 6, 9, 12];
  filterTerm: any;
  constructor(
    private router: Router,
    private urlService: UrlService,
    private toastr: ToastrService
  ) {
    this.Url = [];
   }

  ngOnInit(): void {
    if (localStorage['status'] != 1) {

      this.router.navigate(['/login']);
      this.toastr.error('Login and try again.', 'Error', {
        // timeOut:5000,
        disableTimeOut: true,
        tapToDismiss: false,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-center-center',
        closeButton: true
      });
      return;
    }

    this.fetchUrlList();
  }

  fetchUrlList(): void{
    this.urlService.getUrlList().subscribe(data => {
      console.log(data.id);
      this.Url = data;

    }, err => {
      console.log(err);
      this.toastr.error(err.error.message, 'Error', {
        timeOut:5000,
        disableTimeOut: true,
        tapToDismiss: false,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-center-center',
        closeButton: true
      });
    });
  }

  deleteUrl(id: number) {

    if(confirm('Do you want to delete this Url?')){
      this.urlService.deleteUrl(id).subscribe(data => {

        this.toastr.warning(data.message, 'Success',{
          // timeOut:5000,
          disableTimeOut: true,
          tapToDismiss: false,
          progressBar:true,
          progressAnimation:'increasing',
          positionClass:'toast-center-center',
          closeButton:true
        });
        this.fetchUrlList();
        // this.router.navigate(['url/list']);
        // location.reload();

      }, err => {
        console.log(err);
        this.toastr.error(err.error.message, 'Error',{
          timeOut:5000,
          disableTimeOut: true,
          tapToDismiss: false,
          progressBar:true,
          progressAnimation:'increasing',
          positionClass:'toast-center-center',
          closeButton:true
        });
        // this.fetchUrlList();
      });
    }

  }

  onTableDataChange(event: any) {
    this.page = event;
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }
  onSearchInput(){
    this.page = 1;
  }

}
