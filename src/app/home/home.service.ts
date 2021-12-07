import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private BASE_URL = 'https://conduit.productionready.io/api'

  constructor(private http: HttpClient) { }
}
