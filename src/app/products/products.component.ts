import { Component, OnInit } from '@angular/core';
import { DataHandlerService } from '../shared/services/dataHandler.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {

  // tableNameArray: any = [];
  // existingItems: any[] = [];
  getProductsList: any[] = [];
  updateList : any[] = [];
  quantityArray: any[] = [];
  tableArray: any[] = [];
  totalAmount = 0;
  index: any;

  constructor(private http: DataHandlerService) { }

  ngOnInit(): void {
    this.getList();
    // this.http.getProductsList().subscribe((res: any) => {
    //   this.getProductsList = res;
    //   console.log(this.getProductsList);
    //   this.quantityArray = Array(this.getProductsList.length).fill(1)
    // })
  }

  getList(){
    this.http.getProductsList().subscribe(( res : any) => {
      this.getProductsList = res;
      // console.log(this.getProductsList);
      this.quantityArray = Array(this.getProductsList.length).fill(1)
    })
    this.http.updateList.subscribe(( res : any) => {
      this.updateList = res;
      // console.log(this.getProductsList);
      this.quantityArray = Array(this.updateList.length).fill(1)
    });
  }

  decrement(i: any) {
    if (this.quantityArray[i] > 1) {
      this.quantityArray[i]--
    }
  }

  increment(i: any) {
    this.quantityArray[i]++
  }

  addToTable(list: any, total: number, gTotal: number) {
    console.log(list);
    // console.log(list.id);

    // this.tableArray.push({...list, total, gTotal})
    console.log(this.tableArray);
    // this.totalAmount = this.totalAmount + gTotal;
    this.quantityArray = Array(this.getProductsList.length).fill(1);

    // this.tableArray.forEach((ele) => {
    //   this.tableNameArray.push(ele.productName);
    // })
    // console.log(this.tableNameArray);

    const existingItem = this.tableArray.findIndex(item => item.productName === list.productName);
    if( existingItem !== -1 ) {
      this.tableArray[existingItem].total += total;
      this.tableArray[existingItem].gTotal += gTotal;
    }
    else {
      this.tableArray.push({...list, total, gTotal});
    }
    this.totalAmount += gTotal;
    this.quantityArray = Array(this.getProductsList.length).fill(1);
    console.log("Updated Item:", list);
    console.log("Updated Table Array:", this.tableArray);

    // if (this.tableNameArray.includes(list.productName)) {
    //   // console.log(this.existingItems)
    //   console.log(this.tableNameArray)
    //   console.log(list.productName)
    //   console.log('true')
    //   this.tableArray[total] += total;
    //   // this.tableArray[list.id].gTotal += gTotal;
    // }
    // else {
    //   console.log('false');
    //   this.tableArray.push({ ...list, total, gTotal });
    //   this.totalAmount += gTotal;
    //   this.quantityArray = Array(this.getProductsList.length).fill(1);
    //   console.log("Updated Item:", list);
    //   console.log("Updated Table Array:", this.tableArray);
    // }


    // this.tableArray.forEach(item => {
    //   // console.log(item);
    //   if (item.productName === list.productName) {
    //     this.existingItems.push(item.productName);
    //     console.log(this.existingItems);

    //   }
    // });
    // console.log(this.tableArray);
  }

  onDelete(index: number): void {
    const deletedItem = this.tableArray.splice(index, 1)[0];
    console.log(deletedItem);
    this.totalAmount -= deletedItem.gTotal;
  }
}