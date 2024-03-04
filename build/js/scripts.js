// Мобильное меню бургер
function burgerMenu() {
  const burger = document.querySelector('.burger')
  const menu = document.querySelector('.menu')
  const body = document.querySelector('body')
  burger.addEventListener('click', () => {
    if (!menu.classList.contains('active')) {
      menu.classList.add('active')
      burger.classList.add('active-burger')
      body.classList.add('locked')
    } else {
      menu.classList.remove('active')
      burger.classList.remove('active-burger')
      body.classList.remove('locked')
    }
  })
	document.addEventListener('click', (e) => {
		const click = e.composedPath().includes(body);
		if ( !click ) {
			menu.classList.remove('active')
      burger.classList.remove('active-burger')
		}
	})
  // Вот тут мы ставим брейкпоинт навбара
  window.addEventListener('resize', () => {
    if (window.innerWidth > 991.98) {
      menu.classList.remove('active')
      burger.classList.remove('active-burger')
      body.classList.remove('locked')
    }
  })
}
burgerMenu()


// Вызываем эту функцию, если нам нужно зафиксировать меню при скролле.
function fixedNav() {
  const nav = document.querySelector('nav')

  // тут указываем в пикселях, сколько нужно проскроллить что бы наше меню стало фиксированным
  const breakpoint = 1
  if (window.scrollY >= breakpoint) {
    nav.classList.add('fixed__nav')
  } else {
    nav.classList.remove('fixed__nav')
  }
}
window.addEventListener('scroll', fixedNav)

window.addEventListener('DOMContentLoaded', () => {
	const swiper = new Swiper('.swiper', {
		// Optional parameters
		loop: true,
    spaceBetween: 10,
    direction: 'horizontal',
	
		// Navigation arrows
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
	});
})

document.addEventListener( 'DOMContentLoaded', function() {
  var splide = new Splide( '.splide', {
    perPage: 3,
    type: 'loop',
    gap: 50,
    perMove: 1,
    pagination: false,
    breakpoints: {
      1150: {
        perPage: 2,
        gap: 20
      },
      768: {
        perPage: 1,
        gap: 20
      }
    }
  } );
  splide.mount();
} );

function tabs(headerSelector, tabSelector, contentSelector, activeClass, display='flex') {
  const header = document.querySelector(headerSelector),
        tab = document.querySelectorAll(tabSelector),
        content = document.querySelectorAll(contentSelector)
  function hideTabContent() {
      content.forEach(item => {
          item.style.display = 'none'
      });
      tab.forEach(item => {
          item.classList.remove(activeClass)
      });
  }
  function showTabContent(i = 0) {
     content[i].style.display = display
     tab[i].classList.add(activeClass)
  }
  hideTabContent()
  showTabContent()
  header.addEventListener('click', e => {
      const target = e.target
      if (target.classList.contains(tabSelector.replace(/\./, '')) || 
      target.parentNode.classList.contains(tabSelector.replace(/\./, ''))) {
          tab.forEach((item, i) => {
              if ( target == item || target.parentNode == item ) {
                  hideTabContent()
                  showTabContent(i)
              }
          });
      }
  })
}

tabs( '.tabs__header' ,'.tabs__header-item', '.tabs__content-item', 'active')

function accordion() {
  const items = document.querySelectorAll('.accordion__item-trigger')
  items.forEach(item => {
      item.addEventListener('click', () => {
          const parent = item.parentNode
          if (parent.classList.contains('accordion__item-active')) {
              parent.classList.remove('accordion__item-active')
          } else {
              document
                  .querySelectorAll('.accordion__item')
                  .forEach(child => child.classList.remove('accordion__item-active'))   
              parent.classList.add('accordion__item-active')
          }
      })
  })
}
accordion()
$(document).ready(function() {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  updateCartCount();
  $('.addcart').on('click', function() {
      const name = $(this).data('name');
      const package = $(this).data('package');
      const price = $(this).data('price');
      // Check if the product is already in the cart
      const existingProduct = cart.find(item => item.name === name && item.package === package);
      
      if (existingProduct) {
          existingProduct.quantity += 1;
      } else {
          cart.push({ name: name, package: package, price: price, quantity: 1 });
      }
      // Save updated cart data to local storage
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartCount();
  });
  function updateCartCount() {
      const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
      $('.cart__count').text(totalQuantity);
  }
});
const smoothLinks = document.querySelectorAll('a[href^="#"]');
for (let smoothLink of smoothLinks) {
    smoothLink.addEventListener('click', function (e) {
        e.preventDefault();
        const id = smoothLink.getAttribute('href');

        document.querySelector(id).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
};
function startCountdownTimer(target, hours, minutes, seconds) {
  const timerElement = document.getElementById(target);
  
  let totalSeconds = hours * 3600 + minutes * 60 + seconds;
  // Check if countdown time is stored in localStorage
  if(localStorage.getItem(target)) {
    totalSeconds = parseInt(localStorage.getItem(target));
  }
  const countdownInterval = setInterval(() => {
    if (totalSeconds <= 0) {
      clearInterval(countdownInterval);
    } else {
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
      const hoursDisplay = hours < 10 ? `0${hours}` : hours;
      const minutesDisplay = minutes < 10 ? `0${minutes}` : minutes;
      const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
      timerElement.textContent = `${hoursDisplay}:${minutesDisplay}:${secondsDisplay}`;
      // Store countdown time in localStorage
      localStorage.setItem(target, totalSeconds);
      totalSeconds--;
    }
  }, 1000);
}
// Call the function for each timer you want to add
startCountdownTimer('timer1', 23, 59, 59);
startCountdownTimer('timer2', 23, 59, 59);
startCountdownTimer('timer3', 23, 59, 59);