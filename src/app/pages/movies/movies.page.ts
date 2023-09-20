import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, IonInfiniteScroll, LoadingController } from '@ionic/angular';
import { Movie } from 'src/app/resources/interface/movies';
import { TmdbService } from 'src/app/services/tmdb.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {

  movies: Movie[] = [];
  currentPage = 1;
  imagesURL = environment.endpoint.moviesImagesURL;

  constructor(
    private tmdbService: TmdbService,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.loadMovies();
  }

  async loadMovies(event? : InfiniteScrollCustomEvent) {
    const loading = await this.loadingController.create({
      message: 'Carregando...',
      spinner: 'crescent',
    });
    await loading.present();

    this.tmdbService.getTopRatedMovies(this.currentPage).subscribe((response) => {
      loading.dismiss();
      this.movies = [...this.movies, ...response.results];
      event?.target.complete();

      if(event) {
        event.target.disabled = response.total_pages == this.currentPage;
      }
    });
  }

  loadMoreMovies(event: any){
    this.currentPage++;
    this.loadMovies(event);
  }

  searchMovie(event: any){
    const search = event.target.value;

    if(search && search.trim() != ''){
      this.tmdbService.searchMovie(search).subscribe(res => {
          this.movies = res.results;
        }
      )
    }
  }
}
