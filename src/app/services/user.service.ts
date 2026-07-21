import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { IUserDto } from '../models/user';
import { IHttpResponse } from '../models/http-response.model';
import { IPaginationResponse } from '../models/paginations.model';
import { ApiUrls } from './apis';
import {Manager} from '../models/manager';
import {map} from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UserService    extends BaseService {

    constructor(injector: Injector ) {
        super(injector);
    }

    getAllUsers(): Observable<IPaginationResponse<IUserDto[]>> { // for internal all contracts only
        return this.get<IUserDto[]>(ApiUrls.Users.GetAllUsers);
    }

  getManagerInfo(): Observable<Manager> {
    return this.get<Manager>(ApiUrls.Users.GetManagerInfo)
      .pipe(map(res => res.data));
  }




}
