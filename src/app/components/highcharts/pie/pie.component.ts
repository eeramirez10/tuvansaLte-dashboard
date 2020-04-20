import { Component, OnInit } from '@angular/core';

import * as Highcharts from 'highcharts'
import Drilldown from 'highcharts/modules/drilldown';
Drilldown(Highcharts);
import theme from 'highcharts/themes/dark-unica'
import { TuvansaService } from 'src/app/services/tuvansa.service';

theme(Highcharts);



@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styles: [' a{ cursor:pointer } ']
})
export class PieComponent implements OnInit {
  date: Date = new Date();
  years: any [] = []
  months: String[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  month = this.date.getMonth();
  currentYear = this.date.getFullYear()
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    series: [{
      name: "Venta",
      data: [],
      type: 'pie'
    }], tooltip: {
      headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
      pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>${point.y:,.2f}</b> of total<br/>'
    },
    plotOptions: {
      series: {
        dataLabels: {
          enabled: true,
          format: '{point.name}: <b>{point.percentage:.2f}%</b>'

        }
      }
    },
    title: {
      text: ' '
    },
    drilldown: {
      series: [{
        name: 'Ventas Mexico',
        id: 'mexico',
        data: [],
        type: 'pie'
      }]
    }

  };

  constructor(private tuvansaService: TuvansaService) {

    
    this.years = this.tuvansaService.getDateMonthYearsOfTotalSells();


  
    

    this.tuvansaService.getFamilies(2020,1).subscribe( (data:any)=>{
      this.chartOptions.drilldown.series = data;
      Highcharts.chart('pie', this.chartOptions)
    })
    this.getData(this.month, this.currentYear)
    setInterval(()=>{
      this.getData(this.month, this.currentYear)
    },180000)
  }

  ngOnInit() {
  }

  getData(month, year) {
    console.log(month,year)
    this.chartOptions.series[0]['data'] = [];
    this.tuvansaService.getBranchOfficesMonth(month + 1, year).subscribe((data: any) => {
      const sucursales = data;
      
      if (sucursales.length === 0){
        this.chartOptions.title.text = `Aun sin ventas <strong>${this.getMonths(month)}, ${year}</strong> `;
        Highcharts.chart('pie', this.chartOptions)
        return;        
      }
      this.chartOptions.series[0]['data'] = sucursales
      this.chartOptions.title.text = `Ventas por familia ${this.getMonths(month)}, ${year}`;
      Highcharts.chart('pie', this.chartOptions)
    })

    this.tuvansaService.getFamilies(year,month + 1).subscribe( (data:any)=>{
    
      this.chartOptions.drilldown.series = data;
      Highcharts.chart('pie', this.chartOptions)
    })

  }

  getMonths(month) {

    return this.months[month];
  }

}
