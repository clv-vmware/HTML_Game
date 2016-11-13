// class particle 
function Particle(point, velocity, acceleration) {
    this.position = point || new Vector(0, 0);
    this.velocity = velocity || new Vector(0, 0);
    this.acceleration = acceleration || new Vector(0, 0);
}

Particle.prototype.move = function () {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
}

 function addNewParticles () {
        if (particles.length > maxParticles) return;

        for (var i = 0;i < emitters.length;i++) {
            for (var j = 0;j < emissionRate;j++) {
                particles.push(emitters[i].emitParticle());
            }
        }

    }

    function plotParticles (boundsX, boundsY) {
        var currentParticles = [];

        for (var i = 0;i < particles.length; i++) {
            var particle = particles[i];
            var pos = particle.position;

            if (pos.x < 0 || pos.x > boundsX || pos.y < 0 || pos.y > boundsY) continue;
            particle.move();

            currentParticles.push(particle);
        }
        particles = currentParticles;

    }

    var particleSize = 1;

    function drawParticles () {
        ctx.fillStyle = 'rgb(0, 0, 255)';

        for (var i = 0; i < particles.length; i++) {
            var position = particles[i].position;

            // Draw a square at our position [particleSize] wide and tall
            ctx.fillRect(position.x, position.y, particleSize, particleSize);
        }
    }