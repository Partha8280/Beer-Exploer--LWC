import { LightningElement,api,track,wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import getbeersize from '@salesforce/apex/Onlinebeerexploerhelper.getsizeofcart';

export default class Headercart  extends NavigationMixin(LightningElement) {
 
    @track ordercount;
   
       @wire(getbeersize) contact({data,error}){
           
   
           if(data){
               
               this.ordercount= JSON.stringify(data[0].expr0);
           //console.log('values-->'+this.ordercount.length);
           }
           else if(error){
             console.log('error'+error);
           }
       }
       opencartinfo(event){
   
           if(this.ordercount>=1){
             event.preventDefault();
           let componentDef = {
               componentDef: "c:carddetail",
               attributes: {
                   label: 'Navigated From Another LWC component',
                    ParentId : this.recordId
               },
               
           };
           // Encode the componentDefinition JS object to Base64 format to make it url addressable
           let encodedComponentDef = btoa(JSON.stringify(componentDef));
           this[NavigationMixin.Navigate]({
               type: 'standard__webPage',
               attributes: {
                   url: '/one/one.app#' + encodedComponentDef
               }
           });
                }
   
               else if(this.ordercount<=0){
             event.preventDefault();
           let componentDef = {
               componentDef: "c:cartinfo",
               attributes: {
                   label: 'Navigated From Another LWC component',
                    ParentId : this.recordId
               },
               
           };
           // Encode the componentDefinition JS object to Base64 format to make it url addressable
           let encodedComponentDef = btoa(JSON.stringify(componentDef));
           this[NavigationMixin.Navigate]({
               type: 'standard__webPage',
               attributes: {
                   url: '/one/one.app#' + encodedComponentDef
               }
           });
                }
       }
   
       
   
     
   
   
   
   }