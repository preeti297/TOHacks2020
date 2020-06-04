import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as CanvasJS from './canvasjs.min';

@Component({
  selector: 'app-pharmacy',
  templateUrl: './pharmacy.component.html',
  styleUrls: ['./pharmacy.component.css']
})
export class PharmacyComponent implements OnInit {
  count = 0
  data : any
  chartType: string = 'pie';
  chartDatasets:any;
  chartLabels:any;
  chartColors:any;
  chartOptions:any;
  constructor(private http: HttpClient) { }
  @Input() childMessage: string

  ngOnInit(): void {
  }

  ngOnChanges() {
    console.log(this.childMessage);
    this.showText(this.childMessage)
  }
  showText(title: string) {
    let dataPoints1 = [];
    if (title != "") {


      this.http.get('https://covid-hotline-bling.herokuapp.com/dataallfips').subscribe(response => {
        
        console.log(response);

                   for (let i = 0; i < response.length; i++) {

        if(response[i]['state']=== title){

          dataPoints1.push({ y: response[i]['cases'], label: response[i]['county'] });
        }
                   }
       console.log(dataPoints1);
       var chart = new CanvasJS.Chart("LinechartContainer", {
        animationEnabled: true,
        theme: "light2", // "light1", "light2", "dark1", "dark2"
        title:{
          text: "County Cases"
        },
        axisX:{
          title : "County"
         },
         axisY:{
          title : "Confirmed Cases Count"
         },
        data: [{        
          type: "column",  
         
          dataPoints: dataPoints1
        }]
      });
      chart.render();
      })
        
  
    
    
  }
  
}

}