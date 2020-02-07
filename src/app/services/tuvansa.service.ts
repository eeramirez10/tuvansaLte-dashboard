import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {  map } from "rxjs/operators";

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

interface Sucursales{
  name:string,
  y:number;
  drilldown:string;
  
}

@Injectable({
  providedIn: 'root'
})
export class TuvansaService {

  monthString: String [] = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

  url:string = "http://3.229.71.188/proscaiapirest/index.php/Ventas";

  constructor(private http:HttpClient,  public afAuth: AngularFireAuth){ }

  login(email, password){
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  logout(){
    return this.afAuth.auth.signOut();
  }

  getFamilies(year,month){
    return this.http.get(`${this.url}/familias/${year}/${month}`)
                    .pipe( map( data =>{

                      let families = data['data'];
                      const mexico = this.setFamiliesArray(families,'Mexico')
                      const monterrey = this.setFamiliesArray(families,'Monterrey')
                      const veracruz = this.setFamiliesArray(families,'Veracruz')
                      const mexicali = this.setFamiliesArray(families,'Mexicali')
                      const queretaro = this.setFamiliesArray(families,'Queretaro')
                      const cancun = this.setFamiliesArray(families,'Cancun')

                      

                      return[{
                        name:'Mexico',
                        id:'Mexico',
                        data: mexico,
                        type:'pie'
                      },{
                        name:'Monterrey',
                        id:'Monterrey',
                        data: monterrey,
                        type:'pie'

                      },{
                        name:'Veracruz',
                        id:'Veracruz',
                        data: veracruz,
                        type:'pie'
                      },{
                        name:'Mexicali',
                        id:'Mexicali',
                        data: mexicali,
                        type:'pie'
                      },{
                        name:'Queretaro',
                        id:'Queretaro',
                        data: queretaro,
                        type:'pie'
                      },{
                        name:'Cancun',
                        id:'Cancun',
                        data: cancun,
                        type:'pie'
                      }
                    ];
                      
                    }))

/*                     {
                      "name": "Mexico",
                      "id": "Mexico",
                      "data": [
                         
                            <?php  while($row = $resultadoo->fetch_assoc()){
      
                             echo  " [ '".$row['familia']."',".$row['IMPORTE']. "],"; 
      
                            }  ?>  
                         
                        
                      ]
                  } */
  }

  getSellers(sucursal, mes, anio ){
    return this.http.get(`${this.url}/vendedores/${sucursal}/${mes}/${anio}`);
  }

  getBranchOfficeYear(branchOffice, year){
    
    return this.http.get(`${this.url}/branchOfficeSalePerYear/${branchOffice}/${year}`)
                      .pipe(
                        map((data:any)=>{
                            var sells = this.getSellDataBranchOfficeArray(data);
                            if(sells.length == 0){
                              return { name:'', data:[]}
                            }
                            return {
                              name: `${this.getBranchOffice(branchOffice-1)} - ${year}`, data: sells
                            }
                        }));
  }

  getBranchOfficesMonth(mes, anio){
    return this.http.get(`${this.url}/branchSaleMonth/${mes}/${anio}`).pipe( map( (data:any) => {

      const sucursales = data.data
      const sucursalesArray = [];
      
      for ( var sucursal of sucursales){
        let color = this.setColor(sucursal.branchOffice);  
        var sucursalTemp:any = { name:sucursal.branchOffice, y: parseInt(sucursal.sell), drilldown:sucursal.branchOffice, color }
        sucursalesArray.push(sucursalTemp);
      }
      return sucursalesArray; 
      
    }))
  }

  getBranchOfficesYear(year){
    return this.http.get(`${this.url}/branchSaleYear/${year}`)
                    .pipe( map( data =>{
                      
                      const sellMexico = this.getSellDataBranchOfficesArray('Mexico',data);

                      const sellMonterrey = this.getSellDataBranchOfficesArray('Monterrey',data);
                      const sellVeracruz  = this.getSellDataBranchOfficesArray('Veracruz',data);
                      const sellMexicali  = this.getSellDataBranchOfficesArray('Mexicali',data);
                      const sellQueretaro = this.getSellDataBranchOfficesArray('Queretaro',data);
                      const sellCancun = this.getSellDataBranchOfficesArray('Cancun',data);
      
                      const branchOffices:any = [ 
                        { name:'Mexico', data:sellMexico  }, 
                        { name:'Monterrey', data:sellMonterrey },
                        { name:'Veracruz', data:sellVeracruz },
                        { name:'Mexicali', data:sellMexicali },
                        { name:'Queretaro', data:sellQueretaro },
                        { name:'Cancun', data:sellCancun, color:'#ff0066' }
                      ];

                      return branchOffices;
                    }))
  }

  getSellersMexico(mes,anio){
    return this.getSellers(1,mes,anio).pipe( map ( (data:any)=>{
      return this.creaArrayVendedores(data);
    }))
  }

  getSellersMonterrey (mes,anio){
    return this.getSellers(2,mes,anio).pipe(map(data => {
      return this.creaArrayVendedores(data);
    }))
  }

  getSellersVeracruz(mes,anio){
    return this.getSellers(3,mes,anio).pipe(map(data => {
      return this.creaArrayVendedores(data);
    }));
  }

  getSellersMexicali(mes,anio){
    return this.getSellers(4,mes,anio).pipe(map(data => {
      return this.creaArrayVendedores(data);
    }));
  }

  getSellersQueretaro(mes,anio){
    return this.getSellers(5,mes,anio).pipe(map(data => {
      return this.creaArrayVendedores(data);
    }));
  }

  getSellersCancun(mes,anio){
    return this.getSellers(6,mes,anio).pipe(map(data => {
      return this.creaArrayVendedores(data);
    }));
  }

  creaArrayVendedores(data){
    var sellers = data.data;
    var branchOffice = data.branch_office;
    var sellersArray = [];
    for ( var seller of sellers){
      var sellerTemp = { name: seller.name, y:parseInt( seller.net_sale) }
      sellersArray.push(sellerTemp);
    }

    return {
      name: `Ventas ${branchOffice}`, id: branchOffice, data: sellersArray, type:'column'
    }
  }


  private  getSellDataBranchOfficesArray(branchOffice,data){
    const sucursales = data.data;
    const date= data.data.date;
    const sellbranchOfficeArray = [];
    
    for ( var sucursal of sucursales){
      
      var sellbranchOfficeTemp;

      if (sucursal.branchOffice === branchOffice){
        sellbranchOfficeTemp = {
          name: this.monthString[parseInt(sucursal.month)-1],
          y:parseInt(sucursal.sell)
        }
        sellbranchOfficeArray.push(sellbranchOfficeTemp);
      }
      

    }

    return sellbranchOfficeArray;
    
  }


  private   getSellDataBranchOfficeArray(data){
    const sucursales = data.data;
    const sellbranchOfficeArray = [];

    for ( var sucursal of sucursales){
      
      var sellbranchOfficeTemp = {
        name: this.monthString[ sucursal.month-1],
        y:parseInt(sucursal.sell)
      }
      sellbranchOfficeArray.push(sellbranchOfficeTemp);
      
      
    }

   

    return sellbranchOfficeArray;
    
  }

  getBranchOffice( branchOffice){
    var branchOfficeArray = ['Mexico','Monterrey','Veracruz','Mexicali','Veracruz','Queretaro' ];

    return branchOfficeArray[branchOffice];
  }

  setColor(branchOffice){

    if (branchOffice === 'Mexico'){
      return '#2B908F';
    }else if(branchOffice === 'Monterrey'){
      return '#90EE7E';
    }else if(branchOffice === 'Veracruz'){
      return '#F45B5B';
    }else if(branchOffice === 'Mexicali'){
      return '#7798BF';
    }else if(branchOffice === 'Queretaro'){
      return '#aaeeee';
    }else if( branchOffice === 'Cancun'){
      return '#ff0066'
    }

    return undefined;

  }

  setFamiliesArray(data,sucursal){
    var families = data;
    let familiesArray = [];
    for (let family of families){
      if(family.branchoffice === sucursal){
        familiesArray.push({ name:family.family,y:parseInt(family.import)});
      }
    }
    return familiesArray;
  }


}
