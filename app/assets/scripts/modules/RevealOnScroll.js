import  throttle  from "lodash/throttle";
import debounce from "lodash/debounce";
class RevealOnScroll {
    constructor(els,thresholdperc){
        this.thresholdPersent = thresholdperc;
        this.itemToReveal = els;
        this.browserHeight = window.innerHeight;
        this.hideInitally();
        this.scrollThrottle = throttle(this.calcaller, 200).bind(this);
        this.events();
    }

    events(){
        window.addEventListener("scroll", this.scrollThrottle);
        window.addEventListener("resize", debounce(()=>{
            console.log("resize just run")
            this.browserHeight = window.innerHeight},333))
    }
    calcaller(){
        var objcollection = this.itemToReveal;
        for(var i = 0; i < objcollection.length; i++){
            if (objcollection[i].isRevealed==false){
               if (window.scrollY+this.browserHeight > objcollection[i].offsetTop){
                    var objheight = objcollection[i].getBoundingClientRect().top;
                    //console.log(objElement);
                     let scrollpersent = (objheight/this.browserHeight) * 100

                     if (scrollpersent < this.thresholdPersent){
                        objcollection[i].classList.add("reveal-item--is-visible");
                         objcollection[i].isRevealed = true;
                        if(objcollection[i].islastitem==true){
                            window.removeEventListener("scroll", this.scrollThrottle)

                        }
               }

                }
            }
            
        }
    }

    calculateIfScrolledTo(element){
        var test = element.getBoundingClientRect().top
        console.log(test);
      
    }

    hideInitally(){
        this.itemToReveal.forEach(el=>{
            el.classList.add("reveal-item");
            el.isRevealed = false;
        });
        this.itemToReveal[this.itemToReveal.length-1].islastitem = true;
    }
    
}

export default RevealOnScroll;