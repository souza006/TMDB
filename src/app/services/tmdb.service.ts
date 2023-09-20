import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseApi } from '../resources/interface/response-api';


@Injectable({
  providedIn: 'root'
})

export class TmdbService {

  constructor(
    private http: HttpClient
  ) {

  }

  getTopRatedMovies(page = 1): Observable<ResponseApi> {

    let params = new HttpParams().set('api_key', environment.api_key)
    params = params.append('page', page);
    params = params.append('language', environment.language);
    return this.http.get<ResponseApi>(environment.endpoint.moviesURL, {
      params: params 
    });
    
  }

  getMovieDetails(id: string) {
    let params = new HttpParams().set('movie_id', id);
    params = params.append('api_key', environment.api_key);
    params = params.append('language', environment.language);
    
    return this.http.get(`${environment.endpoint.movieDetails}${id}`, {
      params: params
    });
  }
  searchMovie(search: string){
    
    let params = new HttpParams().set('api_key', environment.api_key);
    params = params.append('language', environment.language);
    params = params.append('region', environment.region);
    params = params.append('query', search);
    
     return this.http.get<ResponseApi>(environment.endpoint.searchMovieURL,{
      params : params
     });
  }
}
