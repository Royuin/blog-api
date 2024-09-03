console.log('Hello');

fetch('http://localhost:3000', {mode: 'cors'})
	.then(function(response) {
		console.log(response.json());
	});
