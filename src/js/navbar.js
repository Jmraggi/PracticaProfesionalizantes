

const panels = document.querySelectorAll('.panel');

function toggleOpen() {
  this.classList.toggle('open');
}

function toggleActive(e) {
  console.log(e.propertyName);
  if(e.propertyName.includes('flex')) {
   this.classList.toggle('open-active'); 
 }
}

panels.forEach(panel => panel.addEventListener('click', toggleOpen));
panels.forEach(panel => panel.addEventListener('transitionend', toggleActive));


$(function(){
	$('.box-menu .wrapper').on('click', function(){
		$('.box-menu').toggleClass('full-menu');
		$('.hamburger').toggleClass('active');
	});
	$('a').on('click', function(){
		$(this).siblings('a').removeClass('active');
		$(this).addClass('active');
	});
});