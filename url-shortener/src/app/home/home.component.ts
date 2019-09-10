import { Component, OnInit } from '@angular/core';
import { UrlShortenerService } from '../core/services/url-shortener.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  urlOriginal: string;
  shortUrl: string;
  lat: string;
  lng: string;
  constructor(private _urlShortener: UrlShortenerService) { }

  ngOnInit() {
    this.getLocation();
  }

   convertUrl() {
   
    this.shortUrl = 'http://localhost:7000';
    this._urlShortener.postUrlToShort(this.urlOriginal, this.lat, this.lng).subscribe(
      (data) => {
        console.dir(data);
        this.shortUrl = data.shortUrl;
      },
      (error) => {
        console.log(error);
      }
    )
  }

  async getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        this.lng = String(position.coords.longitude);
        this.lat =  String(position.coords.latitude);
      });
    } else {
      console.log("No support for geolocation")
    }
  }

}

