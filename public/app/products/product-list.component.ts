import { Component, OnInit }  from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import { FormsModule,FORM_DIRECTIVES }   from '@angular/forms';
import { IProduct } from './product';
import { ProductFilterPipe } from './product-filter.pipe';
import { StarComponent } from '../shared/star.component';
import { ProductService } from './product.service';
import { AuthenticationService } from '../authentication/authentication.service';
import { DataService} from '../shared/data.service';

@Component({
    templateUrl: 'app/products/product-list.component.html',
    styleUrls: ['app/products/product-list.component.css'],
    pipes: [ProductFilterPipe],
    directives: [StarComponent, ROUTER_DIRECTIVES,FORM_DIRECTIVES],
    providers: [AuthenticationService, DataService]
})
export class ProductListComponent implements OnInit {
    pageTitle: string = 'Product List';
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    listFilter: string = '';
    errorMessage: string;
    products: IProduct[];

    constructor(private router: Router,
                private _productService: ProductService,
                private _AuthenticationService: AuthenticationService,
                private _dataService: DataService) {

    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    ngOnInit(): void {
           //this._AuthenticationService.checkCredentials(); // redirection if not authenticated      
            if(this._AuthenticationService.checkCredentials()) {

               /*this._productService.getProducts()
                     .subscribe(
                       products => this.products = products,
                       error =>  this.errorMessage = <any>error);
                       */
                this._dataService.httpGet('get-products', {})
                               .map((res) => res.json())
                                .subscribe(data => this.products= data, 
                                            err => this._dataService.parseError(err.json())
                                );
                
                // console.log(JSON.stringify(this.__response));
                // if(!this.__error) {
                //     this.products = this.__response;
                // } else {
                //     console.log(data.error);
                // }

             }
    }

    onRatingClicked(message: string): void {
        this.pageTitle = 'Product List: ' + message;
    }
}
