import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@app/env';
import { BaseDto, BaseEntity, ListQueryParams, PagedList } from '@app/models';

export abstract class BaseEntitiesService<
  TEntity extends BaseEntity,
  TDto extends BaseDto,
  TListQueryParams extends ListQueryParams,
  TCreateEntity,
  TCreateDto,
  TUpdateEntity,
  TUpdateDto,
> {
  abstract readonly url: string;

  abstract fromDto(dto: TDto): TEntity;

  abstract buildFilterHttpParams(params: HttpParams, queryParams: TListQueryParams): HttpParams;

  abstract toCreateEntityDto(dto: TCreateEntity): TCreateDto;

  abstract toUpdateEntityDto(dto: TUpdateEntity): TUpdateDto;

  protected constructor(protected readonly http: HttpClient) {
  }

  list(queryParams: TListQueryParams): Observable<PagedList<TEntity>> {
    return this.http.get<TDto[]>(`${environment.baseApi}/${this.url}`, {
      params: this._buildListHttpParams(queryParams),
      observe: 'response',
    }).pipe(
      map(res => ({
        items: res.body!.map(dto => this.fromDto(dto)),
        paginationMetadata: JSON.parse(res.headers.get('X-Pagination')!),
      })),
    );
  }

  get(id: string): Observable<TEntity> {
    return this.http.get<TDto>(`${environment.baseApi}/${this.url}/${id}`).pipe(
      map(dto => this.fromDto(dto)),
    );
  }

  create(model: TCreateEntity): Observable<TEntity> {
    return this.http.post<TDto>(`${environment.baseApi}/${this.url}`, this.toCreateEntityDto(model)).pipe(
      map(dto => this.fromDto(dto)),
    );
  }

  update(id: string, entity: TUpdateEntity): Observable<TEntity> {
    return this.http.put<TDto>(`${environment.baseApi}/${this.url}/${id}`, this.toUpdateEntityDto(entity)).pipe(
      map(dto => this.fromDto(dto)),
    );
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.baseApi}/${this.url}/${id}`);
  }

  private _buildListHttpParams(queryParams: TListQueryParams): HttpParams {
    let params = new HttpParams()
      .set('pageNumber', queryParams.pageNumber ?? 0)
      .set('pageSize', queryParams.pageSize ?? 25);

    if (!!queryParams.searchQuery) {
      params = params.append('searchQuery', queryParams.searchQuery);
    }

    params = this.buildFilterHttpParams(params, queryParams);

    return params;
  }
}
