const t=document.querySelectorAll(".slide"),e=document.querySelector(".slider__btn--left"),s=document.querySelector(".slider__btn--right"),n=document.querySelector(".dots"),o=[];let r=0;const a=function(e){r-=e,o.forEach(t=>t.classList.remove("dots__dot--active")),o[r].classList.add("dots__dot--active"),t.forEach(t=>t.style.transform=`translateX(${100*e+Number.parseInt(t.style.transform.slice(11),10)}%)`)};t.forEach((t,e)=>t.style.transform=`translateX(${100*e-0}%)`);const c=function(){0===Number.parseInt(t[0].style.transform.slice(11),10)?a(-((t.length-1)*1)):a(1)};e.addEventListener("click",c);const d=function(){0===Number.parseInt(t[t.length-1].style.transform.slice(11),10)?a(t.length-1):a(-1)};s.addEventListener("click",d),document.addEventListener("keydown",function(t){console.log(t),"ArrowLeft"===t.key?c():"ArrowRight"===t.key&&d()}),t.forEach((t,e)=>{let s=document.createElement("button");s.classList.add("dots__dot"),s.setAttribute("data-slide",e),n.append(s),o.push(s)}),o[0].classList.add("dots__dot--active"),n.addEventListener("click",function(t){t.target.classList.contains("dots__dot")&&(a(-1*(t.target.dataset.slide-r)),r=t.target.dataset.slide)});
//# sourceMappingURL=main.70bbae4e.js.map
