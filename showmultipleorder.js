import { LightningElement,wire,track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import displayorder from '@salesforce/apex/Onlinebeerexploerhelper.getbeerorder';

export default class Showmultipleorder extends NavigationMixin(LightningElement) {
    @track date='';
    @track result;
       @wire(displayorder) getbeerorder({data,error}){
            if(data){
               this.result=data;
               console.log(this.result);
                this.date=new Date().toLocaleDateString();
           }
           else if(error){
             console.log('error'+error);
           }
       }
       close(event){
           //Navigated to beerExploer
               event.preventDefault();
                   let componentDef = {
                       componentDef: "c:beerexploer",
                       attributes: {
                           label: 'Navigated From Another LWC component',
                       },
                       
                   };
                   let encodedComponentDef = btoa(JSON.stringify(componentDef));
                   this[NavigationMixin.Navigate]({
                       type: 'standard__webPage',
                       attributes: {
                           url: '/one/one.app#' + encodedComponentDef
                       }
                   });
   
       }
    
   }