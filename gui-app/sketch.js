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
  
  
  //Grade Inputs
  text("Input Grades",10,150);
  gI1=createInput();
  gI1.position(120,150);
  gI1.size(75,15)
  gI2=createInput();
  gI2.position(220,150);
  gI2.size(75,15)
  gI3=createInput();
  gI3.position(320,150);
  gI3.size(75,15)
  gI4=createInput();
  gI4.position(420,150);
  gI4.size(75,15)
  gI5=createInput();
  gI5.position(520,150);
  gI5.size(75,15)
  
  
  gradeSubmit=createButton("Add Grades");
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
  gI1.value("");
  gI2.value("");
  gI3.value("");
  gI4.value("");
  gI5.value("");
}

function submit(){
  //Submits grades

  //check if grades are numbers in the ugliest way possible
var invalid=isNaN(parseInt(gI1.value()))||isNaN(parseInt(gI2.value()))||isNaN(parseInt(gI3.value()))||isNaN(parseInt(gI4.value()))||isNaN(parseInt(gI5.value()));
  
  if(!invalid){
    c1.addScore(parseInt(gI1.value()));c1.updateStats();
    c2.addScore(parseInt(gI2.value()));c2.updateStats();
    c3.addScore(parseInt(gI3.value()));c3.updateStats();
    c4.addScore(parseInt(gI4.value()));c4.updateStats();
    c5.addScore(parseInt(gI5.value()));c5.updateStats();
  }
  
}


//Main Loop
function draw() {
  background(220);
  text("Input Grades",10,165);

  
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