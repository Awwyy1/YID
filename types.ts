
export interface Product {
  id: string;
  name: string;
  price: string;
  description: string;
  images: string[];
  isComingSoon?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
