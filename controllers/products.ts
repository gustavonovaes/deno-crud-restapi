import { v4 } from "https://deno.land/std/uuid/mod.ts";

import { Product } from "../types.ts";

let products: Product[] = [
  {
    id: "1",
    name: "Product One",
    description: "This is product one",
    price: 29.99,
  },
  {
    id: "2",
    name: "Product two",
    description: "This is product two",
    price: 39.99,
  },
];

// @desc    Get all products
// @route   GET /api/v1/products
export const getProducts = ({ response }: { response: any }) => {
  response.body = {
    success: true,
    data: products,
  };
};

// @desc    Get single product
// @route   GET /api/v1/products/:id
export function getProduct(
  {
    response,
    params,
  }: {
    response: any;
    params: { id: string };
  },
) {
  const product: Product | undefined = products.find((p) => p.id === params.id);

  if (!product) {
    response.status = 404;
    response.body = {
      success: false,
      message: "No product found",
    };
    return;
  }

  response.status = 200;
  response.body = {
    success: true,
    data: product,
  };
}

// @desc    Add product
// @route   POST /api/v1/products
export async function addProduct(
  {
    request,
    response,
  }: {
    request: any;
    response: any;
  },
) {
  const body = await request.body();

  if (!request.hasBody) {
    response.status = 400;
    response.body = {
      success: false,
      message: "No data",
    };
    return;
  }

  const product: Product = body.value;
  product.id = v4.generate();

  products.push(product);

  response.status = 201;
  response.body = {
    success: true,
    data: product,
  };
}

// @desc    Update product
// @route   PUT /api/v1/products/:id
export async function updateProduct(
  {
    request,
    response,
    params,
  }: {
    request: any;
    response: any;
    params: { id: string };
  },
) {
  const product: Product | undefined = products.find((p) => p.id === params.id);
  if (!product) {
    response.status = 404;
    response.body = {
      success: false,
      message: "No product found",
    };
    return;
  }

  const body = await request.body();

  const updateData: {
    name?: string;
    description?: string;
    price?: number;
  } = body.value;

  products = products.map((p) =>
    p.id === params.id ? { ...p, ...updateData } : p
  );

  response.status = 200;
  response.body = {
    success: true,
    data: product,
  };
}

// @desc    Delete  product
// @route   DELETE /api/v1/products/:id
export function deleteProduct(
  {
    response,
    params,
  }: {
    response: any;
    params: { id: string };
  },
) {
  products = products.filter((p) => p.id !== params.id);

  response.body = {
    success: true,
    message: "Product removed",
  };
}
