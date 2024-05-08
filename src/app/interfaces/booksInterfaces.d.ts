export interface FirestoreUser {
  id: string;
  username: string;
  email: string;
  booklist: BookList;
  profilestats: {
    stats: [];
  };
}

export interface BookList {
  reading: UsableBooks[];
  dnf: UsableBooks[];
  read: UsableBooks[];
  tbr: UsableBooks[];
}

interface VolumeInfo {
  title: string;
  subtitle?: string;
  authors: string[];
  publisher: string;
  publishedDate: string;
  description: string;
  industryIdentifiers: {
    type: string;
    identifier: string;
  }[];
  pageCount: number;
  dimensions: {
    height: string;
    width: string;
    thickness: string;
  };
  printType: string;
  mainCategory: string;
  categories: string[];
  averageRating: number;
  ratingsCount: number;
  contentVersion: string;
  imageLinks: {
    smallThumbnail: string;
    thumbnail: string;
    small: string;
    medium: string;
    large: string;
    extraLarge: string;
  };
  language: string;
  infoLink: string;
  canonicalVolumeLink: string;
}

interface ListPrice {
  amount: number;
  currencyCode: string;
}

interface RetailPrice {
  amount: number;
  currencyCode: string;
}

interface SaleInfo {
  country: string;
  saleability: string;
  isEbook: boolean;
  listPrice: ListPrice;
  retailPrice: RetailPrice;
  buyLink: string;
}

interface Epub {
  isAvailable: boolean;
  acsTokenLink: string;
}

interface Pdf {
  isAvailable: boolean;
}

interface AccessInfo {
  country: string;
  viewability: string;
  embeddable: boolean;
  publicDomain: boolean;
  textToSpeechPermission: string;
  epub: Epub;
  pdf: Pdf;
  accessViewStatus: string;
}

export interface Volume {
  items: BookArrays[];
  kind: string;
  totalItems: number;
}

export interface BookArrays {
  kind: string;
  id: string;
  etag: string;
  selfLink: string;
  volumeInfo: VolumeInfo;
  saleInfo: SaleInfo;
  accessInfo: AccessInfo;
}

export interface UsableBooks {
  id: string;
  title: string;
  subtitle: string;
  authors: Array<string>;
  description: string;
  pageCount: number;
  publishedDate: string;
  categories: Array<string>;
  imageLink: string;
  pace: number;
  rating: number;
  comments: string;
  status: string;
  character_plot: number;
  tense_lighthearted: number;
  dark_light: number;
  informative_fun: number;
  adventurous_grounded: number;
  reflective_action: number;
  DNF_reason?: Array<string>;
  lastUpdated?: string;
}

export interface ReviewData {
  pace: number;
  rating: number;
  comments: string;
  status: string;
  character_plot: number;
  tense_lighthearted: number;
  dark_light: number;
  informative_fun: number;
  adventurous_grounded: number;
  reflective_action: number;
  DNF_reason?: Array<string>;
  lastUpdated?: string;
}
