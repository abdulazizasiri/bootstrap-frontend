import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { IUserDto } from '../models/user';
import { IHttpResponse } from '../models/http-response.model';
import { IPaginationResponse } from '../models/paginations.model';
import { ApiUrls } from './apis';

@Injectable({ providedIn: 'root' })
export class UserService    extends BaseService {

    constructor(injector: Injector ) {
        super(injector);
    }

    getAllUsers(): Observable<IPaginationResponse<IUserDto[]>> { // for internal all contracts only
        return this.get<IUserDto[]>(ApiUrls.Users.GetAllUsers);
    }




}
