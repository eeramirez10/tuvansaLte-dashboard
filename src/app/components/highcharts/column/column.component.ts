import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { TuvansaService } from 'src/app/services/tuvansa.service';

import Drilldown from 'highcharts/modules/drilldown';
Drilldown(Highcharts);

  


@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styles: [' a{ cursor:pointer } ']
})
export class ColumnComponent implements OnInit {

  date:Date = new Date();
  months:String [] = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
  month = this.date.getMonth();
  year = this.date.getFullYear()
  loading:boolean;
  years: any [] = [];

  Highcharts: typeof Highcharts = Highcharts;
  
  chartOptions: Highcharts.Options = {
    series: [{
      name: "Venta",
      colorByPoint: true,
      data:[],
      type: 'column'
    }],
    title: {
      text: ''
    },
    xAxis: {
        type: 'category'
    },
    lang:{
        drillUpText: '< Regresar'
    },
    plotOptions: {
        series: {
            borderWidth: 0,
            dataLabels: {
                enabled: true,
                format: '${point.y:,.0f}'
            }
        }
    },
    drilldown: {
      series: [{
        name: 'Ventas Mexico',
        id: 'mexico',
        data: [],
        type:'column'
      }]
    }

  } ;

  constructor(private tuvansaService: TuvansaService){ 

    this.years = this.tuvansaService.getDateMonthYearsOfTotalSells();
    
    var month = this.date.getMonth();
    var year = this.date.getFullYear()

    this.getData(month,year);

    setInterval(()=>{
      this.getData(month,year);
    },180000)
    
  }



  ngOnInit() {


  }

  getMonths(month){
    
    return this.months[month];
  }


 
  getData( month, year){
    this.chartOptions.series[0]['data'] =[]
    this.tuvansaService.getBranchOfficesMonth(month+1,year).subscribe(data=>{
      const sucursales = data;
  
      if(data.length===0){
        this.chartOptions.title.text = `Aun sin ventas  ${ this.getMonths(month)}, ${year}`;
        Highcharts.chart('container',this.chartOptions) 
        return;
      }
      this.chartOptions.series[0]['data'] = sucursales;
      this.chartOptions.title.text = `Ventas ${ this.getMonths(month)}, ${year}`;
      Highcharts.chart('container',this.chartOptions) 
      
    })


    this.tuvansaService.getSellersMexico(month+1,year).subscribe((data:any) =>{
      
      this.chartOptions.drilldown.series.push (data);
      Highcharts.chart('container',this.chartOptions) 
    })
    this.tuvansaService.getSellersMonterrey(month+1,year).subscribe( (data:any) =>{
      
      this.chartOptions.drilldown.series.push(data);
      Highcharts.chart('container',this.chartOptions) 
    })
    this.tuvansaService.getSellersVeracruz(month+1,year).subscribe( (data:any) =>{
      
      this.chartOptions.drilldown.series.push(data);
      Highcharts.chart('container',this.chartOptions) 
    })
    this.tuvansaService.getSellersMexicali(month+1,year).subscribe((data:any) =>{
      
      this.chartOptions.drilldown.series.push(data);
      Highcharts.chart('container',this.chartOptions) 
    })
    this.tuvansaService.getSellersQueretaro(month+1,year).subscribe( (data:any) =>{
      
      this.chartOptions.drilldown.series.push(data);
      Highcharts.chart('container',this.chartOptions) 
    })
    this.tuvansaService.getSellersCancun(month+1,year).subscribe( (data:any) =>{
      this.chartOptions.drilldown.series.push(data);
      Highcharts.chart('container',this.chartOptions) 
    })

    
  }

}
