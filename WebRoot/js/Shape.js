var Shape = {
	top: -1,
	left: 6,
	timer: null,
	rects: null,
	body: null,
	status: null,
	createBody: function(){
		var temp = [],row = 0, col = 0, curr = this.body[this.status];
		for(var i = 0; i < curr.length; i++){
			row = Math.floor(i / 4);
			col = i % 4;
			if(curr[i] == 1){
				var coord = {}, rect;
				coord.x = Global.firstX + Global.cellSize * col;
				coord.y = Global.firstY + Global.cellSize * row;
				rect = createRect(coord);
				$(rect).attr("row", row);
				$(rect).attr("col", col);
				$("#panel").append(rect);
				temp.push(rect);
			}
		}
		this.rects = temp;
	},
	init: function(body, status){
		this.top = -1;
		this.left = 6;
		this.timer = null;
		this.rects = null;
		this.body = null;
		this.status = null;
		this.body = body;		//图形的所有状态
		this.status = status;	//当前状态
		this.createBody();
	},
	leftMove: function(){
		for(var i = 0; i < this.rects.length; i++){
			var x = $(this.rects[i]).attr("x");
			var temp = parseInt(x) - Global.cellSize;
			$(this.rects[i]).attr("x", temp);
		}
		this.left--;
	},
	rightMove: function(){
		for(var i = 0; i < this.rects.length; i++){
			var x = $(this.rects[i]).attr("x");
			var temp = parseInt(x) + Global.cellSize;
			$(this.rects[i]).attr("x", temp);
		}
		this.left++;
	},
	downMove: function(){
		for(var i = 0; i < this.rects.length; i++){
			var y = $(this.rects[i]).attr("y");
			var temp = parseInt(y) + Global.cellSize;
			$(this.rects[i]).attr("y", temp);
		}
		this.top++;
	},
	rotate: function(){
		this.status = (this.status + 1) % this.body.length;
		for(var i = 0; i < this.rects.length; i++){
			$(this.rects[i]).remove();
		}
		this.createBody();
	},
	downing: function(){
		this.downMove();
		this.timer = setTimeout(function(){Shape.downing();}, 1000);
		if(!Controller.isDownable()){
			clearInterval(this.timer);
		}
	}
};
function createRect(coord){
	var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
	$(rect).attr("x", coord.x);
	$(rect).attr("y", coord.y);
	$(rect).attr("width", Global.cellSize);
	$(rect).attr("height", Global.cellSize);
	return rect;
};