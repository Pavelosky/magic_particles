function Particle(x, y, xSpeed, ySpeed, size, colour)
{
    this.x = x;
    this.y = y;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    this.size = size;
    this.colour = colour;
    this.age = 0;
    
    this.drawParticle = function()
    {
        fill(this.colour);
        ellipse(this.x, this.y, this.size);
    }
    
    this.updateParticle = function()
    {
        this.x += xSpeed;
        this.y += ySpeed;
        this.age++;
    }
}

function Emitter(x, y, xSpeed, ySpeed, size, colour)
{
    this.x = x;
    this.y = y;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    this.size = size;
    this.colour = colour;
    
    this.startParticles = 0;
    this.lifetime = 0;
    
    this.particles = [];
    this.addPart = function()
    {
        var p = new Particle(random(this.x -10, this.x + 10), 
                                 random(this.y -10, this.y +10), 
                                 random(this.xSpeed -1, this.xSpeed +1), 
                                 random(this.ySpeed -1, this.ySpeed +1), 
                                 random(this.size-1, this.size+4), this.colour)
            
           return p;
    }
    
    this.startEmitter = function(startParticles, lifetime)
    {
        this.startParticles = startParticles;
        this.lifetime = lifetime;
        
        //start emitter with initial particles
        
        for(var i = 0; i < startParticles; i++)
        {
            
            this.particles.push(this.addPart());
        }
    }
    
    this.updateParticles = function()
    {
        //itaareate through particles and draw to screen
        var deadPart = 0;
        for(var i = this.particles.length -1; i >= 0; i--)
            {
                this.particles[i].drawParticle();
                this.particles[i].updateParticle();
                if(this.particles[i].age > random(10, this.lifetime))
                {
                    this.particles.splice(i, 1)
                    deadPart++;
                }
            }
        
        if(deadPart > 0)
        {
            for(var i = 0; i < deadPart; i++)
            {
                this.particles.push(this.addPart());
            }
        }
    }
}

var emit;

function setup()
{
	createCanvas(800, 600);
    emit = new Emitter(width/2, height/2, random(1,-1), random(1,-1), 15, color(200, 0, 200, 200));
    emit.startEmitter(600, 50123)
}

function draw()
{
    background(10);
    emit.updateParticles()
}