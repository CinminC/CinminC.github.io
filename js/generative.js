var img
var noiseImg
let wH;
function preload() {
	img = loadImage("images/Cinmin_Profile_cut2.png")
}
function setup() {
	wH = windowHeight;
	if (windowWidth < 1200) {
		wH = windowHeight / 2;
	}
	let canvas = createCanvas(windowWidth, wH);
	canvas.parent('sketch-container');
	canvas.style('display', 'block');
	imageMode(CENTER);
	background(255);
	// frameRate(10)
	frameRate(60)
	//image(img,0,0)

	if (windowWidth >= 1200) {
		fill(47, 49, 47, 100);
		textSize(36);
		textFont('Average');
		textAlign(CENTER);
		text('Move your mouse to start drawing on canvas', windowWidth / 2, windowHeight / 2 - 80);
		textSize(22);
		text('Instead of creating a static main page, I decide to invite you to draw it with me !', windowWidth / 2, windowHeight / 2);
		text('As for what will the dynamic work end up to be, maybe you will find out when browsing my profile :)', windowWidth / 2, windowHeight / 2 + 50);
	}

}

var span = 100;
var drawLength = 150;
var noiseScale = 0.0012;
var strokeLength = 100;
var frame = 0;
var st = false;


function draw() {
	// print(width/img.width)
	noFill();
	var scaleRatio = width / img.width * 0.8;

	push();

	if (windowWidth < 1200) {
		if (frame > drawLength) {
			frame = 0;
			background(255);
		}
		translate(
			width / 2,
			height / 2
		);
		scale(scaleRatio);
		//image(img,0,0)

		// The smaller the stroke is the more the spawn count increases to capture more detail.
		var count = map(frame, 0, drawLength, 2, 80);

		for (var i = 0; i < count; i++) {
			// Pick a random point on the image.
			var x = int(random(img.width));
			var y = int(random(img.height));


			var index = (y * img.width + x) * 4;

			for (var l = -80; l < 80; l += 40) {
				for (var j = -80; j < 80; j += 40) {
					var c = img.get(x + l, y + j);
					stroke(c, count / 20);

					// Start with thick strokes and decrease over time.
					var sw = map(frame, 0, drawLength, 45, 20);
					strokeWeight(sw);

					var lengthVariation = random(1, 1.45);
					push();
					translate(x - img.width / 2 + l, y - img.height / 2 + j);
					//scale(scaleRatio);
					// noStroke()
					var n = noise(x * noiseScale, y * noiseScale);
					rotate(radians(map(n, 0, 1, -180, 180)));
					var lengthVariation = random(1, 1.45);
					arc(0, 0, strokeLength * lengthVariation, strokeLength * lengthVariation, PI, PI + QUARTER_PI);

					//ellipse(0,0,random(30,200))
					pop();
				}
			}
		}

		frame++;
	}
	pop();

	if (windowWidth >= 1200) {
		for (var l = -60; l < 60; l += 30) {
			for (var j = -60; j < 60; j += 30) {
				push();
				var cMouse = img.get(map(mouseX + l, 0, width, 0, img.width), map(mouseY + j, 0, height, 0, img.height));
				translate(mouseX + l, mouseY + j);
				//scale(scaleRatio);
				// noStroke()
				stroke(cMouse, 5);
				strokeWeight(random(5, 20));
				var n2 = noise((mouseX + l) * 5 * noiseScale, (mouseY + j) * 5 * noiseScale);
				rotate(radians(map(n2, 0, 1, -180, 180)));
				arc(0, 0, strokeLength, strokeLength, PI, PI + QUARTER_PI);
				//ellipse(0,0,random(30,200))
				pop();
			}
		}
	}
}


function windowResized() {
	wH = windowHeight;
	if (windowWidth < 1200) {
		wH = windowHeight / 2;
	}
	resizeCanvas(windowWidth, wH);
}