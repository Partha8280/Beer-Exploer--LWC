import { LightningElement ,wire,api,track} from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { CurrentPageReference } from 'lightning/navigation';

import ordername from '@salesforce/schema/BeerOrder__c.Name';
import cname from '@salesforce/schema/BeerOrder__c.Customer_Name__c';
import cemail from '@salesforce/schema/BeerOrder__c.email__c';
import cphone from '@salesforce/schema/BeerOrder__c.Phone__c';


import Ordered_Quantity__c from '@salesforce/schema/BeerOrder__c.Ordered_Quantity__c';
import Billing_City__c from '@salesforce/schema/BeerOrder__c.Billing_City__c';
import Billing_Country__c from '@salesforce/schema/BeerOrder__c.Billing_Country__c';
import Billing_Postal_Code__c from '@salesforce/schema/BeerOrder__c.Billing_Postal_Code__c';
import Billing_State__c from '@salesforce/schema/BeerOrder__c.Billing_State__c';
import Billing_Street__c from '@salesforce/schema/BeerOrder__c.Billing_Street__c';

import Shipping_City__c from '@salesforce/schema/BeerOrder__c.Shipping_City__c';
import Shipping_Country__c from '@salesforce/schema/BeerOrder__c.Shipping_Country__c';
import Shipping_Postal_Code__c from '@salesforce/schema/BeerOrder__c.Shipping_Postal_Code__c';
import Shipping_State__c from '@salesforce/schema/BeerOrder__c.Shipping__c';
import Shipping_Street__c from '@salesforce/schema/BeerOrder__c.Shipping_Street__c';

export default class Beerorder extends LightningElement {
        
 @api objectApiName="BeerOrder__c";
 
 fields = [ordername,cname,cemail,cphone,Ordered_Quantity__c,Shipping_City__c,Shipping_Country__c,Shipping_Postal_Code__c,Shipping_State__c,Shipping_Street__c,Billing_City__c,Billing_Country__c,Billing_Postal_Code__c,Billing_State__c,Billing_Street__c];
 
  handleSuccess(event) {
         const evt = new ShowToastEvent({
             title: 'Beer Order created',
             message: 'Record ID: ' + event.detail.id,
             variant: 'success',
         });
         this.dispatchEvent(evt);
     }
 
 @wire (CurrentPageReference) tpr;
    connectedCallback() {
     //     //code
       var pid=this.tpr.attributes.attributes.ParentId;  
       console.log(pid); 
      }
 handleSubmit(){
 
 }
}