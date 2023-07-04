import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, } from '@angular/forms';

declare var google: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  @ViewChild('mapContainer', { static: false })
  mapContainer!: ElementRef;
  city: string = "";
  showDetails: boolean = false

  userData!: string;

  newLoc: { name: string, location: { lat: number, lng: number } } = { location: { lat: 0, lng: 0 }, name: "" }
  defaultLocations: { name: string, location: google.maps.LatLngLiteral }[] = [
    { name: 'gurugram', location: { lat: 28.4595, lng: 77.0266 } },
    { name: 'Noida', location: { lat: 28.5355, lng: 77.3910 } },

  ];
  infoForm !: FormGroup
  tooltip: any;
  constructor(private fb: FormBuilder) {
    this.infoForm = this.fb.group({
      city: new FormControl('', [Validators.required]),
      lat: new FormControl('', [Validators.required]),
      lng: new FormControl('', [Validators.required]),
      tooltip: new FormControl('', [Validators.required])
    })
  }



  ngOnInit(): void {
    this.mapLocation();
  }

  mapLocation() {
    const mapOptions: google.maps.MapOptions = {
      center: this.defaultLocations[0].location,
      zoom: 6
    };

    const map = new google.maps.Map(document.getElementById('map'), mapOptions);

    this.defaultLocations.forEach(location => {
      new google.maps.Marker({
        position: location.location,
        positions: location.location,
        map,
        title: location.name
      });
    })
  }



  opened = true;
  displayPosition: boolean | undefined;
  position!: string;
  visible!: boolean;


  latitude!: number;
  longitude!: number;

  formData = {
    name: '',
    latitude: '',
    longitude: '',
    Tooltip: ''
  };

  data: { label: string, value: string }[] = [];

  submitted = false;

  submitForm() {
    this.data.push({ label: 'name', value: this.formData.name });
    this.data.push({ label: 'latitude', value: this.formData.latitude });
    this.data.push({ label: 'longitude', value: this.formData.longitude });
    this.data.push({ label: 'Tooltip', value: this.formData.Tooltip });
    this.submitted = true;
  }

  center: google.maps.LatLngLiteral = { lat: 24, lng: 12 };
  zoom = 4;
  display: google.maps.LatLngLiteral | undefined;

  //mapEvents
  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng != null)
      this.center = (event.latLng.toJSON());
  }

  move(event: google.maps.MapMouseEvent) {
    if (event.latLng != null)
      this.display = event.latLng.toJSON();
  }

  markerOptions: google.maps.MarkerOptions = { draggable: false };
  markerPositions: google.maps.LatLngLiteral[] = [];

  addMarker(event: google.maps.MapMouseEvent) {
    if (event.latLng != null)
      this.markerPositions.push(event.latLng.toJSON());
  }

  showDialog(position: string) {
    this.position = position;
    this.visible = true;
  }

  showLocation(x: number, y: number) {
    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 8
    });

    //map marker

    const marker = new google.maps.Marker({
      position: { lat: this.latitude, lng: this.longitude },
      map: map,
      title: 'Location'
    });
  }
  //location submission
  public submitValues() {
    console.log(this.infoForm);
    console.log(this.infoForm.value);

    this.city = this.infoForm.get('city')?.value;
    this.latitude = this.infoForm.get('lat')?.value;
    this.longitude = this.infoForm.get('lng')?.value;
    this.tooltip = this.infoForm.get('tooltip')?.value;

    this.infoForm.reset()
    this.visible = false;
    this.showDetails = true
    this.newLoc = {
      name: this.city,
      location: { lat: this.latitude, lng: this.longitude }
    }
    this.defaultLocations.push(this.newLoc)
    console.log(this.defaultLocations);
    this.showLocation(this.latitude, this.longitude)
    this.mapLocation();

  }

  onCloseDailog() {
    this.visible = false;
  }


}
