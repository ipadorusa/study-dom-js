const marginInput = document.querySelector('[data-input="margin"]')
const thresholdInput = document.querySelector('[data-input="threshold"]')
const wrapper = document.querySelector('[data-wrapper]')
const boxes = [...document.querySelectorAll('[data-box]')]
const marginText = document.querySelector('[data-margin]')
const thresholdText = document.querySelector('[data-threshold]')
const info = document.querySelector('[data-info]')

const getOptions = () => {
	return {
		root: wrapper,
		rootMargin: `${marginInput.value}px`,
		threshold: parseFloat(thresholdInput.value)
	}
}

let elementsInView = []

const getInfo = () => {
	if (elementsInView.length) {
		return `<p>Element indexes in view: <span class="info__elements">${elementsInView.join(', ')}</span></p>`
	} else {
		return '<p>No elements in view</p>'
	}
}

const addElementToInfoBox = (target) => {
	if (!elementsInView.includes(target.dataset.box)) {
		elementsInView.push(target.dataset.box)
	}
	
	return info.innerHTML = getInfo()
}

const removeElementFromInfoBox = (target) => {
	elementsInView = elementsInView.filter(el => el !== target.dataset.box)
	
	return info.innerHTML = getInfo()
}

const setInViewStyles = (target) => {
	target.textContent = 'In view'
	target.classList.add('is-inview')
	addElementToInfoBox(target)
	// console.log('in view')
}

const setOutOfViewStyles = (target) => {
	target.textContent = ''
	target.classList.remove('is-inview')
	removeElementFromInfoBox(target)
	// console.log('out of view')
}

const onIntersect = (entries) => {
	entries.forEach(entry => {
		const { target, isIntersecting, intersectionRatio } = entry
		console.log(entry)
		
		if (intersectionRatio >= thresholdInput.value && isIntersecting) {
			return setInViewStyles(target)
		}
		
		return setOutOfViewStyles(target)
	})
}

const reinitObserver = (options) => {
	if (observer) {
		observer.disconnect()
	}
	
	setTimeout(() => {
		observer = new IntersectionObserver(onIntersect, options)
	
		boxes.forEach(el => {
			observer.observe(el)
		})
	}, 100)
}

const setMargin = (marginValue) => {
	const newValue = `${marginInput.value}px`
	document.body.style.setProperty('--b', marginValue)
	marginText.textContent = marginValue
}

const setThreshold = (thresholdValue) => {
	const tValue = `${thresholdValue * 100}%`
	thresholdText.textContent = thresholdValue
	document.body.style.setProperty('--t', tValue)
}

const onChangeThreshold = () => {
	const opts = getOptions()
	setThreshold(opts.threshold)
	reinitObserver(opts)
}

const onChangeMargin = () => {
	const opts = getOptions()
	setMargin(opts.rootMargin)
	reinitObserver(opts)
}

let observer = new IntersectionObserver(onIntersect, getOptions())

boxes.forEach(el => {
	observer.observe(el)
})

setMargin(getOptions().rootMargin)
setThreshold(getOptions().threshold)
marginInput.addEventListener('change', onChangeMargin)
thresholdInput.addEventListener('change', onChangeThreshold)

