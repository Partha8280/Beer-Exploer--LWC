import { LightningElement,track,api,wire} from 'lwc';

import { refreshApex } from '@salesforce/apex';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getbeer from '@salesforce/apex/Onlinebeerexploerhelper.getbeerbyprice';
import importid from '@salesforce/apex/Onlinebeerexploerhelper.createbeerrecord';

export default class OnlineBeerExploer extends LightningElement {
    @track cresult;
    @track beerid;
    
    handelclick(event){
         this.cresult=event.detail;
         
    }
  
     

    get options() {
        return [
            { label: 'Nope', value: '0' },
            { label: 'Under ₹500', value: '500' },
            { label: 'Under ₹650', value: '650' },
            { label: 'Under ₹750', value: '750' },
            { label: 'Under ₹850', value: '850' },
            { label: 'Under ₹1000', value: '1000' },
        ];
    }


@track cresult;
    @track error;
    @track value= 500;
   handleChange(event){
        this.value=event.target.value;

        getbeer({pricerange :this.value})
        .then(result =>{
            this.cresult=result;
            //console.log(JSON.parse(JSON.stringify(result)));
        })
        .catch(error =>{
            this.error=error;
        });
   }










     @track isModalOpen = false;
    openModal(event) {
        this.beerid=event.target.value;
        this.isModalOpen = true;
    }
    closeModal() {
        this.isModalOpen = false;
    }
    submitDetails() {
        this.isModalOpen = false;
    }

    
    @track beerrarray= [];
    @track beerdata;
    @track beername;
    @track beerimage;
    @track beerPrice;
    @track beerAlcohol;
    @track beerbrewery_Name;

    addtocart(event){
        //selected id
        this.beerdata=event.target.value;
        this.beerrarray.push(this.beerdata);
         console.log(JSON.parse(JSON.stringify(this.beerrarray)));
        this.beername=this.beerdata.Name;
        this.beerimage=this.beerdata.Image__c;
        this.beerPrice=this.beerdata.Price__c;
        this.beerAlcohol=this.beerdata.Alcohol__c;
        this.beerbrewery_Name=this.beerdata.brewery_Name__c;
        

        importid ({name:this.beername,beerimage:this.beerimage,beerPrice:this.beerPrice,
        beerAlcohol:this.beerAlcohol,beerbrewery_Name:this.beerbrewery_Name})
         .then(result =>{
          
         })
         .catch(error=>{

         })
         const evt = new ShowToastEvent({
            title: 'You item is add to cart successfully',
            message: '',
            variant: 'success',
        });
        this.dispatchEvent(evt);

         
            
    }
}