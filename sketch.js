var ghoststand,ghostjump
var doorimg,railimg,towerimg,spookysound
var tower,door,rail,ghost,gamestate = "play",invisiblewall
function preload(){
ghoststand = loadImage("ghost-standing.png")  
ghostjump = loadImage("ghost-jumping.png")  
doorimg = loadImage("door.png")  
railimg = loadImage("climber.png")  
towerimg = loadImage ("tower.png")
spookysound = loadSound("spooky.wav")
}
function setup(){
createCanvas(600,600)  
tower =  createSprite(300,300,10,10) 
tower.addImage(towerimg)  
tower.velocityY=1
ghost = createSprite(350,400,10,10)  
ghost.addImage(ghoststand)
ghost.scale = 0.5
ghost.debug = true  
doorgroup = createGroup()
railgroup = createGroup()
ghost.setCollider("rectangle",0,0,200,200)
invisiblegroup =createGroup()


}
function draw(){
if (gamestate ==="play"){
  if(tower.y>500){
tower.y=300    
}  
spawndoors()  
if(keyDown("space")){
ghost.velocityY = -3    
}  
ghost.velocityY = ghost.velocityY + 1 
if(keyDown("right_arrow")){
ghost.x = ghost.x+1  
  } 
if(keyDown("left_arrow")){
ghost.x = ghost.x-1}  
if(ghost.isTouching(railgroup)){
ghost.velocityY = 0}
if(ghost.isTouching(invisiblegroup)||ghost.y>600){
gamestate = "end"  
}

}
  
else if(gamestate === "end") {
tower.visible = false
background("black")  
ghost.destroy()
doorgroup.destroyEach()
railgroup.destroyEach()  
textSize(30)
text("GAMEOVER",200,300)  
} 
spookysound.play()

  
drawSprites()  
}
function spawndoors(){
if(frameCount%300===0){
door = createSprite(Math.round(random(150,450)),-10,10,10)  
door.addImage(doorimg)  
door.velocityY=1
rail = createSprite(door.x,35,10,10)
rail.addImage(railimg)
rail.velocityY = door.velocityY
ghost.depth = door.depth && rail.depth
ghost.depth=ghost.depth + 1
doorgroup.add(door)  
railgroup.add(rail)
invisiblewall = createSprite(door.x,45,rail.width,10)
invisiblewall.velocityY = rail.velocityY
invisiblewall.visible = false
invisiblegroup.add(invisiblewall)
door.lifetime=650
rail.lifetime=650
invisiblewall.lifetime=650
}}
