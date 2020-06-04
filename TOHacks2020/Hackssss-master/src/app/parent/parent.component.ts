import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {

  constructor(private http:HttpClient) { }
totalCount:String
hello: String = 'Arizona';
  ngOnInit(): void {
    this.http.get('https://covid-simple-api.now.sh/api/world').subscribe(response => {

      this.totalCount = response['totalCases']
      console.log(response);
      
    })
  
    }
  

  
  showText(title: string) {
    if (title != "") {
     
      this.hello=title
    
    }
}
}
