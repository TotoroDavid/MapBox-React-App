// Generated by https://quicktype.io

export interface PlacesResponse {
    type: string;
    query: string[];
    features: Feature[];
    attribution: string;
}

export interface Feature {
    id: string;
    type: string;
    place_type: string[];
    relevance: number;
    properties: Properties;
    text_en: string;
    place_name_en: string;
    text: string;
    place_name: string;
    text_es: string;
    place_name_es: string;
    bbox?: number[];
    center: number[];
    geometry: Geometry;
    context: Context[];
}

export interface Context {
    id: string;
    short_code?: ShortCode;
    wikidata?: string;
    text_en: string;
    language_en?: Language;
    text: string;
    language?: Language;
    text_es: string;
    language_es?: LanguageEs;
}

export enum Language {
    En = "en",
}

export enum LanguageEs {
    Es = "es",
}

export enum ShortCode {
    Co = "co",
    CoAnt = "CO-ANT",
    CoHui = "CO-HUI",
}

export interface Geometry {
    type: string;
    coordinates: number[];
}

export interface Properties {
    accuracy?: string;
    "override:postcode"?: string;
}
