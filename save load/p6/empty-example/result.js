let label = '加载模型。。。';
let classifier;
let capture;
let featureExtractor;


function ModelReady() {
    console.log('Model is ready!');
    classifier.load('./model/model.json',myModelReady);
}
function myModelReady() {
    console.log('My model is ready!');
    label = 'model ready';
    classifier.classify(gotResults);
}
function captureReady() {
    console.log('Capture is ready!')
}


function setup() {
    createCanvas(640, 480);
    capture = createCapture(VIDEO);
    capture.hide();
    featureExtractor = ml5.featureExtractor("MobileNet", ModelReady);
    classifier = featureExtractor.classification(capture,captureReady);
}
function draw() {
    background(0);
    image(capture,0,0,640,480);
        //image(capture, 0, 0, width, width * capture.height / capture.width);
        fill(255);
        textSize(16);
        text(label,10,height - 10);
}
function gotResults(error,results) {
    if (error){
        console.log(error);
    }else{
       console.log(results);
        label = results;
        classifier.classify(gotResults);
    }
}