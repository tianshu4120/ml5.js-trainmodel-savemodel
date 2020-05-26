var capture;
let name;
let classifier;
let probability;
let Loss=1000;
let inp;
let j=0;
let num=[];
let index;
let inps=[];

function GetResult(error, results) {
	if (error) {
		console.error(error);
	} else {
		console.log(results);
		name = results;
		//prob = results[0].probability;
		fill([255,0,0]);
		textSize(30);
		text(name, 10, height - 20);
        //createP(name);
        //createP(prob);  
	}
}

function captureReady() {
	console.log('Capture is ready!');
	//classifier.predict(capture, GetResult);
}

function myInputEvent(){
	classifier.numClasses = inp.value();
	for (let i = 1; i <= inp.value(); i++){
		num[i]=0;
		inps[i]=createInput();
		na = createButton('添加训练样本'+i);
		na.mousePressed(function(){
			classifier.addImage(inps[i].value());
			num[i]++;
			//console.log(num[i]);
			index=i;
		})
	}
}

function ModelReady() {
	console.log('Model is ready!');
	//classifier.predict(capture, GetResult);
	//classifier.load('./model/model.json',myModelReady);
}
function myModelReady() {
	console.log('My model id ready!');
}

/*function classify() {
	classifier.classify(GetResult);
}*/

function setup() {
	createCanvas(640, 480);
	capture = createCapture(VIDEO); //camera capture function
	capture.hide();
	feature = ml5.featureExtractor('MobileNet', ModelReady);
	classifier = feature.classification(capture, captureReady);

	/*//加入训练样本
	Button1 = createButton('手');
	//create button
	Button1.mousePressed(function(){
		classifier.addImage('手');
	});

	Button2 = createButton('花');
	//create button
	Button2.mousePressed(function(){
		classifier.addImage('花');
	});*/

	/*addButton = createButton('Add');
	//create button
	addButton.mousePressed(function(){
		classifier.numClasses = 100;
		j+=1;
		Button = createButton('categroy'+j);
		Button.mousePressed(function () {
			classifier.addImage('categroy'+j)

		});
	});*/
	inp = createInput('Categries');
	inp.input(myInputEvent);

	Button3 = createButton('Train');
	//create button
	Button3.mousePressed(function(){
		// Retrain the network
		classifier.train(function(lossValue) {
			console.log("Loss is", lossValue);
			if (lossValue== null){
				Loss=lossValue;
				classifier.classify(GetResult);
			}
		});

	});

	saveButton = createButton('保存模型');
	saveButton.mousePressed(function () {
		classifier.save();
	});

	resultBtn = createButton('开始识别');
	resultBtn.mousePressed(function () {
		window.open('myResult.html');
	});

}
function draw() {
	image(capture, 0, 0, width, height);
	fill([255,0,0]);
	textSize(30);
	text(name, 10, height - 20);
	if(Loss!=null){
		fill([255,0,0]);
		textSize(30);
		text(num[index], width -50 ,height - 20);
	}
	//classifier.predict(capture, GetResult);
	if (Loss==null){
		classifier.classify(GetResult);
	}
}
/*function predict() {
	buttonPredict = creatButton('预测');
	buttonPredict.mousePressed(classify);
}
function save() {
	saveButton = creatButton('保存模型');
	saveButton.mousePressed(function () {
		classifier.save();
	});
}
function load() {
	loadBtn = creatButton('加载模型');
	loadBtn.mousePressed(function () {
		classifier.load(loadBtn.elt.files,function(){
			console.log('My Model Loaded!');
		})
	})
}*/
