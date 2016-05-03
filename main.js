//
		// Startup
		//
		var _isDown, _points, _r, _g, _rc;
		var lastStroke;
		function onLoadEvent()
		{
			_points = new Array();
			_r = new DollarRecognizer();

			var canvas = document.getElementById('myCanvas');
			_g = canvas.getContext('2d');
			_g.fillStyle = "rgb(0,0,225)";
			_g.strokeStyle = "rgb(0,0,225)";
			_g.lineWidth = 3;
			_g.font = "16px Gentilis";
			_rc = getCanvasRect(canvas); // canvas rect on page
			_g.fillStyle = "rgb(255,255,136)";
			_g.fillRect(0, 0, _rc.width, 20);

			_isDown = false;

			// get references to each button element
			getButtons();
		}
		function getCanvasRect(canvas)
		{
			var w = canvas.width;
			var h = canvas.height;

			var cx = canvas.offsetLeft;
			var cy = canvas.offsetTop;
			while (canvas.offsetParent != null)
			{
				canvas = canvas.offsetParent;
				cx += canvas.offsetLeft;
				cy += canvas.offsetTop;
			}
			return {x: cx, y: cy, width: w, height: h};
		}
		function getScrollY()
		{
			var scrollY = 0;
			if (typeof(document.body.parentElement) != 'undefined')
			{
				scrollY = document.body.parentElement.scrollTop; // IE
			}
			else if (typeof(window.pageYOffset) != 'undefined')
			{
				scrollY = window.pageYOffset; // FF
			}
			return scrollY;
		}
		//
		// Mouse Events
		//
		function mouseDownEvent(x, y)
		{
			document.onselectstart = function() { return false; } // disable drag-select
			document.onmousedown = function() { return false; } // disable drag-select
			_isDown = true;
			x -= _rc.x;
			y -= _rc.y - getScrollY();
			if (_points.length > 0)
				_g.clearRect(0, 0, _rc.width, _rc.height);
			_points.length = 1; // clear
			_points[0] = new Point(x, y);
			drawText("Recording unistroke...");
			_g.fillRect(x - 4, y - 3, 9, 9);
		}
		function mouseMoveEvent(x, y)
		{
			if (_isDown)
			{
				x -= _rc.x;
				y -= _rc.y - getScrollY();
				_points[_points.length] = new Point(x, y); // append
				drawConnectedPoint(_points.length - 2, _points.length - 1);
			}
		}
		function mouseUpEvent(x, y)
		{
			document.onselectstart = function() { return true; } // enable drag-select
			document.onmousedown = function() { return true; } // enable drag-select
			if (_isDown)
			{
				_isDown = false;
				if (_points.length >= 10)
				{
					var result = _r.Recognize(_points, false);
					drawText("Result: " + result.Name + " (" + round(result.Score,2) + ").");

					// x or o make move
					if (result.Name == "x" || result.Name == "circle") {
						enableButtons();
						lastStroke = result.Name;
					// zigzag clears game
					} else if (result.Name == "zigzag") {
						// DO STUFF
					// arrow checks for win
					} else if (result.Name == "arrow") {
						checkWin();
					}
				}	
				else // fewer than 10 points were inputted
				{
					drawText("Too few points made. Please try again.");
				}
			}
		}
		function drawText(str)
		{
			_g.fillStyle = "rgb(255,255,136)";
			_g.fillRect(0, 0, _rc.width, 20);
			_g.fillStyle = "rgb(0,0,255)";
			_g.fillText(str, 1, 14);
		}
		function drawConnectedPoint(from, to)
		{
			_g.beginPath();
			_g.moveTo(_points[from].X, _points[from].Y);
			_g.lineTo(_points[to].X, _points[to].Y);
			_g.closePath();
			_g.stroke();
		}
		function round(n, d) // round 'n' to 'd' decimals
		{
			d = Math.pow(10, d);
			return Math.round(n * d) / d
		}
		
/*
 * JavaScript written by Cassandra Beaulaurier and Patrick Harper-Joles
 *
 */
// gets references to each button element once
 function getButtons() {
 	button1 = document.getElementById('1');
 	button2 = document.getElementById('2');
 	button3 = document.getElementById('3');
 	button4 = document.getElementById('4');
 	button5 = document.getElementById('5');
 	button6 = document.getElementById('6');
 	button7 = document.getElementById('7');
 	button8 = document.getElementById('8');
 	button9 = document.getElementById('9');
 }
 // places x or o on gameboard
 function makeMove(id) {
 	square = document.getElementById(id);
 	if (!square.innerHTML) {
 		if (lastStroke == "x") {
 		square.innerHTML = 'x';
 	} else if (lastStroke == "circle") {
 		square.innerHTML = "o";
 	}
 	disableButtons();
 	}
 }

// Allows buttons to be clicked to place an x or o
 function enableButtons() {
 	button1.disabled = false;
 	button2.disabled = false;
 	button3.disabled = false;
 	button4.disabled = false;
 	button5.disabled = false;
 	button6.disabled = false;
 	button7.disabled = false;
 	button8.disabled = false;
 	button9.disabled = false;
 }

 // disables buttons so that new gesture must be drawn before new move is placed
 function disableButtons() {
 	button1.disabled = true;
 	button2.disabled = true;
 	button3.disabled = true;
 	button4.disabled = true;
 	button5.disabled = true;
 	button6.disabled = true;
 	button7.disabled = true;
 	button8.disabled = true;
 	button9.disabled = true;
 }

 // Checks to see if someone won the game
 function checkWin() {
 	// check for x wins
 	if (button1.innerHTML == "x" && button2.innerHTML == "x" && button3.innerHTML == "x") {
		document.getElementById('instruct').innerHTML = "x wins!";
 	} else if (button4.innerHTML == "x" && button5.innerHTML == "x" && button3.innerHTML == "x") {
 		document.getElementById('instruct').innerHTML = "x wins!";
 	} else if (button7.innerHTML == "x" && button8.innerHTML == "x" && button9.innerHTML == "x") {
 		document.getElementById('instruct').innerHTML = "x wins!";
 	} else if (button1.innerHTML == "x" && button4.innerHTML == "x" && button7.innerHTML == "x") {
 		document.getElementById('instruct').innerHTML = "x wins!";
 	} else if (button2.innerHTML == "x" && button5.innerHTML == "x" && button8.innerHTML == "x") {
 		document.getElementById('instruct').innerHTML = "x wins!";
 	} else if (button3.innerHTML == "x" && button6.innerHTML == "x" && button9.innerHTML == "x") {
 		document.getElementById('instruct').innerHTML = "x wins!";
 	} else if (button1.innerHTML == "x" && button5.innerHTML == "x" && button9.innerHTML == "x") {
 		document.getElementById('instruct').innerHTML = "x wins!";
 	} else if (button3.innerHTML == "x" && button5.innerHTML == "x" && button7.innerHTML == "x") {
 		document.getElementById('instruct').innerHTML = "x wins!";
 	// check for o wins
 	} else if (button1.innerHTML == "o" && button2.innerHTML == "o" && button3.innerHTML == "o") {
		document.getElementById('instruct').innerHTML = "o wins!";
 	} else if (button4.innerHTML == "o" && button5.innerHTML == "o" && button3.innerHTML == "o") {
 		document.getElementById('instruct').innerHTML = "o wins!";
 	} else if (button7.innerHTML == "o" && button8.innerHTML == "o" && button9.innerHTML == "o") {
 		document.getElementById('instruct').innerHTML = "o wins!";
 	} else if (button1.innerHTML == "o" && button4.innerHTML == "o" && button7.innerHTML == "o") {
 		document.getElementById('instruct').innerHTML = "o wins!";
 	} else if (button2.innerHTML == "o" && button5.innerHTML == "o" && button8.innerHTML == "o") {
 		document.getElementById('instruct').innerHTML = "o wins!";
 	} else if (button3.innerHTML == "o" && button6.innerHTML == "o" && button9.innerHTML == "o") {
 		document.getElementById('instruct').innerHTML = "o wins!";
 	} else if (button1.innerHTML == "o" && button5.innerHTML == "o" && button9.innerHTML == "o") {
 		document.getElementById('instruct').innerHTML = "o wins!";
 	} else if (button3.innerHTML == "o" && button5.innerHTML == "o" && button7.innerHTML == "o") {
 		document.getElementById('instruct').innerHTML = "o wins!";
 	}
 }

 function clearBoard() {

 }