export type Category = {
  id: string;
  name: string;
  slug: string;
  order_index: number;
  created_at: string;
};

export type Subcategory = {
  id: string;
  category_id: string;
  name: string;
  order_index: number;
  created_at: string;
};

export type Product = {
  id: string;
  category_id: string;
  subcategory_id: string;
  name: string;
  description: string | null;
  price: number;
  currency: string;
  image_url: string | null;
  is_active: boolean;
  order_index: number;
  created_at: string;
  // Joined fields
  subcategories?: Subcategory;
};

export type CategoryWithProducts = Category & {
  products: Product[];
  subcategories: Subcategory[];
};
