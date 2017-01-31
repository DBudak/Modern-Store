import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  products : Array<Product>;
  questions : Array<Question>;
  question_pages : Array<Array<Question>>;
  current_page : number;
  page_class : string;
  preload_images : Array<string>;
  user_choices;
  product_choice : Product;
  isFinished : boolean;

  sliderBtnText : string;
  sliderClass : string;
  sliderOpened : boolean;

  sliderControl(): boolean{
    if(this.sliderClass.includes("closed")){
      this.sliderBtnText = 'Hide Description';
      this.sliderClass = 'slider-msg';
      this.sliderOpened = true;
    }else{
      this.sliderBtnText = 'Show Description';
      this.sliderClass = 'slider-msg closed';
      this.sliderOpened = false;
    }
    return false;
  }

  nextPage( form ): boolean{
    this.current_page++;
    for(let prop in form.value)
      this.user_choices.push(form.value[prop]);
    console.log(this.user_choices);
    if(this.current_page < this.question_pages.length){
      this.page_class = `col-xl-9 col-lg-12 products-block page-${this.current_page}`;
      this.questions = this.question_pages[this.current_page];     
    }else{
      //count score for each product
      this.products.forEach(
        (product) =>{
          console.log(`working on ${product.title}`);
          product.props.forEach(
            (prop) =>{
              if( this.user_choices.indexOf(prop) !== -1 ){
                console.log(!!this.user_choices.indexOf(prop));
                product.score++;
              }                
            }
          );
        }
      );
      //select a winner
      this.products.forEach(
        (product) => {
          if(this.product_choice.score<product.score)
            this.product_choice = product;
        }
      );
      this.page_class = `col-xl-9 col-lg-12 products-block ${this.product_choice.winClass}`;
      this.isFinished = true;
    }
    return false;
  }

  constructor() { 
    this.user_choices = [];

    this.products =[
      new Product(
        'Johnsons',
        'prod-a',
        [
          'Straight',
          'Waivy',
          'Long',
          'Black',
          'Brown',
          'Normal',
          'Colored',
          'Thready',
          'Wiry',
          'Cottony'
        ]
      ),
      new Product(
        'Clear',
        'prod-b',
        [
          'Curly',
          'Kinky',
          'Short',
          'Shoulder length',
          'Blonde',
          'Red',
          'Dry',
          'Oily',
          'Spongy',
          'Silky'
        ]
      )
    ];
    this.question_pages = [
      [
        new Question(
          'What is your hair type?',
          'type',
          [
            'Straight',
            'Curly',
            'Waivy',
            'Kinky'
          ]
        ),
        new Question(
          'How long is your hair?',
          'length',
          [
            'Long',
            'Short',
            'Shoulder length'
          ]
        )
      ],
      [
        new Question(
          'What color is your hair?',
          'color',
          [
            'Black',
            'Brown',
            'Blonde',
            'Red'
          ]
        ),
        new Question(
          'What is your hair\'s condition?',
          'condition',
          [
            'Normal',
            'Dry',
            'Colored',
            'Oily'
          ]
        ),
        new Question(
          'What is your hair texture?',
          'texture',
          [
            'Thready',
            'Wiry',
            'Cottony',
            'Spongy',
            'Silky'
          ]
        )
      ]
    ];
    this.current_page = 0;
    this.questions = this.question_pages[this.current_page];
    this.page_class = `col-xl-9 col-lg-12 products-block page-${this.current_page}`;
    this.preload_images =[
      "../assets/mosaic-md.png",
      "../assets/mosaic-less-md.png",
      "../assets/prod-a.png",
      "../assets/prod-b.png"
    ];
    this.product_choice = this.products[0];
    this.isFinished = false;
    this.sliderBtnText = 'Hide Description';
    this.sliderClass = 'slider-msg';
    this.sliderOpened = true;
  }

  ngOnInit() {
  }

}

class Question{
  constructor(
    public text : string,
    public name: string,
    public props : Array<string>
  ){}
}
 class Product{
   constructor(
     public title : string,
     public winClass : string,
     public props : Array<string>,
     public score ?: number
   ){
     this.score = 0;
   }
 }