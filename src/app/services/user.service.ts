import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CustomHttpUrlEncodingCodec } from './encoder';
import { UserDto } from '../models/user-dto.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  /**
   * Default header to send to the backend.
   */
  public defaultHeaders = new HttpHeaders();

  /**
   * Constructor of the service.
   * @param httpClient The injection of the HttpClient
   */
  constructor(protected httpClient: HttpClient) {}

  /**
   * This method return the users of the system.
   * The filters parameters are not required.
   * @param page the page of the result to get elements. Starts at 1.
   * @param limit the number of results by page.
   * @param id with this parameter gets the detail from this id user.
   * @param sort the name of the property which the result will be sorted.
   * @param order the direction of the order
   */

  public findUsers(page?: number, limit?: number, id?: number, sort?: string, order?: string): Observable<UserDto[]>;
  public findUsers(
    page?: number,
    limit?: number,
    id?: number,
    sort?: string,
    order?: string
  ): Observable<HttpResponse<UserDto[]>>;
  public findUsers(
    page?: number,
    limit?: number,
    id?: number,
    sort?: string,
    order?: string
  ): Observable<HttpEvent<UserDto[]>>;
  public findUsers(page?: number, limit?: number, id?: number, sort?: string, order?: string): Observable<any> {
    const parameters = {};
    if (page || page === 0) {
      // eslint-disable-next-line @typescript-eslint/dot-notation
      parameters['_page'] = page;
    }
    if (limit || limit === 0) {
      // eslint-disable-next-line @typescript-eslint/dot-notation
      parameters['_limit'] = limit;
    }
    if (id || id === 0) {
      // eslint-disable-next-line @typescript-eslint/dot-notation
      parameters['_id'] = id;
    }
    if (sort) {
      // eslint-disable-next-line @typescript-eslint/dot-notation
      parameters['_sort'] = sort;
    }
    if (order) {
      // eslint-disable-next-line @typescript-eslint/dot-notation
      parameters['_order'] = order;
    }
    return this.httpClient.get<Observable<UserDto[]>>(
      '/USERS/users_jmv',
      this.getOptions(this.defaultHeaders, Object.keys(parameters).length > 0 ? parameters : undefined)
    );
  }

  /**
   * This method is used to create a User in the system.
   * @param user the elemento to create a user. If the user is null or undefined throws an error.
   */
  public createUser(user: UserDto): Observable<UserDto>;
  public createUser(user: UserDto): Observable<HttpResponse<UserDto>>;
  public createUser(user: UserDto): Observable<HttpEvent<UserDto>>;
  public createUser(user: UserDto): Observable<any> {
    // The API support creates a user void, but it is not recommended.
    if (!user) {
      throw new Error('Required parameter user was null or undefined when calling createUser.');
    }
    return this.httpClient.post<Observable<UserDto>>('/USERS/users_jmv', user, this.getOptions(this.defaultHeaders));
  }

  /**
   * This method is used to update a User in the system.
   * @param user the elemento to update a user. If the user is null or undefined throws an error.
   */
  public updateUser(user: UserDto): Observable<UserDto>;
  public updateUser(user: UserDto): Observable<HttpResponse<UserDto>>;
  public updateUser(user: UserDto): Observable<HttpEvent<UserDto>>;
  public updateUser(user: UserDto): Observable<any> {
    if (!user) {
      throw new Error('Required parameter user was null or undefined when calling updateUser.');
    }
    if (!user.id) {
      throw new Error('Required id of the user was null or undefined when calling updateUser.');
    }
    return this.httpClient.put<Observable<UserDto>>(
      `/USERS/users_jmv/${encodeURIComponent(String(user.id))}`,
      user,
      this.getOptions(this.defaultHeaders)
    );
  }

  /**
   * This method is used to update some data of a User in the system.
   * @param id the id of the user to makes the partial update.
   * @param user the elemento to update a user. If the user is null or undefined throws an error.
   */
  public partialUpdateUser(id: number, user: UserDto): Observable<UserDto>;
  public partialUpdateUser(id: number, user: UserDto): Observable<HttpResponse<UserDto>>;
  public partialUpdateUser(id: number, user: UserDto): Observable<HttpEvent<UserDto>>;
  public partialUpdateUser(id: number, user: UserDto): Observable<any> {
    if (!id) {
      throw new Error('Required parameter id was null or undefined when calling updateUser.');
    }
    if (!user) {
      throw new Error('Required parameter user was null or undefined when calling updateUser.');
    }
    return this.httpClient.patch<Observable<UserDto>>(
      `/USERS/users_jmv/${encodeURIComponent(String(id))}`,
      user,
      this.getOptions(this.defaultHeaders)
    );
  }

  /**
   * This method is used to update some data of a User in the system.
   * @param id the id of the user to makes the partial update.
   */
  public deleteUser(id: number): Observable<UserDto>;
  public deleteUser(id: number): Observable<HttpResponse<UserDto>>;
  public deleteUser(id: number): Observable<HttpEvent<UserDto>>;
  public deleteUser(id: number): Observable<any> {
    if (!id) {
      throw new Error('Required parameter id was null or undefined when calling updateUser.');
    }
    return this.httpClient.delete<Observable<UserDto>>(
      `/USERS/users_jmv/${encodeURIComponent(String(id))}`,
      this.getOptions(this.defaultHeaders)
    );
  }

  /**
   * Function to generate the options for the REST API services.
   * @param defaultHeaders {HttpHeaders} the headers before this function.
   * @param parameters {any} the parameters that send in the query.
   */ getOptions(defaultHeaders: HttpHeaders, parameters?: any): any {
    const queryParameters = this.generateParams(parameters);

    const options: any = {
      headers: defaultHeaders,
      params: queryParameters,
      responseType: 'json',
    };

    return options;
  }

  /**
   * Function to generate the params to send into the query.
   * @param parameters {any} the params to send
   * @returns {HttpParams} the structure of the params.
   */
  generateParams(parameters?: any): HttpParams {
    let queryParameters = new HttpParams({ encoder: new CustomHttpUrlEncodingCodec() });

    if (parameters) {
      Object.entries(parameters).forEach(([key, value]: [string, any]) => {
        if (value || value === 0) {
          queryParameters = queryParameters.set(key, value);
        }
      });
    }
    return queryParameters;
  }
}
