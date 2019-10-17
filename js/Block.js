(function(){
	// 方块类，所有的和方块有关系的都在这写
	window.Block = function(){
		//设置方块所有的类型
		var allType = ["T","S","Z","L","J","O","I"];
		// 随机某一个类型
		this.type = allType[parseInt(Math.random() * allType.length)];
		//因为每一个方块的方向数量不同，所以随机的时候不能给固定的数字，比如4是不对的，O就不适用，因为O的方向只有一个，所以要先得到当前方块的类型的总方向数量
		this.allTypeLength = fangkuai[this.type].length;
		//通过当前方块的类型的总方向数量，随机其中的一项
		this.dir = parseInt(Math.random() * this.allTypeLength)
		// 得到方块,类型的是随机的，当前随机类型的方向也是随机的
		this.code = fangkuai[this.type][this.dir];
		// 初始的行和列
		this.row = 0;
		this.col = 4;
	}
	Block.prototype.render = function(){
		// 渲染方块
		for(var i = 0; i < 4; i++){
			for(var j = 0; j <4; j++){
				//判断，当前方块中哪一项不是0，不是0就渲染这一项，这一项的数决定方块的颜色
				if(this.code[i][j] != 0){
					game.setColor(i+this.row,j+this.col,this.code[i][j])
				}
			}
		}
	}
	Block.prototype.check = function(row,col){
		// 判断的是地图和方块
		for(var i = 0; i < 4; i++){
			for(var j = 0; j < 4; j++){
				//判断方块的每一个，如果当前的这个格子不为0，并且地图中，this.row+1的位置也不为0，就不能移动，否则就移动
				if(this.code[i][j] != 0 && game.map.mapCode[i + row][j+col] != 0){
					return false;
				}
			}
		}
		return true;
	}
	// 判断下落
	Block.prototype.checkDown = function(){
		if(this.check(this.row+1,this.col)){
			this.row++
		}else{
			game.map.gameOver()
			// 渲染新的方块之前要将旧不能动的方块，渲染到地图上
			this.godie()
			// 判断消行
			game.map.remove()
			//else就是方块停止了，渲染新的方块
			game.block = new Block();
		}
	}
	// 判断左移
	Block.prototype.checkLeft = function(){
		if(this.check(this.row,this.col-1)){
			this.col--
		}
	}
	// 判断右移
	Block.prototype.checkRight = function(){
		if(this.check(this.row,this.col+1)){
			this.col++
		}
	}
	// 判断一键到底
	Block.prototype.checkDaodi = function(){
		while(this.check(this.row+1,this.col)){
			this.row++
		}
	}
	// 方块的旋转
	Block.prototype.checkRot = function(){
		//备份旧的方向
		var oldDir = this.dir;
		// 变方向，就是this.dir++
		this.dir++;
		// 判断，this.dir不能大于前方块的类型的总方向数量
		if(this.dir > this.allTypeLength - 1){
			this.dir = 0;
		}
		// 数据变量，方块也要改变，this.code要渲染新的dir 的方块
		this.code = fangkuai[this.type][this.dir]
		console.log(this.code)
		// 判断，方块和地图是否有重合
		if(!this.check(this.row,this.col)){
			// 只要进到这个if语句，就说明有重合，打回原形
			// 让旋转之后dir 变回旧的dir
			this.dir = oldDir;
			// 再次渲染之前的旧方块
			this.code = fangkuai[this.type][this.dir]
		}
	}
	Block.prototype.godie = function(){
		for(var i = 0; i < 4; i++){
			for(var j = 0; j < 4; j++){
				// 地图渲染方块，将方块的颜色渲染到地图上
				if(this.code[i][j] != 0){
					// 将地图变为方块的颜色
					game.map.mapCode[i + this.row][j + this.col] = this.code[i][j];
				}
			}
		}
	}
})()