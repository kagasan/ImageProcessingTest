var Test =function(src, width, height){
	//ここから入力パラメータ
	var form = document.forms.fm;
	var sh = parseFloat(form.sh.value);
	var posi = form.posi.checked;
	var nega = form.nega.checked;
	
	//ここまで入力パラメータ
	
	//ここから出力用canvas設定
	var canvas = document.getElementById('outcanvas');
	canvas.width = width;
	canvas.height = height;
	var ctx = canvas.getContext('2d');
	var Data = ctx.getImageData(0, 0, width, height);
	var pixels = Data.data;
	function GetColor(R,G,B){
		return "rgb("+R+","+G+","+B+")";
	}
	function DrawCircle(X,Y,R,Color,FillFlag){
		if(FillFlag){
			ctx.fillStyle = Color;
			ctx.beginPath();
			ctx.arc(X, Y, R, 0, Math.PI*2, true);
			ctx.fill();
		}
		else{
			ctx.strokeStyle=Color;
			ctx.beginPath();
			ctx.arc(X, Y, R, 0, Math.PI*2, false);
			ctx.stroke();
		}
	}
	function DrawBox(X1,Y1,X2,Y2,Color,FillFlg){
		if(FillFlg){
			ctx.fillStyle = Color;
			ctx.fillRect(X1,Y1,X2-X1,Y2-Y1);
		}
		else{
			ctx.strokeStyle = Color;
			ctx.strokeRect(X1,Y1,X2-X1,Y2-Y1);
		}
	}
	function DrawDot(x, y, r=0, g=0, b=0){
		console.log(x+","+y);
		var idx = (x+y*width)*4;
		pixels[idx]=r;
		pixels[idx+1]=g;
		pixels[idx+2]=b;
		pixels[idx+3]=255;
	}
	//ここまで出力用canvas設定
	
	
	//ここから計算
	for(var y = 1 ; y<height;y++){
		for(var x = 0;x<width;x++){
			var lst = (x+(y-1)*width)*4;
			var cur = (x+y*width)*4;
			
			var lst_gray = (src[lst]+src[lst+1]+src[lst+2])/3;
			var cur_gray = (src[cur]+src[cur+1]+src[cur+2])/3;
			var diff = lst_gray - cur_gray;
			
			if(diff>sh && posi){
				var tmp = 128+diff*5;
				if(tmp>255)tmp=255;
				DrawDot(x,y,tmp,0,0);
			}
			else if(diff<-sh && nega){
				var tmp = 128-diff*5;
				if(tmp>255)tmp=255;
				DrawDot(x,y,0,0,tmp);
			}
			else{
				DrawDot(x,y,255,255,255);
			}
		}
	}
	//ここまで計算
	
	//ここから画像変換
	ctx.putImageData(Data, 0, 0);
	var png = canvas.toDataURL();
	document.getElementById("Img").src=png;
	canvas.width = 0;
	canvas.height = 0;
	//ここまで画像変換
}

window.addEventListener("DOMContentLoaded", function(){
	var ofd = document.getElementById("selectfile");
	ofd.addEventListener("change", function(evt) {
		var img = null;
		var canvas = document.createElement("canvas");
		var file = evt.target.files;
		var reader = new FileReader();
		reader.readAsDataURL(file[0]);
		reader.onload = function(){
			img = new Image();
			img.onload = function(){
				var context = canvas.getContext('2d');
				var width = img.width;
				var height = img.height;
				canvas.width = width;
				canvas.height = height;
				context.drawImage(img, 0, 0);
				var srcData = context.getImageData(0, 0, width, height);
				var src = srcData.data;
				Test(src, width, height);
				context.putImageData(srcData, 0, 0);
				var dataurl = canvas.toDataURL();
				document.getElementById("output").innerHTML = "<img src='" + dataurl + "'>";
			}
			img.src = reader.result;
		}
	}, false);
});

//フォームの内容をダウンロードする
function DL(){
	var form = document.forms.fm;
	var content = form.ta.value;
	var blob = new Blob([ content ], { "type" : "text/plain" });
	if(window.navigator.msSaveBlob){
		window.navigator.msSaveBlob(blob, "test.txt"); 
		//msSaveOrOpenBlobの場合はファイルを保存せずに開ける
		window.navigator.msSaveOrOpenBlob(blob, "test.txt"); 
	}
	else{
		document.getElementById("download").href = window.URL.createObjectURL(blob);
	}
}
