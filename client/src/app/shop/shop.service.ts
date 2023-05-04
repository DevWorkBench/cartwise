import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pagination } from '../shared/models/pagination';
import { Product } from '../shared/models/product';
import { Type } from '../shared/models/Type';
import { Brand } from '../shared/models/Brand';
import { ShopParams } from '../shared/models/shopParams';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = 'https://localhost:5001/api/'

  constructor(private http: HttpClient) { }

  getProducts(shopParam: ShopParams) {
    let params = new HttpParams();

    if (shopParam.brandId > 0) params = params.append('brandId', shopParam.brandId);
    if (shopParam.typeId) params = params.append('typeId', shopParam.typeId);
    params = params.append('sort', shopParam.sort);
    params = params.append('pageIndex', shopParam.pageNumber);
    params = params.append('pageSize', shopParam.pageSize);
    if (shopParam.search) params = params.append('search', shopParam.search);


    return this.http.get<Pagination<Product[]>>(this.baseUrl + 'products', { params });
  }

  getProduct(id: number) {
    return this.http.get<Product>(this.baseUrl + 'products/' + id);
  }

  getBrands() {
    return this.http.get<Brand[]>(this.baseUrl + 'products/brands');
  }

  getTypes() {
    return this.http.get<Type[]>(this.baseUrl + 'products/types');
  }
}
