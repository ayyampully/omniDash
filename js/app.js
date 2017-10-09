$(function(){
	drawGraph()
	function drawGraph(){
		var barHeight = $('.DataRow.contentRow .DataCol:first').height();
		$('.barGraph')
			.height(barHeight)
			.each(function(){
				var maxVal = 10000,// maximum value of scale
					maxhValue = barHeight-20,// height of graph area
					//valueSplit = ($(this).find('h2').html()).split(','),//Making string as number
					value = $(this).find('h2').html(),
					//calculating the graph values
					percent = Math.round((value/maxVal)*100), 
					hValue = Math.round((percent/100)*maxhValue);
				
				$(this).find('div').height(hValue)
			})	
	}
	var obj = [
		{'year':2015, qdata:[1200, 2800, 3400, 500], 'total':7900},
		{'year':2014, qdata:[2200, 3800, 1400, 1500], 'total':8900},
		{'year':2013, qdata:[2800, 1000, 1700, 3000], 'total':8500},
		{'year':2012, qdata:[3200, 1800, 2000, 2000], 'total':9000}
	]
	//console.log(Math.max.apply(Math,array))
	
	var yellow = ["#F2DC9B","#F2C53D","#F2A444","#D94F30","#732720"],
		blue = ["#bbe8f7", "#a5dcef", "#85d3ed", "#6fbcdd", "#44add9"]
	var xmlns = "http://www.w3.org/2000/svg";
	
	drawPie(obj[0],'pie-chart',blue)
	drawPie(obj[1],'pie-chart-2',yellow)
	drawPie(obj[2],'pie-chart-3',yellow)
	
	function drawPie(data, id, theme){
		var svg = document.getElementById(id),
			cx = 100,
			cy = 100,
			r = 92,
			px = 192,
			py = 100,
			path = '',
			colors = theme,// from kuler
			yeardata = data.qdata;
		for(var i=0; i<yeardata.length; i++){
			var deg = 0,
				tempvar = yeardata[i];
				
			yeardata[i] = (yeardata[i]/data.total)*100;
			
			for(j=0; j<=i; j++){
				deg += yeardata[j];
			}
			deg=deg*3.6;
			var largeArc = yeardata[i]>50 ? 1 : 0,
			x = cx+r*(Math.cos(deg*Math.PI/180)),
			y = cy+r*(Math.sin(deg*Math.PI/180));
				
			path = 'M'+cx+','+cy+' L'+px+','+py+' A'+r+','+r+',0,'+largeArc+',1,'+x+','+y;
			px = x; py = y;
			console.log(tempvar)
			var g = document.createElementNS(xmlns, 'g'),
			partial = document.createElementNS(xmlns, 'path');
			partial.setAttribute("d",path);
			partial.setAttribute("data-value",tempvar);
			partial.setAttribute("class","tooltip");
			partial.style.stroke = "#fff";
			partial.style.strokeWidth = "1px";
			partial.style.fill = colors[i];
			g.appendChild(partial)
			svg.appendChild(g);
		}
		
	}
	

	var svg = $('.pie-chart');
	$('path',svg).on('mouseenter', function(e){
		removePath();
		var el = this.cloneNode(true),
			arcpath = el.getAttribute("d").split(' L');
			
		arcpath = 'M'+arcpath[1];
		el.setAttribute("d",arcpath);
		el.style.stroke = el.style.fill;
		el.setAttribute("id",'hoverpath');
		el.style.strokeWidth = "15px";
		el.style.strokeOpacity = .5
		this.parentNode.appendChild(el);
	});
	svg.on('mouseleave', function(){
		removePath()
	});
	function removePath(){
		var removePath = document.getElementById('hoverpath');
		if(removePath)removePath.parentNode.removeChild(removePath);
		return false;
	}
	/*$('.tooltip').on('click',function(e){
		var x = e.clientX,
			y = e.clientY;
			$('.tooltipWrap .toolBody').css({
				'left':x+'px',
				'top':y+'px'
			});
			$('.tooltipWrap').fadeIn();
	})
	$('.tooltipWrap').click(function(){$(this).fadeOut()});*/
	var obj = [
		{'year':2015, qdata:[1200, 2800, 3400, 500]},
		{'year':2014, qdata:[2200, 3800, 1400, 1500]},
		{'year':2013, qdata:[2800, 1000, 1700, 3000]},
		{'year':2012, qdata:[3200, 1800, 2000, 2000]}
	]
		
	
	plotLine(obj)
	function plotLine(data){
		var svgHeight = $('#line-chart').height();
		var maxVal = 5000,// maximum value of scale
			maxhValue = svgHeight-46;// height of graph area
			
			//calculating the graph values
			for(var j=0;j<data.length;j++){
				var points = '';
				for(var i =0; i<data[j].qdata.length; i++){
					var val = data[j].qdata[i];
					var percent = ((val/maxVal)*100),
					invPer = 100-percent,
					hValue = ((invPer/100)*maxhValue),
					cx = ((i+1)*(100))+50,
					cy = hValue+31;
					points+=cx+','+cy+' '
					var gPoint = document.createElementNS(xmlns, 'g'),
					partial = document.createElementNS(xmlns, 'circle');
					partial.setAttribute("cx",cx);
					partial.setAttribute("cy",cy);
					partial.setAttribute("r",'4');
					partial.setAttribute("class","tooltip");
					partial.style.fill = yellow[j];
					gPoint.appendChild(partial)
					document.getElementById('line-chart').appendChild(gPoint);
				}
				var gLine = document.createElementNS(xmlns, 'g'),
					polyine = document.createElementNS(xmlns, 'polyline');
					polyine.setAttribute("points",points);
					polyine.style.stroke = yellow[j];
					polyine.style.fill = 'none';
					polyine.style.strokeWidth = 3;
					gLine.appendChild(polyine);
					document.getElementById('line-chart').appendChild(gLine);
			}
		
	}
	$('circle','#line-chart').on('mouseenter', function(e){
		removePath();
		var el = this.cloneNode(true);
		el.style.stroke = el.style.fill;
		el.setAttribute("id",'hoverpath');
		el.style.strokeWidth = "5px";
		el.style.strokeOpacity = .5
		this.parentNode.appendChild(el);
	});
	$('#line-chart').on('mouseleave', function(){
		removePath()
	});
});