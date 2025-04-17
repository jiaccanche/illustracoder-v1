import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ApiService } from '../../services/api.service';
import Swal from 'sweetalert2';
import Swiper from 'swiper';
import { Autoplay } from 'swiper/modules';
import Typed from 'typed.js';
import * as AOS from 'aos';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit{

  constructor(private api: ApiService){}

  ngOnInit(){
    const swiper = new Swiper('.swiper', {
      slidesPerView: 3,
      spaceBetween: 50,
      loop: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      speed: 1000,
      modules: [Autoplay],
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 20
        },
        480: {
          slidesPerView: 2,
          spaceBetween: 20
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 50
        },
      }
    });

    const typed = new Typed('.illustracoder', {
      strings: ['illustracoder'],
      typeSpeed: 80,
      backSpeed: 80,
      fadeOut: true,
      loop: false,
      showCursor: false,
      onComplete: () => {
        this.showBrackets();
      }
    });

    AOS.init();
  }  

  sendContactForm(){
    let btnSendForm = document.getElementById('send-button') as HTMLButtonElement;
    btnSendForm.style.opacity = '0.5';
    btnSendForm.style.pointerEvents = 'none';

    if(1 == 1){
      Swal.fire({
        title: 'Information',
        text: 'You must fill in all fields to submit the form, please try again.',
        icon: 'info',
        confirmButtonText: 'Confirm'
      }).then(() => {
        btnSendForm.style.opacity = '1';
        btnSendForm.style.pointerEvents = 'initial';
      });
    }else{
      let data = {}
  
      this.api.postSendContactForm(data).subscribe({
        next: (result: any) => {
          if(result.hasOwnProperty('code')){
            if(result.code != 200){            
              Swal.fire({
                title: 'Error',
                text: 'An error occurred while sending your message, please try again.',
                icon: 'info',
                confirmButtonText: 'Confirm'
              }).then(() => {
                btnSendForm.style.opacity = '1';
                btnSendForm.style.pointerEvents = 'initial';
              });
            }else{
              Swal.fire({
                title: 'Success',
                text: 'Your message has been sent successfully, we will contact you soon.',
                icon: 'success',
                confirmButtonText: 'Confirm'
              }).then(() => {
                btnSendForm.style.opacity = '1';
                btnSendForm.style.pointerEvents = 'initial';
              });
            }
          }else{
            Swal.fire({
              title: 'Error',
              text: 'An error occurred while sending your message, please try again.',
              icon: 'info',
              confirmButtonText: 'Confirm'
            }).then(() => {
              btnSendForm.style.opacity = '1';
              btnSendForm.style.pointerEvents = 'initial';
            });
          }
        },
        error: (error: any) => {
          Swal.fire({
            title: 'Error',
            text: 'An error occurred while sending your message, please try again.',
            icon: 'info',
            confirmButtonText: 'Confirm'
          }).then(() => {
            btnSendForm.style.opacity = '1';
            btnSendForm.style.pointerEvents = 'initial';
          });
  
          console.log(error);
        }
      });
    }
  }

  showBrackets(){
    const brackets = document.querySelector('.brackets') as HTMLImageElement;
    const compose = document.querySelector('.compose') as HTMLImageElement;
    const booking = document.querySelector('#main .btn-booking') as HTMLImageElement;

    brackets.classList.add('show');

    setTimeout(() => {
      compose.classList.add('show');

      setTimeout(() => {
        booking.classList.add('show');
      }, 1000);
    }, 1000);
  }
}
