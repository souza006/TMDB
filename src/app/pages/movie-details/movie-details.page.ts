import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TmdbService } from 'src/app/services/tmdb.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
})
export class MovieDetailsPage implements OnInit {
  movie: any;
  imagesURL = environment.endpoint.moviesImagesURL;


  constructor(
    private route: ActivatedRoute,
    private tmdbService: TmdbService
  ) {

  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    this.tmdbService.getMovieDetails((id == undefined) ? '0' : id).subscribe((res) => {
      console.log(res);
      this.movie = res;
    });
  }

  openMoviePage(){
    window.open(this.movie.homepage);
  }
}
