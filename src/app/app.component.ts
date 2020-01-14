import { Component, OnInit } from "@angular/core";
import { Subject, Observable } from "rxjs";
import { debounceTime, map, mergeMap, catchError, tap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.sass"]
})
export class AppComponent {
  constructor(private http: HttpClient) {}
  search: Subject<string> = new Subject<string>();
  searchStream$: Observable<string> = this.search.pipe(
    debounceTime(2000),
    mergeMap(o =>
      this.http.get(`https://www.googleapis.com/books/v1/volumes?q=${o}`)
    ),
    map(o => JSON.stringify(o)),
    catchError(o => "error!")
  );
}
