function getCookie(c_name)
	{
		if (document.cookie.length > 0) {
			c_start = document.cookie.indexOf(c_name + "=");
			if (c_start != -1) {
				c_start = c_start + c_name.length+1;
				c_end = document.cookie.indexOf(";", c_start);
				if (c_end == -1) {
					c_end = document.cookie.length;
					return unescape(document.cookie.substring(c_start,c_end));
				}; 
			};
		};
	}

	function setCookie(c_name,value)
	{
		document.cookie = c_name + "=" + escape(value);
	}



	//图片预览
	function previewImage(file,callback){//file为plupload事件监听函数参数中的file对象,callback为预览图片准备完成的回调函数
		if(!file || !/image\//.test(file.type)) return; //确保文件是图片
		if(file.type=='image/gif'){//gif使用FileReader进行预览,因为mOxie.Image只支持jpg和png
			var fr = new mOxie.FileReader();
			fr.onload = function(){
				callback(fr.result);
				fr.destroy();
				fr = null;
			}
			fr.readAsDataURL(file.getSource());
		}else{
			var preloader = new mOxie.Image();
			preloader.onload = function() {
				preloader.downsize( 300, 300 );//先压缩一下要预览的图片,宽300，高300
				var imgsrc = preloader.type=='image/jpeg' ? preloader.getAsDataURL('image/jpeg',80) : preloader.getAsDataURL(); //得到图片src,实质为一个base64编码的数据
				callback && callback(imgsrc); //callback传入的参数为预览图片的url
				preloader.destroy();
				preloader = null;
			};
			preloader.load( file.getSource() );
		}	
	}




$(document).ready(function(){
	$('.blog-nav li').click(function(){
		$(this).addClass('activea');
	});

	// the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    $('.modal-trigger').leanModal();


    //获取位置信息
	var locations;
	$.getJSON("http://api.vgee.cn/mylocation",function(json){
		var loca=json.data;
		locations=loca.location;
		
	})

	//获取时间
	var d=new Date();
	
	var vMon=d.getMonth()+1;
	var vDay=d.getDate();
	var h= d.getHours(); 
	var m= d.getMinutes(); 
	
	if (m<10) {
		m='0'+m;
	};

	//验证用户名cookie是否存在
	username = getCookie('username');
		if (!username) {
			username = $("#message").val();

			setCookie('username',username);
		};

	//图片上传

	var uploader = new plupload.Uploader({
		runtimes: 'html5,flash',
		browse_button : 'upimg',
		url : '/uploadimg',
		filters:{
			mime_type : [//只允许上传图片
				{ title : "Image files", extensions : "jpg,gif,png,jpeg" }
			],
			prevent_duplicates: true
		},
		
	});

	uploader.init();

	
	var file_name;
		//绑定文件添加进队列事件
	uploader.bind('FilesAdded',function(uploader,files){
		for(var i = 0, len = files.length; i<len; i++){
			 file_name = files[i].name; //文件名
			
			!function(i){
				previewImage(files[i],function(imgsrc){
					$('.bicon').append('<img src="'+ imgsrc +'" />');
					$("#upimg").css("display" , "none");
				})
		    }(i);
		}
	});




	//留言
	$('.buttom').click(function(){
			uploader.start();

		var subv=$("#message").val();
		if (subv == '') {
			return false;		}
		else
		{
			$.ajax({
			type: "POST",
			url:  "/models/message",
			data: { 
				message : $("#message").val(),
				name: username,
				imgname: file_name,
				vMon: vMon,
				vDay: vDay,
				h: h,
				m: m,
				city: locations.city
			 },
			success: function(data,textAtatus){
			console.log(data.Message);
		}});
			// location.reload();
		};
		return false;


	});

	
	

});







