export interface PlaceLocation {
    lat: number;
    lng: number;
}

export interface PlaceNortheast {
    lat: number;
    lng: number;
}

export interface PlaceSouthwest {
    lat: number;
    lng: number;
}

export interface PlaceViewport {
    northeast: PlaceNortheast;
    southwest: PlaceSouthwest;
}

export interface PlaceGeometry {
    location: PlaceLocation;
    viewport: PlaceViewport;
}

export interface PlacePhoto {
    height: number;
    html_attributions: string[];
    photo_reference: string;
    width: number;
}

export interface PlaceResult {
    formatted_address: string;
    geometry: PlaceGeometry;
    icon: string;
    icon_background_color: string;
    icon_mask_base_uri: string;
    name: string;
    photos: PlacePhoto[];
    place_id: string;
    reference: string;
    types: string[];
}

export interface PlaceResponse {
    results: PlaceResult[];
    status: string;
}

