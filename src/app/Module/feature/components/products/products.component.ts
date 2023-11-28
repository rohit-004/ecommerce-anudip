import { Component } from '@angular/core';
import { filters, singleFilter } from './FilterData';
import { mensPantsPage1 } from '../../../../../Data/pants/men_page1';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../../State/Product/product.service';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../../Models/AppState';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

  filterData: any
  singleFilterData: any
  products: any
  levelThree: any

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private productService: ProductService, private store: Store<AppState>) { }

  ngOnInit() {
    this.filterData = filters;
    this.singleFilterData = singleFilter

    this.activatedRoute.paramMap.subscribe(
      (params) => {
        this.levelThree=params.get("levelThree")
        var reqData = {
          category: params.get("levelThree"),
          colors: [],
          sizes: [],
          minPrice: 0,
          maxPrice: 10000,
          minDiscount: 0,
          pageNumber: 0,
          pageSize: 10,
          stock: null
        }
        this.productService.findProductsByCategory(reqData)
      }
    )

    this.activatedRoute.queryParams.subscribe(
      (params) => {
        const color = params["color"];
        const size = params["size"];
        const price = params["price"];
        const discount = params["discount"];
        const stock = params["stock"];
        const sort = params["sort"];
        const minPrice = price?.split('-')[0];
        const maxPrice = price?.split('-')[1];
        const pageNumber = params["pageNumber"];


        var reqData = {
          category: this.levelThree,
          color: color ? [color].join(",") : [],
          sizes: size,
          minPrice: minPrice ? minPrice : 0,
          maxPrice: maxPrice ? maxPrice : 100000,
          minDiscount: discount ? discount : 0,
          pageNumber: pageNumber ? pageNumber : 0,
          pageSize: 10,
          stock: null,
          sort:sort?sort:"price_low"
        };

        // this.productService.findProductsByCategory(reqData);
      }
    )



    this.store.pipe(select((store) => store.product)).subscribe((product) => {
      this.products = product?.products?.content
      console.log("store data", product.products.content);

    })
  }

  handleMultipleSelectFilter(value: string, sectionId: string) {
    const queryParams = { ...this.activatedRoute.snapshot.queryParams };

    const filterValues = queryParams[sectionId] ? queryParams[sectionId].split(",") : [];

    const valueIndex = filterValues.indexOf(value);

    if (valueIndex != -1) {
      filterValues.splice(valueIndex, 1)
    }
    else {
      filterValues.push(value);
    }

    if (filterValues.length > 0) {
      queryParams[sectionId] = filterValues.join(",");
    }
    else {
      delete queryParams[sectionId];
    }

    this.router.navigate([], { queryParams })
  }

  handleSingleSelectFilter(value: string, sectionId: string) {
    const queryParams = { ...this.activatedRoute.snapshot.queryParams };
    queryParams[sectionId] = value;

    this.router.navigate([], { queryParams })
  }
  navigate(path: string) {
    this.router.navigate([path])
  }
}
