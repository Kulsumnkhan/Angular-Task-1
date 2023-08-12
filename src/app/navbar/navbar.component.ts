import { Component, OnInit, ViewChild } from '@angular/core';
import { DataHandlerService } from '../shared/services/dataHandler.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  @ViewChild("myForm") productList: any;

  constructor(private httpServe: DataHandlerService) {}

  ngOnInit(): void { }

  onSubmit() {
    console.log(this.productList.value);
    this.httpServe.addProductsList(this.productList.value).subscribe((data: any) => {
      console.log(data);
      this.httpServe.getProductsList().subscribe(( data: any ) => {
        console.log(data);
      })
    });
    this.productList.reset();
  }
}
