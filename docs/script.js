//画像入力用
var img = new Image();
window.onload = function(){
	document.getElementById("selectfile").addEventListener("change", 
		function(evt){
			var file = evt.target.files;
			var reader = new FileReader();
			reader.readAsDataURL(file[0]);
			reader.onload = function(){
				img.src = reader.result;
				document.getElementById("InputImage").innerHTML = "<img src='" + img.src + "'></br>";
				document.forms.fm.ta.value="ファイルを選択\n";
			}
		},
	false);
	
};

//出力画像を入力画像にする
var ResultImage;
function FeedBack(){
	img.src = ResultImage;
	document.getElementById("InputImage").innerHTML = "<img src='" + img.src + "'></br>";
	document.getElementById("OutputImage").innerHTML = "";
	document.forms.fm.ta.value+="出力画像を入力画像にする\n";
}

//画像出力用
function ImageOut(DataURL){
	document.getElementById("OutputImage").innerHTML = "<img src='" + DataURL + "'></br>";
	ResultImage = DataURL;
}

//変化しない
function Raw(){
	document.forms.fm.ta.value+="そのまま\n";
	var canvas = document.createElement("canvas");
	var ctx = canvas.getContext('2d');
	canvas.width = img.width;
	canvas.height = img.height;
	ctx.drawImage(img,0,0);
	ImageOut(canvas.toDataURL());
}

//画像縮小
function Small(){
	document.forms.fm.ta.value+="画像縮小\n";
	var canvas = document.createElement("canvas");
	var ctx = canvas.getContext('2d');
	canvas.width = img.width/2;
	canvas.height = img.height/2;
	ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
	ImageOut(canvas.toDataURL());
}

//グレースケール化
function Gray(){
	document.forms.fm.ta.value+="グレースケール化\n";
	var canvas = document.createElement("canvas");
	var ctx = canvas.getContext('2d');
	canvas.width = img.width;
	canvas.height = img.height;
	ctx.drawImage(img,0,0);
	var Data = ctx.getImageData(0, 0, canvas.width, canvas.height);
	var data = Data.data;
	for(var i=0;i<data.length;i+=4){
		var tmp = (data[i]+data[i+1]+data[i+2])/3;
		data[i]=tmp;
		data[i+1]=tmp;
		data[i+2]=tmp;
	}
	ctx.putImageData(Data,0,0);
	ImageOut(canvas.toDataURL());
}

//ガウシアンぼかし
function Gaussian(){
	document.forms.fm.ta.value+="ガウシアンぼかし[未実装]\n";
	document.forms.fm.ta.value+="そのまま\n";
	var canvas = document.createElement("canvas");
	var ctx = canvas.getContext('2d');
	canvas.width = img.width;
	canvas.height = img.height;
	ctx.drawImage(img,0,0);
	ImageOut(canvas.toDataURL());
}

//直線検出
function Hough(){
	document.forms.fm.ta.value+="直線検出[未実装]\n";
	document.forms.fm.ta.value+="そのまま\n";
	var canvas = document.createElement("canvas");
	var ctx = canvas.getContext('2d');
	canvas.width = img.width;
	canvas.height = img.height;
	ctx.drawImage(img,0,0);
	ImageOut(canvas.toDataURL());
}
