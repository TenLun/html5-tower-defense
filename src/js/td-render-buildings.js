/*
 * Copyright (c) 2011.
 *
 * Author: oldj <oldj.wu@gmail.com>
 * Blog: http://oldj.net/
 *
 * 渲染建筑物
 * 
 * Last Update: 2011/1/10 5:22:52
 */

// _TD.a.push begin
_TD.a.push(function (TD) {

	function lineTo2(ctx, x0, y0, x1, y1, len) {
		var x2, y2, a, b, p, xt,
			a2, b2, c2;

		if (x0 == x1) {
			x2 = x0;
			y2 = y1 > y0 ? y0 + len : y0 - len;
		} else if (y0 == y1) {
			y2 = y0;
			x2 = x1 > x0 ? x0 + len : x0 - len;
		} else {
			// 解一元二次方程
			a = (y0 - y1) / (x0 - x1);
			b = y0 - x0 * a;
			a2 = a * a + 1;
			b2 = 2 * (a * (b - y0) - x0);
			c2 = Math.pow(b - y0, 2) + x0 * x0 - Math.pow(len, 2);
			p = Math.pow(b2, 2) - 4 * a2 * c2;
			if (p < 0) {
//				TD.log("ERROR: [a, b, len] = [" + ([a, b, len]).join(", ") + "]");
				return [0, 0];
			}
			p = Math.sqrt(p);
			xt = (-b2 + p) / (2 * a2);
			if ((x1 - x0 > 0 && xt - x0 > 0) ||
				(x1 - x0 < 0 && xt - x0 < 0)) {
				x2 = xt;
				y2 = a * x2 + b;
			} else {
				x2 = (-b2 - p) / (2 * a2);
				y2 = a * x2 + b;
			}
		}

		ctx.lineCap = "round";
		ctx.moveTo(x0, y0);
		ctx.lineTo(x2, y2);

		return [x2, y2];
	}

	var renderFunctions = {
		"cannon": function (building, ctx, map, gs, gs2) {
			var target_position = building.getTargetPosition();

			ctx.fillStyle = "#393";
			ctx.strokeStyle = "#000";
			ctx.beginPath();
			ctx.lineWidth = _TD.retina;
			ctx.arc(building.cx, building.cy, 12 * _TD.retina, 0, Math.PI * 2, true);
			ctx.closePath();
			ctx.fill();
			ctx.stroke();

			ctx.lineWidth = 3 * _TD.retina;
			ctx.beginPath();
			ctx.moveTo(building.cx, building.cy);
			building.muzzle = lineTo2(ctx, building.cx, building.cy, target_position[0], target_position[1], gs2);
			ctx.closePath();
//			ctx.fill();
			ctx.stroke();

			ctx.lineWidth = _TD.retina;
			ctx.fillStyle = "#060";
			ctx.beginPath();
			ctx.arc(building.cx, building.cy, 7 * _TD.retina, 0, Math.PI * 2, true);
			ctx.closePath();
			ctx.fill();
			ctx.stroke();

			ctx.fillStyle = "#cec";
			ctx.beginPath();
			ctx.arc(building.cx + 2, building.cy - 2, 3 * _TD.retina, 0, Math.PI * 2, true);
			ctx.closePath();
			ctx.fill();

		},
		"LMG": function (building, ctx, map, gs, gs2) {
			var target_position = building.getTargetPosition();

			ctx.fillStyle = "#36f";
			ctx.strokeStyle = "#000";
			ctx.beginPath();
			ctx.lineWidth = _TD.retina;
			ctx.arc(building.cx, building.cy, 7 * _TD.retina, 0, Math.PI * 2, true);
			ctx.closePath();
			ctx.fill();
			ctx.stroke();

			ctx.lineWidth = 2 * _TD.retina;
			ctx.beginPath();
			ctx.moveTo(building.cx, building.cy);
			building.muzzle = lineTo2(ctx, building.cx, building.cy, target_position[0], target_position[1], gs2);
			ctx.closePath();
			ctx.fill();
			ctx.stroke();

			ctx.lineWidth = _TD.retina;
			ctx.fillStyle = "#66c";
			ctx.beginPath();
			ctx.arc(building.cx, building.cy, 5 * _TD.retina, 0, Math.PI * 2, true);
			ctx.closePath();
			ctx.fill();
			ctx.stroke();

			ctx.fillStyle = "#ccf";
			ctx.beginPath();
			ctx.arc(building.cx + 1, building.cy - 1, 2 * _TD.retina, 0, Math.PI * 2, true);
			ctx.closePath();
			ctx.fill();

		},
		"HMG": function (building, ctx, map, gs, gs2) {
			var target_position = building.getTargetPosition();

			ctx.fillStyle = "#933";
			ctx.strokeStyle = "#000";
			ctx.beginPath();
			ctx.lineWidth = _TD.retina;
			ctx.arc(building.cx, building.cy, 15 * _TD.retina, 0, Math.PI * 2, true);
			ctx.closePath();
			ctx.fill();
			ctx.stroke();

			ctx.lineWidth = 5 * _TD.retina;
			ctx.beginPath();
			ctx.moveTo(building.cx, building.cy);
			building.muzzle = lineTo2(ctx, building.cx, building.cy, target_position[0], target_position[1], gs2);
			ctx.closePath();
			ctx.fill();
			ctx.stroke();

			ctx.lineWidth = _TD.retina;
			ctx.fillStyle = "#630";
			ctx.beginPath();
			ctx.arc(building.cx, building.cy, gs2 - 5 * _TD.retina, 0, Math.PI * 2, true);
			ctx.closePath();
			ctx.fill();
			ctx.stroke();

			ctx.fillStyle = "#960";
			ctx.beginPath();
			ctx.arc(building.cx + 1, building.cy - 1, 8 * _TD.retina, 0, Math.PI * 2, true);
			ctx.closePath();
			ctx.fill();

			ctx.fillStyle = "#fcc";
			ctx.beginPath();
			ctx.arc(building.cx + 3, building.cy - 3, 4 * _TD.retina, 0, Math.PI * 2, true);
			ctx.closePath();
			ctx.fill();

		},
		"wall": function (building, ctx, map, gs, gs2) {
			ctx.lineWidth = _TD.retina;
			ctx.fillStyle = "#666";
			ctx.strokeStyle = "#000";
			ctx.fillRect(building.cx - gs2 + 1, building.cy - gs2 + 1, gs - 1, gs - 1);
			ctx.beginPath();
			ctx.moveTo(building.cx - gs2 + 0.5, building.cy - gs2 + 0.5);
			ctx.lineTo(building.cx - gs2 + 0.5, building.cy + gs2 + 0.5);
			ctx.lineTo(building.cx + gs2 + 0.5, building.cy + gs2 + 0.5);
			ctx.lineTo(building.cx + gs2 + 0.5, building.cy - gs2 + 0.5);
			ctx.lineTo(building.cx - gs2 + 0.5, building.cy - gs2 + 0.5);
			ctx.moveTo(building.cx - gs2 + 0.5, building.cy + gs2 + 0.5);
			ctx.lineTo(building.cx + gs2 + 0.5, building.cy - gs2 + 0.5);
			ctx.moveTo(building.cx - gs2 + 0.5, building.cy - gs2 + 0.5);
			ctx.lineTo(building.cx + gs2 + 0.5, building.cy + gs2 + 0.5);
			ctx.closePath();
			ctx.stroke();
		},
		"laser_gun": function (building, ctx/*, map, gs, gs2*/) {
//			var target_position = b.getTargetPosition();

			ctx.fillStyle = "#f00";
			ctx.strokeStyle = "#000";
			ctx.beginPath();
			ctx.lineWidth = _TD.retina;
//			ctx.arc(b.cx, b.cy, gs2 - 5, 0, Math.PI * 2, true);
			ctx.moveTo(building.cx, building.cy - 10 * _TD.retina);
			ctx.lineTo(building.cx - 8.66 * _TD.retina, building.cy + 5 * _TD.retina);
			ctx.lineTo(building.cx + 8.66 * _TD.retina, building.cy + 5 * _TD.retina);
			ctx.lineTo(building.cx, building.cy - 10 * _TD.retina);
			ctx.closePath();
			ctx.fill();
			ctx.stroke();

			ctx.fillStyle = "#60f";
			ctx.beginPath();
			ctx.arc(building.cx, building.cy, 7 * _TD.retina, 0, Math.PI * 2, true);
			ctx.closePath();
			ctx.fill();
			ctx.stroke();

			ctx.fillStyle = "#000";
			ctx.beginPath();
			ctx.arc(building.cx, building.cy, 3 * _TD.retina, 0, Math.PI * 2, true);
			ctx.closePath();
			ctx.fill();

			ctx.fillStyle = "#666";
			ctx.beginPath();
			ctx.arc(building.cx + 1, building.cy - 1, _TD.retina, 0, Math.PI * 2, true);
			ctx.closePath();
			ctx.fill();

			ctx.lineWidth = 3 * _TD.retina;
			ctx.beginPath();
			ctx.moveTo(building.cx, building.cy);
//			b.muzzle = lineTo2(ctx, b.cx, b.cy, target_position[0], target_position[1], gs2);
			ctx.closePath();
			ctx.fill();
			ctx.stroke();
		},

		//加农炮 ctx = canvas
		"AT_GUN": function (building, ctx, map, gs, grid_size_half) {
			var target_position = building.getTargetPosition();

			//底部
			ctx.fillStyle = "#f23";
			ctx.strokeStyle = "#000";
			ctx.beginPath();
			ctx.lineWidth = _TD.retina;
			ctx.arc(building.cx, building.cy, 10 * _TD.retina, 0, Math.PI * 2, true);
			ctx.closePath();
			ctx.fill();
			ctx.stroke();

			//炮孔
			ctx.lineWidth = 2 * _TD.retina;
			ctx.beginPath();
			ctx.moveTo(building.cx, building.cy);
			building.muzzle = lineTo2(ctx, building.cx, building.cy, target_position[0], target_position[1], grid_size_half);
			ctx.closePath();
			ctx.fill();
			ctx.stroke();

			//第二个高光
			ctx.lineWidth = _TD.retina;
			ctx.fillStyle = "#f6c";
			ctx.beginPath();
			ctx.rect(building.cx - grid_size_half/3.5, building.cy - grid_size_half/3.5 , 10 * _TD.retina, 10 * _TD.retina , true);
			ctx.closePath();
			ctx.fill();
			ctx.stroke();

		},
		//冰冻
		"froze": function (building, ctx, map, gs, grid_size_half) {
			var target_position = building.getTargetPosition();

			//底部
			ctx.fillStyle = "#00c5cd";
			ctx.strokeStyle = "#000";
			ctx.beginPath();
			ctx.lineWidth = _TD.retina;
			ctx.arc(building.cx, building.cy, 9.5 * _TD.retina, 0, Math.PI * 2, true);
			ctx.closePath();
			ctx.fill();
			ctx.stroke();

			//炮孔
			ctx.lineWidth = 4 * _TD.retina;
			ctx.beginPath();
			ctx.moveTo(building.cx, building.cy);
			building.muzzle = lineTo2(ctx, building.cx, building.cy, target_position[0], target_position[1], grid_size_half);
			ctx.closePath();
			ctx.fill();
			ctx.stroke();

			//第二个高光
			ctx.lineWidth = _TD.retina;
			ctx.fillStyle = "#6cf";
			ctx.beginPath();
			ctx.arc(building.cx, building.cy, 6 * _TD.retina, 0, Math.PI * 2, true);
			ctx.closePath();
			ctx.fill();
			ctx.stroke();

			//高光
			ctx.fillStyle = "#ccf";
			ctx.beginPath();
			ctx.arc(building.cx + 1, building.cy - 1, 2 * _TD.retina, 0, Math.PI * 2, true);
			ctx.closePath();
			ctx.fill();

		},
	};

	TD.renderBuilding = function (building) {
		var ctx = TD.ctx,
			map = building.map,
			grid_size = TD.grid_size,
			grid_size_half = TD.grid_size / 2;

		(renderFunctions[building.type] || renderFunctions["wall"])(
			building, ctx, map, grid_size, grid_size_half
		);
	}

}); // _TD.a.push end
