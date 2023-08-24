declare module "@heroicons/*";

type MenuItem = {
  text: string;
  icon?: string;
  url?:string;
  megas?: MegaMenuItem[];
};

type MegaMenuItem = {
  text: string;
  id: string;
  childLength?: number;
};

type Cat = {
  Name: string;
  Id: string;
};

interface RootCat extends Cat {
  Children?: {
    Name: string;
    Id: string;
    Children?: {
      Name: string;
      Id: string;
      Children: {
        Name: string;
        Id: string;
      }[];
    }[];
  }[];
}

type RootCatsRes = {
  Result: {
    Roots: RootCat[];
  };
};

type SubCatsRes = {
  CategoryInfoList: {
    Content: Cat[];
  };
};

type Menu = {
  name: string;
  icon: string;
  category_id: string;
  categories: {
    id: number;
    name: string;
    category_id: string;
    subCategories: {
      name: string;
      id: number;
      category_id: string;
    }[];
  }[];
};

type MenuRes = {
  data: {
    id: number;
    attributes: Menu;
  }[];
};

type MediaData = {
  id: number;
  attributes: {
    name: string;
    url: string;
    height: number;
    width: number;
  };
};

type BreadCrumb = {
  text: string;
  url?: string;
};

// get Home

type Promotion = {
  id: number;
  image: {
    data: MediaData;
  };
  link: string;
};

type FeaturedCategory = {
  image: {
    data: MediaData;
  };
  name: string;
  category_id: string;
};

// Products types

type ProductPicture = {
  Url: string;
};

type StuffStatus = "New" | "Unused" | "Second"|"Another"

type ProductFilter = {
  ItemTitle: string;
  CategoryId: string;
  MinPrice: number;
  MaxPrice: number;
  BrandId: string;
  OrderBy: string;
  VendorId: string;
  Provider: string;
  StuffStatus: StuffStatus;
  Configurators: {
    Configurator: {
      $: {
        Pid:string
        Vid: string;
      };
    };
  }[];
};

type ProductPictureInfo = {
  isMain: boolean;
  Large: ProductPicture;
  Medium: ProductPicture;
  Small: ProductPicture;
  Url: string;
};

type ConvertedPriceList = {
  Internal: {
    Price: number;
    Sign: string;
    Code: string;
  };
  DisplayedMoneys: {
    Price: number;
    Sign: string;
    Code: string;
  }[];
};

type PriceType = {
  OriginalPrice: number;
  MarginPrice;
  OriginalCurrencyCode;
  ConvertedPriceList: ConvertedPriceList;
};

type Price = {
  OriginalPrice: number;
  MarginPrice: number;
  OriginalCurrencyCode: string;
  ConvertedPriceList: ConvertedPriceList;
  ConvertedPrice: string;
  CurrencyName: string;
  CurrencySign: string;
  IsDeliverable: boolean;
  DeliveryPrice: PriceType;
  OneItemDeliveryPrice: PriceType;
  PriceWithoutDelivery: PriceType;
  OneItemPriceWithoutDelivery: PriceType;
};

type ProductInfo = {
  Id: string;
  VendorId:string
  ProviderType: string;
  CategoryId: string;
  ExternalItemUrl: string;
  MainPictureUrl: string;
  StuffStatus: "New" | string;
  Volume: number;
  BrandId: string;
  BrandName: string;
  Title: string;
  Pictures: ProductPictureInfo[];
  Price: Price;
  MasterQuantity: number;
  Location: {
    City: string;
    State: string;
  };
  Features?: string[];
  FeaturedValues?: {
    Name: string;
    Value: string;
  }[];
  IsSellAllowed: boolean;
  PhysicalParameters?: {
    Wieght: number;
    Width: number;
  };
  IsFiltered: boolean;
  PromotionPrice?: PriceType;
  PromotionPricePercent?: {
    CurrencyCode: "MNT" | string;
    Percent: number;
  }[];
};

type ProductAttribute = {
  Pid: string;
  Vid: string;
  PropertyName: "Хэмжээ" | "Өнгө" | string;
  Value: string;
  IsConfigurator: boolean;
  ImageUrl?: string;
  MiniImageUrl?: string;
};

type ProductConfiguredItem = {
  Id: string;
  Quantity: number;
  SalesCount: number;
  Configurators: {
    Pid: string;
    Vid: string;
  }[];
  Price: Price;
  PromotionPrice?: PriceType;
  PromotionPricePercent?: {
    CurrencyCode: "MNT" | string;
    Percent: number;
  }[];
};

interface ProductFullInfo extends ProductInfo {
  HasInternalDelivery: boolean;
  DeliveryCosts?: {
    Price: {
      ConvertedPriceList: ConvertedPriceList;
      ConvertedPrice: string;
      IsDeliverable: boolean;
      PriceWithoutDelivery: PriceType;
    };
    StartCost: number;
    StartWeight: number;
    AddCost: number;
  }[];
  Videos: {
    PreviewUrl: string;
    Url: string;
  }[];
  Attributes: ProductAttribute[];
  HasHierarchicalConfigurators: boolean;
  ConfiguredItems: ProductConfiguredItem[];
  FirstLotQuantity: number;
  NextLotQuantity: number;
  WeightInfos: any[];
  ActualWeightInfo: {
    Type: "Default" | string;
    DisplayName: string;
    Weight: number;
  };
  Promotions?: {
    Id: string;
    Name: string;
    Price: Price;
    ConfiguredItems:{
      Price:Price,
      Id:string
    }[]
  }[];
};


// Ecommerce
type ProductItem = {
  pId: stirng;
  cId: string;
  quantity: number;
  image: string;
  color?: string;
  property_value?: string;
  property_name?: string;
  title: string;
  price: number;
  salePrice?: number;
  countInStock?: number;
};


// Auth

type Auth = {
  isLoggedIn: boolean;
};

type UserBody = {
  username:string;
  email:string;
  password:string;
}
type AuthResponse = {
  jwt: string;
  user: User;
};


interface User {
  id: number;
  username: string;
  email: string;
  contact_information?: {
    firstname: string;
    lastname: string;
    address: string;
    phoneNumber: string;
    city: string;
    state: string;
    // isShipping:boolean
  };
}

type OrderInfo = {
  isShipping:boolean;
  products?:ProductItem[]
}

type OrderBody = {
  contact_information: User["contact_information"];
  user: any | number;
  order_id:string;
  products: ProductItem[];
  is_shipping_included: boolean;
  total_payment: number;
  total_product_quantity: number;
  payment_status: "ТӨЛӨГДСӨН" | "ХҮЛЭЭГДЭЖ БАЙГАА";
};

type Meta = {
  pagination:{
    page:number
    pageSize:number
    pageCount:number
    total:number
  }
}

interface OrderResponse extends OrderBody {
  order_status?: "Цуцлагдсан" | "УБ-т ирсэн" | "Дууссан" | "Баталгаажсан";
  updatedAt:string
  publishedAt:string
  user: {
    data: {
      id: number;
      attributes: User;
    };
  };
}


// settings 

type Setttings = {
  deliver_fee:number;
  CNY_rate:number
}

type OtapiResponse = {
  ErrorCode: "Ok" | string;
  RequistId: string;
  SubErrorCode: {};
  ErrorDescription?:string
};


type CategorySearchPropertyInfoContent = {
  Id:string
  Name:string
  Values:{
    Id:string
    Name:string
    ItemCount:number
  }[]
}

type BrandInfoContent = {
  Id: string;
  ProviderName: string;
  PictureUrl?: string;
  Name:string
};

// home types

type ProductCollection = {
  id:number
  collectionName: string;
  bgColor: string;
  products: {
    product_id: string;
  }[];
};

type HomeContent = {
  banner: {
    banner_main: {
      data: MediaData[];
    };
    banner_1: {
      data: MediaData;
    };
    banner_2: {
      data: MediaData;
    };
  };
  promotion_section: {
    promotions: Promotion[];
  };
  featured_categories: FeaturedCategory[];
  featured_products: {
    id: number;
    title: string;
    category_id: string;
    product_quantity: number;
  }[];
  productCollections:ProductCollection[]
};

type AvailableProviderSearchMethod =any

type SearchPropertyContent = {
   Id: string;
   Name: string;
   Values: {
     Id: string;
     Name: string;
     ItemCount: number;
   }[]
 }
