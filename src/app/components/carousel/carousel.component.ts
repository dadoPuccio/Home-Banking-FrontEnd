import { Component, OnInit, OnDestroy, Input } from '@angular/core';

interface carouselImage {
  imageSrc: string;
  imageAlt: string;
}

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  @Input() images: carouselImage[] = []
  @Input() slideInterval = 5000;

  selectedIndex = 0;
  id = 0;

  ngOnInit(): void {
    this.autoSlide();
  }

  ngOnDestroy() {
    if (this.id) {
      clearInterval(this.id);
    }
  }

  autoSlide(): void {
    this.id = window.setInterval(() => {
      if(this.selectedIndex == this.images.length - 1){
        this.selectedIndex = 0;
      } else {
        this.selectedIndex++;
      }
    }, this.slideInterval);
  }

  selectImage(index: number): void {
    this.selectedIndex = index;
  }

}
