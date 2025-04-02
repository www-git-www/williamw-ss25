class Class{
  constructor(name){
    this.name=name;
    this.scores=[];
    this.numScores=this.scores.length;
    this.highScore=0;
    this.lowScore=0;
    this.avgScore=0;
  }
  
  addScore(score){
    if(score>0){
      if(score%10>=5){
        this.scores.push(round(score))
      }else{
      this.scores.push(score);
      }
    }else{
      console.log("Error: Negative Score");
    }
  }
  
  reset(){
    this.scores=[];
    this.updateStats();
  }
  
  updateStats(){
    var sum=0;
    for(var i=0;i<this.scores.length;i++){
      sum+=this.scores[i];
    }
    this.avgScore=sum/this.scores.length;
    this.lowScore=min(this.scores);
    this.highScore=max(this.scores);
    this.numScores=this.scores.length;
  }
  
  display(x,y){
    text(this.name,x+0,y+0);
    text(this.numScores,x+0,y+15);
    text(this.avgScore.toPrecision(3),x+0,y+30);
    text(this.highScore.toPrecision(3),x+0,y+45);
    text(this.lowScore.toPrecision(3),x+0,y+60);
  }
  
  toString(){
    return this.name;
  }
  
}


let selection;let selectedClass;
function setup() {
  //Create p5 canvas
  createCanvas(windowHeight, windowWidth);
  
  //Instantiate classes
  c1=new Class("Programming");
  c2=new Class("Art");
  c3=new Class("Science");
  c4=new Class("Math");
  c5=new Class("History");
  
  //Class Selector
  classSelector=createSelect();
  classSelector.option(c1);
  classSelector.option(c2);
  classSelector.option(c3);
  classSelector.option(c4);
  classSelector.option(c5);
  classSelector.selected(c1);
  classSelector.position(0,0);
  
  //Grade Input
  text("Input Grades",10,30);
  gradeInput=createInput();
  gradeInput.position(10,100);
  
  gradeSubmit=createButton("Add Grade");
  gradeSubmit.mousePressed(submit);
  gradeSubmit.position(200,100);
  
  //Clear Grade Input
  clearButton=createButton("Clear Input");
  clearButton.mousePressed(clearInput);
  clearButton.position(300,100);
  
  //Reset System
  resetButton=createButton("Reset");
  resetButton.mousePressed(resetSystem);
  resetButton.position(400,100);
}

function resetSystem(){
  //Resets all classes
  c1.reset();
  c2.reset();
  c3.reset();
  c4.reset();
  c5.reset();
}

function clearInput(){
  //Clears value in grade input
  gradeInput.value("");
}

function submit(){
  //Submits grades
  if(!isNaN(parseInt(gradeInput.value()))){
    selectedClass.addScore(parseInt(gradeInput.value()));
  }
  selectedClass.updateStats();
}


//Main Loop
function draw() {
  background(220);
  text("Input Grades",10,80);
  
  selection=classSelector.selected();
  if(selection==("Programming")){
    selectedClass=c1;
  }else if(selection==("Art")){
    selectedClass=c2;
  }else if(selection==("Science")){
    selectedClass=c3;
  }else if(selection==("Math")){
    selectedClass=c4;
  }else if(selection==("History")){
    selectedClass=c5;
  }
  
  //Display handlers
  c1.display(120,200);
  c2.display(220,200);
  c3.display(320,200);
  c4.display(420,200);
  c5.display(520,200);
  
  line(110,190,110,260);
  
  text("Class",10,200);
  text("Scores Entered",10,215);
  text("Average Score:",10,230);
  text("Low Score",10,245);
  text("High Score",10,260);
  
}