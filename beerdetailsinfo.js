
import { LightningElement,track,api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class Beerdetailsinfo extends NavigationMixin(LightningElement) {
    @api recordId;

    handelorder(event) {
         event.preventDefault();
         let componentDef = {
             componentDef: "c:createbeerorder",
             attributes: {
                 label: 'Navigated From Another LWC component',
                  ParentId : this.recordId,
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