import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../service/api.service';

@Component({
    selector: 'app-fruits-list',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit{

    public fruitsList: any = [];
    public selCartDetaiilsList: any = [];
    public selFruit:any = null;
    public selCartDetaiils:any = {};
    public fruitsColor: any = {
        'Apple': 'red',
        'Orange': 'orange',
        'Grapes': 'pink',
        'Banana': 'yellow',
        'Avacado': 'green',
        'Peaches': 'coral',
        'Mango': 'green'
    };

    constructor(public apiService: ApiService){
       this.getAllFruits();
    }

    ngOnInit(): void {
        
    }

    getAllFruits(){
        this.fruitsList = [];
        this.selFruit = null;
        this.apiService.getAllFruits().subscribe((data:any) => {
            if(data){
                Object.keys(data).forEach(key => {
                    this.fruitsList.push({
                        key: key,
                        data: data[key],
                        color: this.fruitsColor[key]
                    })
                });
            }
        },err=>{
            
        })   
    }

    getFruit(name:string){
     this.selFruit = null;
     this.apiService.getFruit(name).subscribe(data=>{
       this.selFruit = data;
       this.selFruit['name']= name;
       this.selFruit['color']= this.fruitsColor[name];
     },err=>{

     });
    }

    addToCart(){
        this.selCartDetaiilsList = [];
       this.selCartDetaiils[this.selFruit['name']] = this.selFruit;
       Object.keys(this.selCartDetaiils).forEach(key => {
        this.selCartDetaiilsList.push({
            key: key,
            data: this.selCartDetaiils[key]
        })
    });
    }

    saveCart(){
        // this.selCartDetaiilsList = [];
        let reqData:any = {};
        this.selCartDetaiilsList.forEach((obj:any)=>{
            reqData[obj.key] = obj.data.price;
        });
        this.apiService.addFruitsToCart(reqData).subscribe((data:any)=>{
            // this.selFruit = data;
            this.getAllFruits();
            alert('Saved Successfully')
        },err=>{
            console.log('err',err);
            alert('Out of Stock Error')
        });
    }

    
}