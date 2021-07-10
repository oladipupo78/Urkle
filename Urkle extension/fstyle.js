document.querySelector('#font-submit-btn').addEventListener('click', () => {
	var x = document.getElementsByTagName("body");
	for(i in x){
		i.style.fontSize = document.querySelector('#font').value;
	};
}