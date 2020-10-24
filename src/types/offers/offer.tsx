export enum OfferType {
  BOGO= 1,
  SingleItem= 2,
  MultiItem= 3,
  Substitution= 4,
  OrderDiscount= 5,
  BuyXGetOne= 7,
  BuyOneGetX= 8,
  PriceDeal= 10,
  ComboPriceDeal= 11,
  ComboMeal= 13
}
export enum OfferTemplateTypesDisplay {
  "BOGO" = OfferType.BOGO,
  "SINGLE ITEM DISCOUNT" = OfferType.SingleItem,
  "MULTI ITEM DISCOUNT" = OfferType.MultiItem,
  "SUBSTITUTION" = OfferType.Substitution,
  "ORDER DISCOUNT" = OfferType.OrderDiscount,
  "BUY BUY GET" = OfferType.BuyXGetOne,
  "BUY GET GET" = OfferType.BuyOneGetX,
  "PRICE DEAL" = OfferType.PriceDeal,
  "COMBO PRICE DEAL" = OfferType.ComboPriceDeal,
  "BOGO EOLV" = 12,
  "2-3-4 PRODUCT COMBO" = OfferType.ComboMeal,
}

export enum OfferStatus {
  UNAPPROVED= 1,
  ACTIVE= 2,
  PENDING_APPROVAL= 4,
  REJECTED= 8
}

export interface LanguageDetail {
  readonly language: string;
  readonly title: string;
  readonly subtitle: string;
  readonly description: string;
  readonly termsAndConditions: string;
  readonly imageName: string;
}

export interface Offer {
  readonly offerId: number;
  readonly translations: LanguageDetail[];
  readonly offerType: number;
  readonly offerTitle: string;
  readonly offerStatus: number;
  readonly archived?: boolean;
}
