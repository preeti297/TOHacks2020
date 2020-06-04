import { Component, OnInit ,Input, OnChanges} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as CanvasJS from './canvasjs.min';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css'],
})
export class StatsComponent implements OnInit,OnChanges{

  constructor(private http: HttpClient) { }
  state = []
  count = 0
  totalCount = 0
  @Input() childMessage: string
  ngOnInit(): void {

   

  }
  onLoad():void{
    console.log("gelll");
  }

  ngOnChanges(){
console.log(this.childMessage);
this.showText(this.childMessage)
  }

  showText(title: string) {
    if (title != "") {


      this.http.get('https://energ.ee/covid19-us-api/states.json').subscribe(response => {
        let dataPoints1 = [];
        this.count = response[title][response[title].length - 1]['confirmed']
        for (let i = 0; i < response[title].length; i++) {

          let p = response[title][i]['confirmed']
          this.state.push(response[title][i]);
          dataPoints1.push({ y: parseInt(p), label: response[title][i]['date'] });
        }

        console.log(this.count);
 
        let chart = new CanvasJS.Chart("chartContainer", {
          zoomEnabled: true,
          animationEnabled: true,
          exportEnabled: true,
          title: {
            text: "Corona Statistics Each Day"
          },
          subtitles:[{
            text: "Try Zooming and Panning"
          }],
          data: [
          {
            type: "line",                
            dataPoints: dataPoints1
          }],
          axisX:{
            title : "Date"
           },
           axisY:{
            title : "Confirmed Cases Count"
           }
        });
          
        chart.render();
      }
      )


    }
    else {
      alert("Fill the name first!!!");
    }
  }
}
