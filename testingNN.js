const synaptic = require('synaptic');

const Layer = synaptic.Layer;
const Network = synaptic.Network;
const Trainer = synaptic.Trainer;

/* INSTRUCTIONS TO RUN THIS FILE

1.) npm install synaptic
2.) node testingNN.js

*/

/* 
Input suggestions/tests

Avg dev weight
Scrum master weight
Estimated time to completion - dev
Estimated time to completion - scrum master
Time to completion
Dev weight hindsight

*/

/* Output Suggestions

1, 2, 3, 5, 8, 

*/

/* Create our Network */

const inputLayer = new Layer(6);
const hiddenLayer1 = new Layer(6);
const outputLayer = new Layer(5);

inputLayer.project(hiddenLayer1);
hiddenLayer1.project(outputLayer);

const myNetwork = new Network({
    input: inputLayer,
    hidden: [hiddenLayer1],
    output: outputLayer
});


//Normalized Training Data

let arr = [{
	input: [0.2, 0.1, 0.2, 0.3, 0.1, 0.2],
    output: [1,0,0,0,0]
}, {
	input: [0.4, 0.3, 0.4, 0.4, 0.3, 0.3],
    output: [0,1,0,0,0]
}, {
	input: [0.6, 0.5, 0.6, 0.6, 0.5, 0.5],
    output: [0,0,1,0,0]
}, {
	input: [0.8, 0.7, 0.7, 0.8, 0.7, 0.7],
    output: [0,0,0,1,0]
}, {
	input: [0.9, 0.9, 1, 0.9, 0.9, 0.8],
    output: [0,0,0,0,1]
}
]

//Training Function
const trainer = new Trainer(myNetwork);
trainer.train(arr, {
    rate: .05,
    iterations: 9000,
    error: .05,
    shuffle: true,
    log: 1,
    cost: Trainer.cost.CROSS_ENTROPY
});

//Testing test data
let guess1 = myNetwork.activate(arr[0].input) 
let answer1 = arr[0].output
let guess2 = myNetwork.activate(arr[3].input) 
let answer2 = arr[3].output
//Random Test sample 
let guess3 = myNetwork.activate([0.5, 0.6, 0.7, 0.5, 0.4, 0.4])
let answer3 = [0,0,1,0,0]

console.log('test 1 : ', guess1, answer1)
console.log('test 2: ' , guess2, answer2)
console.log('test 3: ', guess3, answer3)

