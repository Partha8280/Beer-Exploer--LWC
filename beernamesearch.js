import { LightningElement ,track} from 'lwc';
import getbeer from '@salesforce/apex/Onlinebeerexploerhelper.getbeer';

export default class Beernamesearch extends LightningElement {
    @track results;
    @track error;
    @track beersearch='';
    handelsearch(event){
        this.beersearch=event.target.value;

        getbeer({searchbeername :this.beersearch})
        .then(result =>{
            this.results=result;
            console.log(JSON.parse(JSON.stringify(result)));
        })
        .catch(error =>{
            this.error=error;
        });
         const pevent=new CustomEvent("passdata",{detail:this.results});
        this.dispatchEvent(pevent);
    }
    
}