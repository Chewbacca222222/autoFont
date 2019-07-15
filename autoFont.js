// autoFont.js
// written by https://github.com/Chewbacca222222

var autoFontFill;
var autoFontResizeTimer;

function autoFontTextCalculator(itemList, parentWidths) {
	for (var i = 0; i < itemList.length; i ++) {
		itemList[i].style.fontSize = "1px";

		var tempWidth = itemList[i].getBoundingClientRect().width;
		var fontSize = parseFloat(window.getComputedStyle(itemList[i]).getPropertyValue('font-size').replace("px", ""));

		var ratioFit = tempWidth / parentWidths[i];
		var final = fontSize / ratioFit;

		if (itemList[i].dataset.autofontWidth) {
			var widthPercentage = parseFloat(itemList[i].dataset.autofontWidth);
			if (0 <= widthPercentage && widthPercentage <= 100) {
				final = final * (widthPercentage / 100);
			}
		}

		itemList[i].style.fontSize = String(final) + "px";

		var invalidateMinMax = false;
		var autofontMin = itemList[i].dataset.autofontMin;
		var autofontMax = itemList[i].dataset.autofontMax;

		if (autofontMin) {
			var autofontMin = parseFloat(autofontMin);
		}

		if (autofontMax) {
			var autofontMax = parseFloat(autofontMax);
		}

		if (autofontMin && autofontMax) {
			if (autofontMax < autofontMin) {
				invalidateMinMax = true;
			}
		}

		if (!invalidateMinMax) {
			if (autofontMin) {
				if (autofontMin > final) {
					itemList[i].classList.add("autoFontBreak");

					itemList[i].style.fontSize = itemList[i].dataset.autofontMin + "px";
				} else {
					itemList[i].classList.remove("autoFontBreak");
				}
			}

			if (autofontMax && autofontMax < final) {
				itemList[i].style.fontSize = itemList[i].dataset.autofontMax + "px";
			}
		}
	}
}

function autoFontParentCalculator(itemList) {
	var parentWidths = [];

	for (var i = 0; i < itemList.length; i ++) {
		parentWidths[parentWidths.length] = getRealWidth(itemList[i].parentElement);
	}

	return parentWidths;
}

function autoFontTextController(itemList) {
	var parentWidths;
	var passedWidth = false;

	parentWidths = autoFontParentCalculator(itemList);
	autoFontTextCalculator(itemList, parentWidths);

	for (var i = 0; i < itemList.length; i ++) {
		if (parentWidths[i] != getRealWidth(itemList[i].parentElement)) {
			passedWidth = true;
			break;
		}
	}

	if (passedWidth) {
		parentWidths = autoFontParentCalculator(itemList);
		autoFontTextCalculator(itemList, parentWidths);
	}
}

function getRealWidth(element) {
	var width = element.getBoundingClientRect().width;
	var pr = parseFloat(window.getComputedStyle(element).getPropertyValue("padding-right"));
	var pl = parseFloat(window.getComputedStyle(element).getPropertyValue("padding-left"));
	var br = parseFloat(window.getComputedStyle(element).getPropertyValue("border-right-width"));
	var bl = parseFloat(window.getComputedStyle(element).getPropertyValue("border-left-width"));

	return width - (pr + pl + br + bl);
}

function autoFontAppendStyles() {
	var autoFontStyles = document.createElement('style');
	autoFontStyles.innerHTML = ".autoFontFill{display:inline-block}.autoFontFill:not(.autoFontBreak){white-space:nowrap}"
	document.head.appendChild(autoFontStyles);
}

window.addEventListener('resize', function(event){
	clearTimeout(autoFontResizeTimer);
  	autoFontResizeTimer = setTimeout(function() {
  		autoFontTextController(autoFontFill); 
  	}, (typeof autoFontResizeRate == "number" ? autoFontResizeRate : 100));
});

window.addEventListener('DOMContentLoaded', (event) => {
	autoFontAppendStyles();
    autoFontFill = document.getElementsByClassName("autoFontFill");
    if (document.fonts) {
    	document.fonts.ready.then(function () {
			autoFontTextController(autoFontFill);
		});
    } else {
    	window.addEventListener('load', (event) => {
		    autoFontTextController(autoFontFill); 
		});
    }
});
