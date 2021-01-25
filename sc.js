const log = console.log;
const sections = document.querySelectorAll('.row');
const sectionsArr = Array.from(sections);

const navItems = document.querySelectorAll('nav li');
function activateNavByIndex(index) {
  if (sections[index].classList.contains('active'))
     return;

  const currentActive = document.querySelectorAll('nav .active');
  for (let i = currentActive.length - 1; i >= 0; i--) {
    currentActive[i].classList.remove('active');
  }
  navItems[index].classList.add('active');
}

const intersectionCallback = (entries, observer) => {
  if (entries[0].intesectionRatio <= 0) return;
  if (entries[0].intersectionRatio > 0.1) {
		log('a', entries[0].intersectionRatio)
		activateNavByIndex(sectionsArr.indexOf(entries[0].target))
  }
};

const intersectionOptions = {
	root: null,
  threshold: 1,
  rootMargin: '0px'
};

const intersectionObserver = new IntersectionObserver(intersectionCallback, intersectionOptions);

for (let i = 0; i < sections.length; i++) {
  intersectionObserver.observe(sections[i]);  
}
