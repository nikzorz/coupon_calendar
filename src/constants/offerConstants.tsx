export enum OfferTemplateTypes {
  BOGO = 1,
  SINGLE_ITEM_DISCOUNT = 2,
  MULTI_ITEM_DISCOUNT = 3,
  SUBSTITUTION = 4,
  ORDER_DISCOUNT = 5,
  BNGO = 7,
  BOGN = 8,
  SLP_SINGLE_ITEM_DISCOUNT = 10,
  SLP_BOGO = 11,
  BOGO_EOLV = 12,
  PRODUCT_COMBO = 13,
}

export interface OfferTemplateOption {
  label: string;
  value: number;
}

export const offerTemplateTypeOptions: OfferTemplateOption[] = [
  {
    label: '2, 3, 4 Product Combo',
    value: OfferTemplateTypes.PRODUCT_COMBO,
  },
  {
    label: 'Buy One Get One',
    value: OfferTemplateTypes.BOGO,
  },
  {
    label: 'Buy, Buy, Get',
    value: OfferTemplateTypes.BNGO,
  },
  {
    label: 'Buy, Get, Get',
    value: OfferTemplateTypes.BOGN,
  },
  {
    label: 'Combo Price Deal',
    value: OfferTemplateTypes.SLP_BOGO,
  },
  {
    label: 'Multi Item Discount',
    value: OfferTemplateTypes.MULTI_ITEM_DISCOUNT,
  },
  {
    label: 'Order Discount',
    value: OfferTemplateTypes.ORDER_DISCOUNT,
  },
  {
    label: 'Price Deal',
    value: OfferTemplateTypes.SLP_SINGLE_ITEM_DISCOUNT,
  },
  {
    label: 'Single Item Discount',
    value: OfferTemplateTypes.SINGLE_ITEM_DISCOUNT,
  },
  {
    label: 'Substitution',
    value: OfferTemplateTypes.SUBSTITUTION,
  },
];