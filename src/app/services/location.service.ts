import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { DataService } from './data.service';

declare var google;

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  constructor(public storage: StorageService, public ds: DataService) {}

  getLocaton(): Promise<any> {
    let that = this;
    return new Promise(resolve => {
      navigator.geolocation.getCurrentPosition(
        pos => {
          console.log(pos);
          let geocoder = new google.maps.Geocoder();
          let latlng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
          this.storage.setItem(
            'latlng',
            JSON.stringify({
              lat: pos.coords.latitude,
              lng: pos.coords.longitude
            })
          );
          geocoder.geocode({ latLng: latlng }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
              console.log(results[0]);
              let address = results[0].address_components;
              let country_code = '';
              for (let i = 0; i < address.length; i++) {
                if (address[i].types.indexOf('country') >= 0) {
                  country_code = address[i].short_name;
                }
              }
              let google_country = '';
              let default_country = '';
              that.ds.config.countryList.forEach(country => {
                if (country_code && country_code == country.code) {
                  google_country = country;
                }
                if (that.ds.config.country == country.name) {
                  default_country = country;
                }
              });
              console.log('country: ', google_country, default_country);
              if (!google_country) {
                google_country = default_country;
              }
              that.storage.setItem('country', JSON.stringify(google_country));

              let fAddress = results[0].formatted_address;
              let suburbs = '';
              if (fAddress) {
                suburbs = that.ds.config.suburbs.split(',').find((item: string) => {
                  return fAddress.match(new RegExp(item.trim(), 'i'));
                });
                if (suburbs && suburbs !== undefined) {
                  suburbs = suburbs.trim();
                  that.storage.setItem('suburbs', suburbs);
                }
              }
              resolve(suburbs);
            }
          });
        },
        errorObj => {
          console.log(errorObj);
          console.log('Location err: ' + JSON.stringify(errorObj));
          resolve(false);
        },
        { maximumAge: 5000, timeout: 30000, enableHighAccuracy: true }
      );
    });
  }
}
