import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-roomin',
  templateUrl: './roomin.html',
  styleUrls: ['./roomin.css'],
  standalone: true,
 imports: [CommonModule, FormsModule]
})
export class Roomin {
 listings = [
    {
      id: 1,
      city: 'Jagityal',
      type: '2BHK',
      title: '2BHK in Jagityal',
      location: 'Clock',
      price: 15000,
      images: [
        'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg',
        'https://cdn.pixabay.com/photo/2016/08/26/15/06/home-1622401_1280.jpg',
        'https://images.pexels.com/photos/8141959/pexels-photo-8141959.jpeg'
      ]
    },
     {
      id: 2,
      city: 'Metpally',
      type: '1BHK',
      title: '1BHK in Metpally',
      location: 'Market road',
      price: 1000,
      images: [
        'https://cdn.pixabay.com/photo/2016/08/26/15/06/home-1622401_1280.jpg',
      ]
    },
    {
      id: 2,
      city: 'Kortula',
      type: 'Studio',
      title: 'Studio in Kortula',
      location: 'Bustand Back Side',
      price: 1000,
      images: [
        'https://images.pexels.com/photos/8141959/pexels-photo-8141959.jpeg'
      ]
    }
  ];

  filteredListings = [...this.listings];
  currentListingImages: string[] = [];
  currentImageIndex = 0;
  selectedListing: any = null;

  filters = {
    city: '',
    type: '',
    minPrice: '',
    maxPrice: ''
  };

  logoutCallback?: () => void;

  handleLogout() {
    this.filteredListings = [...this.listings];
    this.selectedListing = null;
    if (this.logoutCallback) this.logoutCallback();
  }

  applyFilters() {
    const min = parseInt(this.filters.minPrice) || 0;
    const max = parseInt(this.filters.maxPrice) || Infinity;

    this.filteredListings = this.listings.filter(l =>
      (!this.filters.city || l.city === this.filters.city) &&
      (!this.filters.type || l.type === this.filters.type) &&
      l.price >= min && l.price <= max
    );
  }

  clearFilters() {
    this.filters = { city: '', type: '', minPrice: '', maxPrice: '' };
    this.filteredListings = [...this.listings];
  }

  showModal(listing: any) {
    this.selectedListing = listing;
    this.currentListingImages = listing.images || [];
    this.currentImageIndex = 0;
  }

  closeModal() {
    this.selectedListing = null;
  }

  prevImage() {
    if (this.currentListingImages.length > 0) {
      this.currentImageIndex = (this.currentImageIndex - 1 + this.currentListingImages.length) % this.currentListingImages.length;
    }
  }

  nextImage() {
    if (this.currentListingImages.length > 0) {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.currentListingImages.length;
    }
  }

  get currentImage(): string {
    return this.currentListingImages[this.currentImageIndex];
  }
}
