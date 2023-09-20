const svgs = document.querySelectorAll(".js-svg");
svgs.forEach( svg => {
  const icon = svg.dataset.icon;
  svg.innerHTML = svgCode[ icon ];
})

if( document.querySelector(".tutorialsSlider") ) {
  const tutorialsSliderNext = document.querySelector(".tutorialsSlider__next");
  const tutorialsSliderPrev = document.querySelector(".tutorialsSlider__prev");

  let tutorialsSliderPosition = 0;

  const changeTutorialsSlider = ( step ) => {
    tutorialsSliderPosition = tutorialsSliderPosition + step;

    const activeTutorials = document.querySelectorAll(".tutorialsThumbnail.is-active");

    if( step === -1 ) {
      tutorialsSliderNext.classList.remove("is-inactive");
      activeTutorials[1].classList.remove("is-active");
      activeTutorials[0].parentElement.previousElementSibling.querySelector(".tutorialsThumbnail").classList.add("is-active");

      if( !activeTutorials[0].parentElement.previousElementSibling.previousElementSibling ) tutorialsSliderPrev.classList.add("is-inactive");
    }
    else if( step === 1 ) {
      tutorialsSliderPrev.classList.remove("is-inactive");

      activeTutorials[0].classList.remove("is-active");
      activeTutorials[1].parentElement.nextElementSibling.querySelector(".tutorialsThumbnail").classList.add("is-active");

      if( !activeTutorials[1].parentElement.nextElementSibling.nextElementSibling ) tutorialsSliderNext.classList.add("is-inactive");
    }
    
    document.querySelectorAll(".tutorialsSlider__item").forEach(item => {
      item.style.transform = `translateX(calc(-${100 * tutorialsSliderPosition}% - ${20 * tutorialsSliderPosition}px))`;
    });

    document.querySelectorAll(".tutorialsSlider__dotNavItem").forEach( (dotItem, key) => {
      dotItem.classList.remove("is-active");
      if( key === tutorialsSliderPosition ) {
        dotItem.classList.add("is-active");
      }
    })
  }

  const changeTutorialsSliderMobile = ( index ) => {
    const tutorialsSliderItems = document.querySelectorAll(".tutorialsSlider__item");
    const tutorialsSliderList = document.querySelector(".tutorialsSlider__list");
    tutorialsSliderItems.forEach( (item, key) => {
      if(key === index) item.querySelector(".tutorialsThumbnail").classList.add("is-visible")
      else item.querySelector(".tutorialsThumbnail").classList.remove("is-visible")
    })
    tutorialsSliderList.style.transform = `translateX(calc(-${100 * index}% - ${20 * index}px))`;
  }

  tutorialsSliderNext.addEventListener("click", () => changeTutorialsSlider(1));
  tutorialsSliderPrev.addEventListener("click", () => changeTutorialsSlider(-1))

  const tutorialsSliderItems = document.querySelectorAll(".tutorialsSlider__item");
  tutorialsSliderItems[0].querySelector(".tutorialsThumbnail").classList.add("is-visible");
  let tutorialsSliderDots = '';
  tutorialsSliderItems.forEach( (item, key) => {
    tutorialsSliderDots += `<li class="tutorialsSlider__dotNavItem${ key === 0 ? " is-active" : "" }"></li>`;
  });
  const dotNav = document.createElement("ul");
  dotNav.classList.add("tutorialsSlider__dotNav");
  dotNav.innerHTML = tutorialsSliderDots;

  document.querySelector(".tutorialsSlider__wrapper").appendChild( dotNav );

  const dots = document.querySelectorAll(".tutorialsSlider__dotNavItem");
  dots.forEach( (dot, key) => {
    dot.addEventListener("click", (e) => {
      const el = e.currentTarget;
      if( el.classList.contains("is-active") ) return false;
      dots.forEach( (item, index) => {
        if( index != key ) item.classList.remove("is-active")
        else item.classList.add("is-active");
      })
      changeTutorialsSliderMobile( key );
    })
  } )

  const tutorialsSliderSwipeArea = document.querySelector(".tutorialsSlider__list");

  let touchStartX = 0;
  let touchStartY = 0;
  let touchEndX = 0;
  let touchEndY = 0;

  const handleGesture = () => {
    if( window.outerWidth < 768 && !document.querySelector("html").classList.contains("hover") ) {
      const deltaX = touchStartX - touchEndX;
      const deltaY = touchStartY - touchEndY;

      if( Math.abs(deltaX) > Math.abs(deltaY) ) {
        const activeDot = document.querySelector(".tutorialsSlider__dotNavItem.is-active");
        if( deltaX > 30 ) {
          if( activeDot.nextElementSibling ) activeDot.nextElementSibling.click();
        }
        if( deltaX < -30 ){
          if( activeDot.previousElementSibling ) activeDot.previousElementSibling.click();
        }
      }
    }
  }

  tutorialsSliderSwipeArea.addEventListener('touchstart', function(event) {
    touchStartX = event.changedTouches[0].screenX;
    touchStartY = event.changedTouches[0].screenY;
  }, false);

  tutorialsSliderSwipeArea.addEventListener('touchmove', function(event) {
    let xMovement = Math.abs(event.touches[0].screenX - touchStartX);
    let yMovement = Math.abs(event.touches[0].screenY - touchStartY);

    if ((xMovement * 3) > yMovement) {
      event.preventDefault();
    }
  })

  tutorialsSliderSwipeArea.addEventListener('touchend', function(event) {
    touchEndX = event.changedTouches[0].screenX;
    touchEndY = event.changedTouches[0].screenY;
    handleGesture();
  }, false);
}

if( document.querySelector(".tutorialsVideo") ) {
  // Add videoplayer to the page
  const videoWrapper = document.querySelector(".tutorialsVideo__videoContent");
  const youtube = videoWrapper.dataset.youtubeLink;

  if( youtube !== "" && youtube !== undefined ) {
    const youtubeLink = youtube.replace('https://youtu.be/', '');

    const video = `<iframe class="video-block__frame" src="https://www.youtube.com/embed/${ youtubeLink }?showinfo=0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;

    videoWrapper.innerHTML = video;
  }

  // Switch tabs Overview/Trancript
  const tabsLinks = document.querySelectorAll(".tutorialsVideo__tabsNavItem");
  const tabsContent = document.querySelectorAll(".tutorialsVideo__tabsItem");

  tabsLinks.forEach( link => {
    link.addEventListener("click", (e) => {
      const el = e.currentTarget;
      const openTab = el.dataset.tab;

      if( el.classList.contains("is-active") ) return false;

      tabsLinks.forEach( link => {
        link.classList.remove("is-active");
      });
      el.classList.add("is-active");

      tabsContent.forEach( tab => {
        tab.classList.remove("is-active");
        if( tab.dataset.tab === openTab ) tab.classList.add("is-active");
      })
    })
  })
}

// Share menu
if( document.querySelector(".shareBlock") ) {
  const copyLink = document.querySelector(".shareBlock__link.is-copy");

  copyLink.addEventListener("click", (e) => {
    e.preventDefault();

    const link = copyLink.dataset.link;

    navigator.clipboard.writeText(link);
  })
}

// Get comments count
if( document.querySelector(".js-comments-count") ) {
  const commentCountElement = document.querySelector(".js-comments-count");
  const link = commentCountElement.parentElement.parentElement.href;
  const topicID = link.split("&")[1].replace("t=", "");
  
  fetch(`/community/styles/pixelmator/template/getCommentCountByTopic.php
  `, {
    method: "POST",
    headers: {'Content-Type':'application/x-www-form-urlencoded'},
    body: `topic_id=${ topicID }`
  })
    .then( response => {
      let commentsCount = 0;
      if( response.status === 200 ) {
        response.json().then( data => {
          commentsCount = data - 1;
          commentCountElement.textContent = commentsCount;
        })
      }
      
      commentCountElement.textContent = commentsCount;
    })
}

// Color Codex Hightlight
if( document.querySelector(".color-label") ) {
  const colorLabels = document.querySelectorAll(".color-label");
  colorLabels.forEach( label => {
    const colorLabelText = label.innerText;
    const colorBlock = `<span class="color-label__label" style="background-color: ${colorLabelText};"></span>${colorLabelText}`;
    label.innerHTML = colorBlock;
  })
}

if( document.querySelector(".tutorialsBrowser") ) {
  const browser = document.querySelector(".tutorialsBrowser");
  const categoryLink = browser.querySelectorAll(".tutorialsBrowser__categoriesLink");
  const thumbnails = browser.querySelectorAll(".tutorialsThumbnail");
  const categoriesList = browser.querySelector(".tutorialsBrowser__categoriesList");

  categoryLink.forEach( link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      const el = e.currentTarget;
      if( el.parentElement.classList.contains("is-active") ) return false;

      categoryLink.forEach( cat => {
        cat.parentElement.classList.remove("is-active");
      });
      el.parentElement.classList.add("is-active");

      const category = el.dataset.category;
      const activeTutorials = allTutoriasObject.filter( tutorial => tutorial.categories.indexOf(category) >= 0 );

      if( browser.querySelector(".tutorialsBrowser__mainCategoryOther") ) browser.querySelector(".tutorialsBrowser__mainCategoryOther").remove();
      browser.querySelector(".tutorialsBrowser__mainCategoryList").innerHTML = "";
      console.log(activeTutorials.length);
      if( activeTutorials.length > 9 ) {
        browser.querySelector(".tutorialsBrowser__mainCategoryMore").classList.remove("is-inactive");
      } else {
        browser.querySelector(".tutorialsBrowser__mainCategoryMore").classList.add("is-inactive");
      }
      browser.querySelector(".tutorialsBrowser__mainCategoryMoreBtn").classList.remove("is-opened");
      browser.querySelector(".tutorialsBrowser__mainCategoryMoreBtn").querySelector(".is-action").innerText = browser.querySelector(".tutorialsBrowser__mainCategoryMoreBtn").dataset.more;

      let activeTutorialsMarkUp = '';
      activeTutorials.forEach((tutorial, key) => {
        let typeLabel = "";
        if( tutorial.type === "video" && tutorial.duration.length > 0 )  {
          typeLabel = tutorial.duration;
        } else {
          typeLabel = tutorial.type.charAt(0).toUpperCase() + tutorial.type.slice(1);
        }
        const typeName = tutorial.type.charAt(0).toUpperCase() + tutorial.type.slice(1);
        activeTutorialsMarkUp += 
        `
        <div class="tutorialsBrowser__mainItem ${key >= 9 ? "is-more" : ""}">
          <div class="tutorialsThumbnail is-small" data-categories="${tutorial.categories}">
            <a href="${tutorial.link}" class="tutorialsThumbnail__link">
              <picture class="tutorialsThumbnail__artwork">
                <img src="${tutorial.artwork["1x"]}" srcset="${tutorial.artwork["2x"]} 2x" class="tutorialsThumbnail__image">
                <p class="tutorialsThumbnail__type"><span class="js-svg" data-icon="tutorialType${typeName}"></span>${typeLabel}</p>
              </picture>
              <div class="tutorialsThumbnail__info">
                <h3 class="tutorialsThumbnail__title">${tutorial.title}</h3>
                <p class="tutorialsThumbnail__description">${tutorial.description}</p>
                <p class="tutorialsThumbnail__type is-mobile"><span class="js-svg" data-icon="tutorialType${typeName}"></span>${typeLabel}</p>
              </div>
            </a>
          </div>
        </div>
        `;
      })
      browser.querySelector(".tutorialsBrowser__mainCategoryList").innerHTML = activeTutorialsMarkUp;
      const svgs = browser.querySelector(".tutorialsBrowser__mainCategoryList").querySelectorAll(".js-svg");
      svgs.forEach( svg => {
        const icon = svg.dataset.icon;
        svg.innerHTML = svgCode[ icon ];
      })
      const tutorialsPositionTop = document.querySelector(".tutorialsBrowser__mainCategoryList").offsetTop;
      window.scrollTo(0, tutorialsPositionTop - 82);
    })
  })

  const firstCategory = browser.querySelector(`.tutorialsBrowser__categoriesItem.is-first`).dataset.category;
  browser
    .querySelector(`.tutorialsBrowser__categoriesItem[data-category="${firstCategory}"]`)
    .classList.add("is-active");

  const navArrows = browser.querySelectorAll(`.tutorialsBrowser__categoriesNavArrow`);
  navArrows.forEach( arrow => {
    arrow.addEventListener("click", (e) => {
      const el = e.currentTarget;
      const direction = el.dataset.direction;

      const currentScrollX = categoriesList.scrollLeft;
      let delta;
      if( direction === "next" ) delta = currentScrollX + (window.outerWidth - 40)
      else if( direction === "prev" ) delta = currentScrollX - (window.outerWidth - 40)

      categoriesList.scrollTo( delta, 0 );
    })
  })
  categoriesList.addEventListener("scroll", () => {
    if( categoriesList.scrollLeft > 20 ) {
      browser.querySelector(`.tutorialsBrowser__categoriesNavArrow[data-direction="prev"]`).classList.remove("is-inactive");
    } else if( categoriesList.scrollLeft <= 20 ) {
      browser.querySelector(`.tutorialsBrowser__categoriesNavArrow[data-direction="prev"]`).classList.add("is-inactive");
    }
    if( categoriesList.scrollLeft > categoriesList.scrollWidth - (window.outerWidth - 40) - 20 ) {
      browser.querySelector(`.tutorialsBrowser__categoriesNavArrow[data-direction="next"]`).classList.add("is-inactive");
    } else if( categoriesList.scrollLeft <= categoriesList.scrollWidth - (window.outerWidth - 40) - 20 ) {
      browser.querySelector(`.tutorialsBrowser__categoriesNavArrow[data-direction="next"]`).classList.remove("is-inactive");
    }
  })
}

if( document.querySelector(".tutorialsVideo__suggestions") ) {
  const suggestions = document.querySelector(".tutorialsVideo__suggestions");
  const list = suggestions.querySelector(".tutorialsVideo__suggestionsList");
  const arrows = suggestions.querySelectorAll(".tutorialsVideo__suggestionsNavArrow");

  arrows.forEach( arrow => {
    arrow.addEventListener("click", (e) => {
      const el = e.currentTarget;
      const direction = el.dataset.direction;

      const currentScrollX = list.scrollLeft;
      let delta;
      if( direction === "next" ) delta = currentScrollX + (window.outerWidth - 40)
      else if( direction === "prev" ) delta = currentScrollX - (window.outerWidth - 40)

      list.scrollTo( delta, 0 );
    })
  })

  list.addEventListener("scroll", () => {
    if( list.scrollLeft > 20 ) {
      suggestions.querySelector(`.tutorialsVideo__suggestionsNavArrow[data-direction="prev"]`).classList.remove("is-inactive");
    } else if( list.scrollLeft <= 20 ) {
      suggestions.querySelector(`.tutorialsVideo__suggestionsNavArrow[data-direction="prev"]`).classList.add("is-inactive");
    }
    if( list.scrollLeft > list.scrollWidth - (window.outerWidth - 40) - 20 ) {
      suggestions.querySelector(`.tutorialsVideo__suggestionsNavArrow[data-direction="next"]`).classList.add("is-inactive");
    } else if( list.scrollLeft <= list.scrollWidth - (window.outerWidth - 40) - 20 ) {
      suggestions.querySelector(`.tutorialsVideo__suggestionsNavArrow[data-direction="next"]`).classList.remove("is-inactive");
    }
  })
}

const showMoreTutorials = document.querySelector(".tutorialsBrowser__mainCategoryMoreBtn");
if( showMoreTutorials ) {
  showMoreTutorials.addEventListener("click", (e) => {
    const btn = e.currentTarget;
    const more = btn.querySelector(".is-action");
    const tutorials = document.querySelector(".tutorialsBrowser__mainCategoryList").querySelectorAll(".tutorialsBrowser__mainItem");
    if( btn.classList.contains("is-opened") ) {
      btn.classList.remove("is-opened");
      more.innerText = btn.dataset.more;
      tutorials.forEach((tutorial, key) => {
        if( key >= 9 ) {
          tutorial.classList.add("is-invisible")
          tutorial.classList.add("is-more")
        }
      });

      const tutorialsPositionTop = document.querySelector(".tutorialsBrowser__inner").offsetTop;
      window.scrollTo({top: tutorialsPositionTop - 82});

    } else {
      btn.classList.add("is-opened");
      more.innerText = btn.dataset.less;
      tutorials.forEach(tutorial => {
        tutorial.classList.remove("is-more")
        tutorial.classList.remove("is-invisible")
      });
    }
  })
}
