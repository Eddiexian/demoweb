function postData(url, data) {
    // Default options are marked with *
    return fetch(url, {
        body: JSON.stringify(data), // must match 'Content-Type' header
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, same-origin, *omit
        headers: {
            'user-agent': 'Example',
            'content-type': 'application/json'
        },
        method: 'POST', // *GET, POST, PUT, DEvarE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // *client, no-referrer
    })
        .then(response => response.json()) // 輸出成 json
}

function submit(){
	
	const picture = document.getElementById('picture').value;
	
	const data={
		picture
	}
	console.log(data);
	postData('https://flask-api-dl.herokuapp.com/predict',data)
	.then(data=>{
		const result = data.return;
		console.log(data);
		document.getElementById('resultText').innerHTML=result;
	})
}

function fChange(){ 
	var file = document.getElementById('file'); 
	console.log(file.value); 
	console.log(file.files[0]); 
	
	var bold = window.URL.createObjectURL(file.files[0]); 
	console.log('bold==>'+bold); 
	var boldImg = document.getElementById('bold'); 
	boldImg.src = bold;
	boldImg.onload=function(){
		var cvs = document.getElementById('cvs');
		var ctx = cvs.getContext('2d');
		ctx.drawImage(this, 0, 0, cvs.width, cvs.height);
	};
}
function scale(data, width, height, newData, newWidth, newHeight) {
    // 计算压缩后的缩放比
    const scaleW = newWidth / width;
    const scaleH = newHeight / height;
    const dstData = newData;
    
    const filter = (dstCol, dstRow) => {
        const srcCol = Math.min(width - 1, dstCol / scaleW);
        const srcRow = Math.min(height - 1, dstRow / scaleH);
        const intCol = Math.floor(srcCol);
        const intRow = Math.floor(srcRow);
        
        // 真实的index，因为数组是一维的
        let dstI = (dstRow * newWidth) + dstCol;
        let srcI = (intRow * width) + intCol;
        
        // rgba，所以要乘以4
        dstI *= 4;
        srcI *= 4;
        
        for (let j = 0; j <= 3; j += 1) {
            dstData[dstI + j] = data[srcI + j];
        }
    };
    
    // 区块
    for (let col = 0; col < newWidth; col += 1) {
        for (let row = 0; row < newHeight; row += 1) {
            filter(col, row);
        }
    }
	
	return dstData;
}

function getpixel(){
	
	var cvs = document.getElementById('cvs');
	var ctx = cvs.getContext('2d');
	
	
	
	var pixel = ctx.getImageData(0,0,cvs.width,cvs.height);
	
	var data = pixel.data; // rgba
	console.log(data);
	for(var i=0;i<data.length;i+=4)
	{
		gray = (data[i]+data[i+1]+data[i+2])/3;
		data[i]=gray;
		data[i+1]=gray;
		data[i+2]=gray;
	}
	ctx.putImageData(pixel,0,0);
	
	var newdata = new Array(3136);
	scale(data,280,280,newdata,28,28);

	
	
	
	
	var newarray = new Array(784);
	
	var k = 0;
	for(var j=0;j<newdata.length;j+=4)
	{
		newarray[k]=(newdata[j+3]/255);
		k+=1;
		
	}
	//var resizenewarray = new Array(784);

	//console.log(resizenewarray);
	const dataform={
		picture:newarray
	}
	console.log(dataform);
	postData('https://flask-api-dl.herokuapp.com/predict',dataform)
	.then(dataform=>{
		const result = dataform.return;
		console.log(result);
		document.getElementById('resultText').innerHTML=result;
	})
	
	

}