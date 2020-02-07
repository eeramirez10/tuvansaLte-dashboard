import { Component, OnInit, Type } from '@angular/core';
import * as Highcharts from "highcharts";

import Drilldown from 'highcharts/modules/drilldown';
import { TuvansaService } from 'src/app/services/tuvansa.service';

Drilldown(Highcharts);

 

@Component({
  selector: 'app-basic-line',
  templateUrl: './basic-line.component.html',
  styles: ['a{ cursor: pointer } ']
})
export class BasicLineComponent implements OnInit {
  
  all:Boolean = true;
  Highcharts: typeof Highcharts = Highcharts;
  date:Date = new Date();
  currentYear = this.date.getFullYear();
  chartOptions: Highcharts.Options = {
    series:[] ,
    title: {
      text: ''
    },
    xAxis:{
       
      type:'category'

    },

    plotOptions: {
       line: {
                dataLabels: {
                    enabled: false
                },
                enableMouseTracking: true
            }
    }

  };

  constructor(private TuvansaService:TuvansaService){ 
    this.getBranchOfficesYearData(this.currentYear);

    setInterval(()=>{
      this.getBranchOfficesYearData(this.currentYear);
    },180000)
  }

  ngOnInit() {
  }


  getBranchOfficesYearData (anio){

    this.TuvansaService.getBranchOfficesYear(anio).subscribe( (data:any) =>{

      
      this.all = true;
      const branchOffices = data;
      this.chartOptions.series = branchOffices;
      this.chartOptions.title.text = ` Ventas Sucursales - ${anio} `
      Highcharts.chart('line',this.chartOptions)   

    })
  }

  anio20(year){
    this.getBranchOfficesYearData(year);
  }

  anio19(year){
    this.getBranchOfficesYearData(year)
  }


  anio18(year){
    this.getBranchOfficesYearData(year)
  }

  getMexicoSellPerYear(){
    this.all = false;
    this.setBranchOfficceYearSells(1);
  }

  getMonterreySellPerYear(){
    this.all = false;
    this.setBranchOfficceYearSells(2);
  }


  getVeracruzSellPerYear(){
    this.all = false;
    this.setBranchOfficceYearSells(3);
  }

  getMexicaliSellPerYear(){
    this.all = false;
    this.setBranchOfficceYearSells(4);
  }

  getQueretaroSellPerYear(){
    this.all = false;
    this.setBranchOfficceYearSells(5);
  }

  getAll(){
    this.getBranchOfficesYearData(this.currentYear); 
  }

  setBranchOfficceYearSells(BranchOfficce){
    let currentYear = new Date().getFullYear();
    this.chartOptions.series = []
  
    Highcharts.chart('line',this.chartOptions) 
    let index = 0;
  
    for(let anio=currentYear; anio>=2019; anio--){
      this.TuvansaService.getBranchOfficeYear(BranchOfficce,anio).subscribe( (data:any) =>{
       
        this.chartOptions.series[index] = data;
        this.chartOptions.title.text = `Venta ${this.TuvansaService.getBranchOffice(BranchOfficce -1 )}`
        Highcharts.chart('line',this.chartOptions) 
        index++; 
      })
    
    }

  }

 

}
