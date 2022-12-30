import { LightningElement,api,track,wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';
import getbeersize from '@salesforce/apex/Onlinebeerexploerhelper.getsizeofcart';
import getsumofammuont from '@salesforce/apex/Onlinebeerexploerhelper.getsumofammuont';
import getbeer from '@salesforce/apex/Onlinebeerexploerhelper.getbeercart';
import createmultiplebeer from '@salesforce/apex/Onlinebeerexploerhelper.createmultiplebeerorder';
import deletecartelement from '@salesforce/apex/Onlinebeerexploerhelper.deleteSelectedbeer';

export default class Multiplebeerorder extends NavigationMixin(LightningElement) {


    //count of beer
        @track ordercount;
        @wire(getbeersize) beersize({data,error}){
            if(data){
                this.ordercount= JSON.stringify(data[0].expr0);
            }
            else if(error){
              console.log('error'+error);
            }
        }
    
    //total selected beer sum
        @track sumammount;
        @wire(getsumofammuont) getamount({data,error}){
             if(data){
                
                this.sumammount= JSON.stringify(data[0].expr0);
    
            }
            else if(error){
              console.log('error'+error);
            }
        }
        //address fill
            @track bstreet;
            @track bcity;
            @track bstate;
            @track bcountry;
            @track bpostal;
            @track sstreet;
            @track scity;
            @track sstate;
            @track scountry;
            @track spostal;
            @track cname;
            @track cphone;
            @track cemail;
    customername(event){
        this.cname=event.target.value;
    }
    customerphone(event){
        this.cphone=event.target.value;
    }
    handelemail(event){
        this.cemail=event.target.value;
    }
    
    
        billingstreet(event){
            this.bstreet=event.target.value;
        }
        billingcity(event){
            this.bcity=event.target.value;
        }
        billingstate(event){
            this.bstate=event.target.value;
        }
        billingcountry(event){
            this.bcountry=event.target.value;
        }
        billingpostalcode(event){
            this.bpostal=event.target.value;
        }
            Shippingstreet(event){
            this.sstreet=event.target.value;
            }
        Shippingcity(event){
            this.scity=event.target.value;
            }
        Shippingstate(event){
            this.sstate=event.target.value;
             }
        Shippingcountry(event){
            this.scountry=event.target.value;
            }
        Shippingpostalcode(event){
            this.spostal=event.target.value;
           
            }
    
    
        createorder(event){
           //create beer
          createmultiplebeer({bstreet:this.bstreet,bcity:this.bcity,bcountry:this.bcountry,bpostal:this.bpostal,bstate:this.bstate,
          sstreet:this.sstreet,scity:this.scity,scountry:this.scountry,spostal:this.spostal,sstate:this.sstate,
          totalamount:this.sumammount,nooforder:this.ordercount,cname:this.cname,cphone:this.cphone,cemail:this.cemail
          })
            .then(result =>{
                
                })
             .catch(error=>{
    
             })
    
          //delete all cart element
            deletecartelement({})
            .then(result =>{
                
                })
             .catch(error=>{
    
             })
    
            //Toast Message
            const evt = new ShowToastEvent({
                title: 'You Beer is Order Sucesfully',
                message: 'Record ID: ',
                variant: 'success',
            });
            this.dispatchEvent(evt);
    
                //Navigated to beerExploer
                event.preventDefault();
                    let componentDef = {
                        componentDef: "c:showmultiplebeerorder",
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
         handleClick1(event){
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
    
    
    
            const evt = new ShowToastEvent({
                title: 'You Beer is Order Cancel',
                message: '',
                variant: 'error',
            });
            this.dispatchEvent(evt);
        }
    
        
    
    }