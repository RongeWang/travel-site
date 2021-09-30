import throttle from 'lodash/throttle'
import debounce from 'lodash/debounce'

class StickyHeader{

    constructor(){
        this.siteHeader = document.querySelector(".site-header");
        this.pageSections = document.querySelectorAll(".page-section");
        this.browserHeight = window.innerHeight;
        this.previousScrollY = window.scrollY;
        this.events();
    }

    events(){
        window.addEventListener("scroll",throttle(()=> this.runOnScroll(),200));
        window.addEventListener("resize", debounce(()=>{
            console.log("resize just run")
            this.browserHeight = window.innerHeight},333))
    }
    
    runOnScroll(){
        this.determineScrollDirection();
        if(window.scrollY > 60){
            this.siteHeader.classList.add("site-header--dark");
        }
        else{
            this.siteHeader.classList.remove("site-header--dark");
        }

        this.pageSections.forEach(el => this.calcSection(el))
    }

    calcSection(el){
        if(window.scrollY+this.browserHeight> el.offsetTop && window.scrollY<el.offsetTop+el.offsetHeight){
               let scrollpersent = el.getBoundingClientRect().top/this.browserHeight*100;
               if(scrollpersent < 18 && scrollpersent>-0.1){
                    let matchinglink = el.getAttribute("data-matching-link")
                    document.querySelectorAll(`.primary-nav a:not(${matchinglink})`).forEach(el => el.classList.remove("is-current-link"))
                    document.querySelector(matchinglink).classList.add("is-current-link")
               }
        }
    }
    determineScrollDirection(){
        if(window.scrollY>this.previousScrollY){
            this.scrollDirection = 'down';

        }else{
            this.scrollDirection = 'up';
        }
        this.previousScrollY = window.scrollY;
    }
}

export default StickyHeader;