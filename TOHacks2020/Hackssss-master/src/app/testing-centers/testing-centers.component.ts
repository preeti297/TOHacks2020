import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-testing-centers',
  templateUrl: './testing-centers.component.html',
  styleUrls: ['./testing-centers.component.css']
})

export class TestingCentersComponent implements OnInit {
  organization =[]
  constructor(private http: HttpClient){ }
  retrive : Boolean
  @Input() childMessage: string
  ngOnInit(): void {
    this.retrive = false;
  }
  ngOnChanges(){
    console.log(this.childMessage);
    this.showText(this.childMessage)
      }
goBack(){
  this.organization=[]
  this.retrive = false;
}
  showText(title:string) {
    if(title!="")
  {

this.organization=[]
console.log(title.toLowerCase());
 this.http.get('https://covid-19-testing.github.io/locations/'+title.toLowerCase()+'/complete.json').subscribe(response => {
  console.log(response);
this.retrive=true;
  for (let i = 0; i < response.length; i++) {
    // console.log ("Block statement execution no." + i);
    this.organization.push(response[i]);
  }
 }
 )


  }
  else
  {
   alert("Fill the name first!!!");
  }
  }
}


