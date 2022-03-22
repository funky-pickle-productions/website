import config from '../tailwind.config.js'
import {randomArray} from './helpers'
let c = config.theme.colors
let colors = [c.pink,c.lime,c.green]
let index = 0

export default{
  css:false,
  beforeLeave(el){
    gsap.set('#cover',{y:'100%',display: 'block',background:colors[index]})
    index = index == colors.length - 1 ? 0 : index + 1
  },
  leave(el,done){
    gsap.to('#cover',.75,{y:0,ease:'expo.inOut',onComplete:done})
  },
  enter(el,done){

    gsap.timeline({delay:.1,onComplete:ScrollTrigger.refresh})
        .to('#cover',.75,{y:'-100%',ease:'expo.inOut',onComplete:done})
        .from(el,1,{y:-100,ease:'power2.out'},'<')
        .set([el,'#cover'],{clearProps:'all'})

  }
}
