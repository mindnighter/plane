
canvas = document.querySelector("canvas");
ctx = canvas.getContext("2d");

var dot = [];
var drag = false;
var delta= {
  x:0,
  y:0
};
document.body.appendChild(canvas);
dot.push({x:595,y:460,dragit:false});
dot.push({x:850,y:150,dragit:false});
dot.push({x:900,y:300,dragit:false});
dot.push({x:935,y:295,dragit:false});
dot.push({x:910,y:350,dragit:false});
dot.push({x:847,y:456,dragit:false});
dot.push({x:750,y:550,dragit:false});
dot.push({x:787,y:584,dragit:false});
dot.push({x:825,y:612,dragit:false});
dot.push({x:923,y:557,dragit:false});
dot.push({x:860,y:650,dragit:false});
dot.push({x:900,y:700,dragit:false});
dot.push({x:960,y:760,dragit:false});
dot.push({x:935,y:785,dragit:false});
dot.push({x:900,y:800,dragit:false});
dot.push({x:784,y:711,dragit:false});
dot.push({x:680,y:622,dragit:false});
dot.push({x:625,y:625,dragit:false});
dot.push({x:600,y:650,dragit:false});
dot.push({x:580,y:645,dragit:false});
dot.push({x:556,y:655,dragit:false});
dot.push({x:534,y:685,dragit:false});
dot.push({x:500,y:700,dragit:false});
dot.push({x:450,y:700,dragit:false});
dot.push({x:400,y:700,dragit:false});
dot.push({x:370,y:650,dragit:false});
dot.push({x:300,y:650,dragit:false});
dot.push({x:285,y:600,dragit:false});
dot.push({x:400,y:600,dragit:false});
dot.push({x:375,y:575,dragit:false});
dot.push({x:350,y:550,dragit:false});
dot.push({x:375,y:535,dragit:false});
dot.push({x:405,y:537,dragit:false});
dot.push({x:426,y:542,dragit:false});
dot.push({x:450,y:570,dragit:false});
dot.push({x:480,y:550,dragit:false});
dot.push({x:510,y:520,dragit:false});
dot.push({x:420,y:450,dragit:false});
dot.push({x:300,y:350,dragit:false});
dot.push({x:325,y:325,dragit:false});
dot.push({x:350,y:300,dragit:false});
dot.push({x:425,y:347,dragit:false});
dot.push({x:480,y:380,dragit:false});
dot.push({x:600,y:322,dragit:false});
dot.push({x:520,y:420,dragit:false});

dot.push({x:560,y:450,dragit:false});
dot.push(dot[0]);



function start() {

ctx.setTransform(1, 0, 0, 1, 0, 0);
ctx.clearRect(0, 0, document.querySelector("canvas").width, document.querySelector("canvas").height);
ctx.fillStyle = "#A8EEF4";
  ctx.fillRect(0, 0, 1700, 1700);
  //клетки
ctx.strokeStyle = "black";
  ctx.lineWidth = 1;
  ctx.beginPath();

  for (let y = 50; y < 1700; y += 50) {


      ctx.moveTo(0,y);

      ctx.lineTo(1700,y);
      ctx.font = "13px normal";
      ctx.fillStyle = "red";
      ctx.fillText(y + "px", 10, y);
    }
  ctx.stroke();
  ctx.beginPath();
  for (let x = 50; x < 1700; x += 50) {


      ctx.moveTo(x,0);

       ctx.lineTo(x,1700);
       ctx.font = "13px normal";
       ctx.fillStyle = "red";
       ctx.fillText(x + "px", x, 15);
     }
  ctx.stroke();
  //начало координат
  ctx.font = "25px normal";
  ctx.fillStyle = "red";
  ctx.fillText("О", 5, 20);
  ctx.font = "20px normal";
  ctx.fillText("x", 30, 15);
  ctx.fillText("y", 5, 35);
  ctx.lineWidth = 3;
  ctx.strokeStyle = "red";


  ctx.beginPath();
    ctx.moveTo(0,1);

    ctx.lineTo(1700,1);
  ctx.stroke();
  ctx.beginPath();

    ctx.moveTo(1,0);

    ctx.lineTo(1,1700);
  ctx.stroke();




  for(let i = 0; i < dot.length;i++){
    draw(dot[i].x,dot[i].y,i);
  }

  for(let i = 0; i < dot.length-1;i = i + 2){
    triangle(dot[i].x,dot[i].y,dot[i+1].x,dot[i+1].y,dot[i+2].x,dot[i+2].y);
  }
  for(let i = 0; i < dot.length-1;i = i + 2){
    bezier(dot[i].x,dot[i].y,dot[i+1].x,dot[i+1].y,dot[i+2].x,dot[i+2].y);
  }


  canvas.onmousedown = Down;
  canvas.onmouseup = Up;

}


function bezier(x0,y0,x1,y1,x2,y2){
  var x,y;
  ctx.beginPath();
  ctx.lineWidth = 4;
 ctx.strokeStyle = "black";
  for(t =0;t <= 1; t = t +0.01){
    x= (1 - t)*(1 - t)*x0 + 2*t*(1-t)*x1 + t*t*x2;
    y= (1 - t)*(1 - t)*y0 + 2*t*(1-t)*y1 + t*t*y2;
    ctx.lineTo(x,y);
  }
  ctx.stroke();

}

function draw(x,y,i){
  if(i%2){
    ctx.fillStyle = "red";
  } else {ctx.fillStyle = "blue";}
  ctx.beginPath();
  ctx.arc(x,y,10,0,2*Math.PI);
  ctx.fill();
}

function Move(e) {
  if(drag) {

    var mx=parseInt(e.clientX);
    var my=parseInt(e.clientY);

    for(let i=0;i<dot.length;i++){
      if(dot[i].dragit==true){
          delta.x = dot[i].x;
          delta.y = dot[i].y;

          dot[i].x = mx;
          dot[i].y = my;

          delta.x -= dot[i].x;
          delta.y -= dot[i].y;
        }

      }
        start();
  }

}

function Down(e){

   for(let i=0;i<dot.length;i++){
      if(e.clientX <= dot[i].x+15 && e.clientY <= dot[i].y+15 && e.clientX >= dot[i].x-15 && e.clientY >= dot[i].y-15){
        drag = true;
        dot[i].dragit=true;
        console.clear();
        console.log(dot[i].x,dot[i].y, " i = " + i);
        canvas.onmousemove = Move;
      }
  }
}

function Up() {
  drag = false;
  for(var i=0;i<dot.length;i++){
    dot[i].dragit=false;
  }
}

function triangle(x0,y0,x1,y1,x2,y2) {
  ctx.lineWidth = 6;
  ctx.strokeStyle = 'rgba(200, 0, 0, 0.35)';
  ctx.beginPath();
  ctx.moveTo(x0,y0);
  ctx.lineTo(x1,y1);
  ctx.lineTo(x2,y2);
  ctx.stroke();
}
start();
