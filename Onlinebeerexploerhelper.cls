public with sharing class Onlinebeerexploerhelper {
   //Get all the beer details
   @AuraEnabled(cacheable=true)
   public static list<beer__c> getbeer(string searchbeername){
       return [select id,Name,Image__c,Price__c,Alcohol__c,Tags__c,brewery_Name__c,Id__c,	Total_Quantity__c from beer__c where name like:searchbeername+'%' limit 20];
   }
//getbeerbyusingfilter
    @AuraEnabled(cacheable=true)
   public static list<beer__c> getbeerbyprice(integer pricerange){
       system.debug(pricerange);
       return [select id,Name,Image__c,Price__c,Alcohol__c,Tags__c,brewery_Name__c,Id__c,Total_Quantity__c from beer__c where  Price__c <=: pricerange ];
   }

  
//create beer record in beercart object
   @AuraEnabled
   public static list<beercart__c> createbeerrecord(string name,string beerimage,decimal beerPrice,decimal beerAlcohol,string beerbrewery_Name){
      
       list<beercart__c>beerlist=new list<beercart__c>();
       
       beercart__c beer =new beercart__c ();
       beer.Name=name;
       beer.Image__c=beerimage;
       beer.Price__c=beerPrice;
       beer.Alcohol__c=beerAlcohol;
        beer.brewery_Name__c=beerbrewery_Name;
      
           beerlist.add(beer);
       
       if(!beerlist.isempty()){
           insert beerlist;
           return beerlist;
       }
       return null;
   }

   //fetch all the cart record 
    @AuraEnabled(cacheable=true)
   public static list<beercart__c> getbeercart(){
       return [select id,Name,Image__c,Price__c,Alcohol__c,Tags__c,brewery_Name__c from beercart__c];
   }

   //fetch all cart size record 
    @AuraEnabled(cacheable=true)
   public static List<AggregateResult>  getsizeofcart(){
       return [Select COUNT(Id) from beercart__c];
                
   }

  
   //calculate total price
    @AuraEnabled(cacheable=true)
   public static List<AggregateResult>  getsumofammuont(){
       return [select sum(price__c) from beercart__c];
                
   }
  
   //create multiple beer order
    @AuraEnabled
    public static list<BeerOrder__c> createmultiplebeerorder(string bstreet,string bcity,string bcountry, string bpostal,string bstate,
     string sstreet,string scity,string scountry,string spostal,string sstate,Decimal totalamount,Integer nooforder,
     string cname,string cphone,string cemail
    ){
       list<BeerOrder__c>listbeerorder=new list<BeerOrder__c>();
          BeerOrder__c beerorder=new BeerOrder__c();
          beerorder.Billing_City__c= bcity;
          beerorder.Billing_Country__c= bcountry;
          beerorder.Billing_Postal_Code__c=bpostal;
          beerorder.Billing_State__c=bstate;
          beerorder.Billing_Street__c=bstreet;
          beerorder.Shipping_City__c=scity;
          beerorder.Shipping_Country__c=scountry;
          beerorder.Shipping_Postal_Code__c=spostal;
          beerorder.Shipping__c=sstate;
          beerorder.Shipping_Street__c=sstreet;
          beerorder.Ordered_Quantity__c=nooforder;
          beerorder.Order_Amount__c=totalamount;
          beerorder.Customer_Name__c=cname;
          beerorder.Phone__c=cphone;
          beerorder.email__c=cemail;
             listbeerorder.add(beerorder);
       
       if(!listbeerorder.isempty()){
           insert listbeerorder;
           return listbeerorder;
       }

           return null;
    }

   //delete all cart record
   @AuraEnabled
   public static void deleteSelectedbeer() {
       delete [select id from beercart__c];
      
   }

   //fetch all the Order details record 
    @AuraEnabled(cacheable=true)
   public static list<BeerOrder__c> getbeerorder(){
       return [select id,Name,email__c,Billing_City__c,Billing_Country__c,Billing_Postal_Code__c,Billing_State__c,
       Billing_Street__c,Order_Amount__c,Ordered_Quantity__c,
       Shipping_City__c,Shipping_Country__c,Shipping_Postal_Code__c,Shipping__c,Shipping_Street__c,Customer_Name__c
        from BeerOrder__c order by createdDate DESC limit 1];
   }
}
