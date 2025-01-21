import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  products: any = [];
  productName: string = '';
  categoryId: number = 1;  // Default category ID for new products

  categories: any[] = [];
  pageNumber: number = 1;
  pageSize: number = 10;
  total: number;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadCategories();
    this.loadProducts();
  }

  loadCategories(): void {
    var obj = {
      "spName": "usp_category",
      "params": {
        "Flag": "GET"
      }
    };
    this.apiService.post(obj).subscribe(data => {
      this.apiService.post(obj).subscribe(data => {
        if (data.statusCode === 200) {
          if (data.message === 'Data found') {
            this.categories = data.data.records;
          }
        }
      }, (error) => {
        alert(error.error.message);
      });
    });
  }

  loadProducts(): void {
    var obj = {
      "spName": "usp_product",
      "params": {
        "Flag": "GET",
        "PageNum": this.pageNumber,
        "PageSize": this.pageSize
      }
    };
    this.apiService.post(obj).subscribe(data => {
      if (data.statusCode === 200) {
        if (data.message === 'Data found') {
          this.products = data.data.records;
          this.total = data.data.totalRecords;
        }
      }
    });
  }

  addProduct(): void {
    if (this.productName && this.categoryId) {
      var obj = {
        "spName": "usp_product",
        "params": {
          "Flag": "INSERT",
          "ProductName": this.productName,
          "CategoryId": this.categoryId
        }
      };
      this.apiService.post(obj).subscribe(data => {
        if (data.statusCode === 200) {
          this.productName = '';
          this.loadProducts();
        }
        alert(data.message);
      }, (error) => {
        alert(error.error.message);
      });
    }
  }

  updateProduct(id: number, newCategoryId: number): void {
    var obj = {
      "spName": "usp_product",
      "params": {
        "Flag": "UPDATE",
        "ProductName": this.productName,
        "CategoryId": this.categoryId,
        "ProductId": id
      }
    };
    this.apiService.post(obj).subscribe(data => {
      if (data.statusCode === 200) {
        this.productName = '';
        this.loadProducts();
      }
      alert(data.message);
    }, (error) => {
      alert(error.error.message);
    });
  }

  deleteProduct(id: number): void {
    var obj = {
      "spName": "usp_product",
      "params": {
        "Flag": "DELETE",
        "ProductId": id
      }
    };
    this.apiService.post(obj).subscribe(data => {
      if (data.statusCode === 200) {
        this.productName = '';
        this.loadProducts();
      }
      alert(data.message);
    }, (error) => {
      alert(error.error.message);
    });
  }

  pageChange(page: number): void {
    this.pageNumber = page;
    this.loadProducts();
  }
}
