(function(){
	// Game是唯一暴露到全局的
	window.Game = function(){
		//初始化表格
		this.init();
		// 定时器，业务的主循环
		this.start();
		this.block = new Block();
		this.map = new Map()
		// 键盘事件
		this.bindEvent()
		// 分数
		this.score = 0;
	}
	Game.prototype.init = function(){

		//页面初始化的内容
		for(var i = 0; i < 20; i++){
			// 创建了20行tr
			var $tr = $("<tr></tr>");
			for(var j = 0; j < 12; j++){
				// 每一行tr中有12个td
				var $td = $("<td></td>");
				// 追加节点
				$td.appendTo($tr);
			}
			// 节点上树
			$tr.appendTo("#tab")
		}
	}
	Game.prototype.setColor = function(r,c,n){
		// 让某一个格子变颜色
		$("tr").eq(r).children("td").eq(c).addClass("c"+n)
	}
	Game.prototype.clear = function(){
		for(var i = 0; i < 20; i++){
			for(var j = 0; j < 12; j++){
				$("tr").eq(i).children("td").eq(j).removeClass()
			}
		}
	}
	Game.prototype.bindEvent = function(){
		//备份
		var self = this;
		$(document).keydown(function(e){
			if(e.keyCode == 37){
				self.block.checkLeft()
			}else if(e.keyCode == 39){
				self.block.checkRight()
			}else if(e.keyCode == 32){
				self.block.checkDaodi()
			}else if(e.keyCode == 38){
				self.block.checkRot()
			}
		})
	}
	Game.prototype.start = function(){
		// 备份上下文
		var self = this;
		// 异步环境，定时器是异步，所以能调用其他类的render
		this.timer = setInterval(function(){
			// 顺序：清屏-更新-渲染
			// 清屏
			self.clear()
			//方块的下落，更新
			self.block.checkDown();
			// 渲染地图和方块，因为方块要运动， 所以必须放到定时器中调用render
			// 渲染
			self.block.render();
			// 渲染地图
			self.map.render()
		},500)
	}
})()