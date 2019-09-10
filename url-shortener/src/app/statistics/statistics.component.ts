import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent, ColumnMode } from '@swimlane/ngx-datatable';
import { UrlShortenerService } from '../core/services/url-shortener.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css', '../home/home.component.css']
})
export class StatisticsComponent implements OnInit {

  rows = [];
  temp = [];
  reorderable = true;

  columns = [{ prop: 'urlCode' }, { prop: 'originalUrl', width: 200 }, { prop: 'shortUrl' }, { prop: 'count', width: 50 }, { prop: 'lastLocation' }, { prop: 'createdAt' }, { prop: 'updatedAt' }];
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;

  ColumnMode = ColumnMode;

  constructor(private _urlShortener: UrlShortenerService, private datePipe: DatePipe) {


    this._urlShortener.getAllUrls().subscribe(
      (data) => {
        console.dir(data);
        this.rows = [];
        for (const item of data) {
          var location = 'http://maps.google.com/maps?q=' + item.lat + ',' + item.lng;
          this.temp.push({
            urlCode: item.urlCode,
            originalUrl: item.originalUrl,
            shortUrl: item.shortUrl,
            count: '<span class="label">' + item.count + '</span>',
            lastLocation: '<a href="' + location + '" >Url - Ubicación</a>',
            createdAt: this.datePipe.transform(item.createdAt, "medium"),
            updatedAt: this.datePipe.transform(item.updatedAt, "medium")
          });
        }
        this.rows = this.temp;
      },
      (error) => {

      }
    )
  }



  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    const temp = this.temp.filter(function (d) {
      return d.originalUrl.toLowerCase().indexOf(val) !== -1 || !val;
    });

    this.rows = temp;
    this.table.offset = 0;
  }
  ngOnInit() {
  }

}
