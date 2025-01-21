import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  categories: any = [];
  categoryName: string = '';
  pageNumber: number = 1;
  pageSize: number = 10;
  total: number;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    var obj = {
      "spName": "usp_category",
      "params": {
        "Flag": "GET",
        "PageNum": this.pageNumber,
        "PageSize": this.pageSize
      }
    };
    this.apiService.post(obj).subscribe(data => {
      if (data.statusCode === 200) {
        if (data.message === 'Data found') {
          this.categories = data.data.records;
          this.total = data.data.totalRecords;
        }
      }
    }, (error) => {
      alert(error.error.message);
    });
  }

  addCategory(): void {
    if (this.categoryName) {
      var obj = {
        "spName": "usp_category",
        "params": {
          "Flag": "INSERT",
          "CategoryName": this.categoryName
        }
      };
      this.apiService.post(obj).subscribe(data => {
        if (data.statusCode === 200) {
          this.categoryName = '';
          this.loadCategories();
        }
        alert(data.message);
      }, (error) => {
        alert(error.error.message);
      });
    }
  }

  updateCategory(id: number): void {
    var obj = {
      "spName": "usp_category",
      "params": {
        "Flag": "UPDATE",
        "CategoryName": this.categoryName,
        "CategoryId": id
      }
    };
    this.apiService.post(obj).subscribe(data => {
      if (data.statusCode === 200) {
        this.categoryName = '';
        this.loadCategories();
      }
      alert(data.message);
    }, (error) => {
      alert(error.error.message);
    });
  }

  deleteCategory(id: number): void {
    var obj = {
      "spName": "usp_category",
      "params": {
        "Flag": "DELETE",
        "CategoryId": id
      }
    };
    this.apiService.post(obj).subscribe(data => {
      if (data.statusCode === 200) {
        this.loadCategories();
        alert(data.message);
      }
    }, (error) => {
      if (error.error.message.includes('conflicted with the REFERENCE')) {
        alert('Category is already mapped to product!');
      } else {
        alert(error.error.message);
      }
    });
  }

  pageChange(page:number):void{
    this.pageNumber = page;
    this.loadCategories();
  }
}
