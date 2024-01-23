import { Component } from '@angular/core';
import { Application } from '@splinetool/runtime';
import { gsap, Power0 } from 'gsap';
import { ScrollTrigger } from 'gsap/all';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'p_06';
  isLoaded = false;

  ngOnInit(): void {
    document.body.style.overflow = 'hidden';

    const canvas = document.getElementById('canvas3d') as HTMLCanvasElement;
    const app = new Application(canvas);
    let screenwidth = window.innerWidth;
    let screenheight = window.innerHeight;

    app
      .load('https://prod.spline.design/coq17-Pv5eOqIKKa/scene.splinecode')
      .then(() => {
        let phone = app.findObjectByName('iPhone 14 Pro');
        let light = app.findObjectByName('Directional Light');
        gsap.registerPlugin(ScrollTrigger);
        gsap.registerPlugin();

        if (phone) {
          // console.log(phone);

          gsap.set(phone.rotation, { z: -0.15 });
          gsap.set(phone.scale, { x: 1, y: 1, z: 1 });
          
          if (screenwidth <= 627) { //Mobile
            gsap.set(phone.position, { x: 0, y: 50 });
          } else {
            gsap.set(phone.position, { x: 450, y: 0 });
          }

          // console.log('Screen Width: ' + screenwidth + ' Screen Height: ' + screenheight);
          // console.log('Width: ' + (screenwidth/10) + ' Height: ' + (screenheight/10));

          app.emitEvent('mouseUp', 'iPhone 14 Pro');

          let rotatePhone = gsap.to(phone.rotation, {
            y: 6.25,
            duration: 10,
            repeat: -1,
            ease: Power0.easeNone,
          });

          // PART 1 SECTION
          gsap.timeline({
              scrollTrigger: {
                trigger: '#part1',
                start: 'top bottom',
                end: 'bottom bottom',
                scrub: true,
                onEnter: () => {
                  rotatePhone.kill();
                  gsap.to(phone!.rotation, { z: 0.15, y: 3.5 });
                  if (screenwidth <= 627) {
                    gsap.to(phone!.scale, { x: .85, y: .85, z: .85 });
                  } else {
                    gsap.to(phone!.scale, { x: 1.25, y: 1.25, z: 1.25 });
                  }
                  
                  gsap.to(light!.position, { x: -1500000 });
                },
                onLeaveBack: () => {
                  rotatePhone = gsap.to(phone!.rotation, {
                    y: 9.55,
                    duration: 10,
                    repeat: -1,
                    ease: Power0.easeNone,
                  });

                  gsap.to(phone!.scale, { x: 1, y: 1, z: 1 });
                  gsap.to(phone!.rotation, { z: -0.15 });
                },
              },
            })
            .to(phone.position, { x: screenwidth <= 627 ? 0 : -400, y: 0 });

          // PART 2 SECTION
          gsap.timeline({
              scrollTrigger: {
                trigger: '#part2',
                start: screenwidth <= 627 ? 'top 60%' : 'top 75%',
                end: 'bottom bottom',
                scrub: true,
                onEnter: () => {
                  gsap.to(phone!.rotation, { z: -0.15, y: 2.494905 });
                  gsap.to(phone!.scale, { x: 1.3, y: 1.3, z: 1.3 });

                  gsap.to(light!.position, { x: 850000 });

                  app.emitEvent('mouseDown', 'iPhone 14 Pro');
                },
                onLeaveBack: () => {
                  gsap.to(phone!.rotation, { z: 0.15, y: 3.325 });
                  if (screenwidth <= 627) {
                    gsap.to(phone!.scale, { x: .85, y: .85, z: .85 });
                  } else {
                    gsap.to(phone!.scale, { x: 1.25, y: 1.25, z: 1.25 });
                  }

                  app.emitEvent('mouseUp', 'iPhone 14 Pro');
                },
              },
            })
            .to(phone.position, { x: screenwidth <= 627 ? -10 : 400, y: 0 });

          // PART 3 SECTION
          gsap.timeline({
              scrollTrigger: {
                trigger: '#part3',
                start: screenwidth <= 627 ? 'top 50%' : 'top 80%',
                end: 'bottom bottom',
                scrub: true,
                onEnter: () => {
                  gsap.to(phone!.rotation, { x: 0, z: 0 });
                  gsap.to(phone!.scale, { x: 1, y: 1, z: 1 });
                  
                  rotatePhone = gsap.to(phone!.rotation, {
                    y: 8.8,
                    duration: 5,
                    repeat: -1,
                    ease: Power0.easeNone,
                  });
                },
                onLeaveBack: () => {
                  rotatePhone.kill();

                  gsap.to(phone!.rotation, { z: -0.15, y: 2.494905 });
                  gsap.to(phone!.scale, { x: 1.3, y: 1.3, z: 1.3 });
                  gsap.to(phone!.position, { x: screenwidth <= 627 ? 0 : 400, y: 0 });
                },
              },
            })
            .to(phone.position, { x: 0, y: 0, z: 0 });

          // loader
          this.loaded();
        } else {
          console.error('Phone object not found.');
        }
      });
  }

  loaded(): void {
    this.isLoaded = true;
    document.body.style.overflow = 'auto';
  }
}
