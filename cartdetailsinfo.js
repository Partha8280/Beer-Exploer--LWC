import { LightningElement,api,track,wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { refreshApex } from '@salesforce/apex';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { deleteRecord } from 'lightning/uiRecordApi';
import getbeer from '@salesforce/apex/Beersearchhelper.getbeercart';
import getbeersize from '@salesforce/apex/Beersearchhelper.getsizeofcart';
import getsumofammuont from '@salesforce/apex/Beersearchhelper.getsumofammuont';

export default class Cartdetailsinfo extends NavigationMixin(LightningElement) {
    
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
        console.log('values-->'+this.sumammount);
        }
        else if(error){
          console.log('error'+error);
        }
    }

  //beer list
  @wire(getbeer) getbeerlist;
     

//delete selected beer record
     @track recordid;
    dodelete(event){
     this.recordid=event.target.value;
     deleteRecord(this.recordid)
     
     .then(() => {
             this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Successfuly you item Removed',
                        variant: 'success'
                    })
                )
                refreshApex(this.getbeerlist);
                refreshApex(this.ordercount);
                refreshApex(this.sumammount);
              

     })
    .catch(() => {});  
    }

handelcontinue(event){
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
handelprocess(event){
     event.preventDefault();
        let componentDef = {
            componentDef: "c:Createmultipleorder",
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