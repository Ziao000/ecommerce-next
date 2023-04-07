import React, { useState } from 'react';
import axios from 'axios';
import Header from '@/component/header';
import Footer from '@/component/footer';
import Link from 'next/link';
import "bootstrap/dist/css/bootstrap.min.css";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: {
    id: number;
    name: string;
  };
}

interface Category {
  id: number;
  name: string;
}

interface HomeProps {
  products: Product[];
  categories: Category[];
}

export default function Home({ products, categories }: HomeProps) {
  const [cartItemCount, setCartItemCount] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleAddToCart = async (productId: number) => {
    try {
      const orderResponse = await axios.post('http://localhost:8000/api/orders', {
        status: 'Pending',
        amount: 0,
        user: {
          id: 1
        },
        orderItems: [
          {
            quantity: 1,
            product: {
              id: productId
            }
          }
        ]
      });
      setCartItemCount(orderResponse.data.cartItemCount);
    } catch (error) {
      console.error(error);
    }
  };

  const filteredProducts = products.filter((product) => {
    const name = product.name.toLowerCase();
    const searchTermLowerCase = searchTerm.toLowerCase();
    return name.includes(searchTermLowerCase);
  });

  return (
    <div className="container">
      <Header categories={categories} cartItemCount={cartItemCount} />
      <div className="d-flex justify-content-end mb-3">
        <input
          type="text"
          placeholder="Search products"
          className="form-control w-25"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <h1>Products</h1>
      <div className="row row-cols-1 row-cols-md-3">
        {filteredProducts.map((product) => (
          <div key={product.id} className="col mb-4">
            <div className="card h-100">
              <Link href={`/product/${product.id}`}> 
                  <img src="https://via.placeholder.com/300x200" className="card-img-top" alt={product.name} />
              </Link>
              <div className="card-body">
                <h2 className="card-title">{product.name}</h2>
                <p className="card-text">{product.description}</p>
                <p className="card-text">{product.price} €</p>
                <p className="card-text">{product.category.name} </p>
                <button className="btn btn-primary" onClick={() => handleAddToCart(product.id)}>
                  Ajouter au panier
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  const response = await axios.get('http://localhost:8000/api/products');
  const products = response.data;
  const categoriesResponse = await axios.get('http://localhost:8000/api/categories');
  const categories = categoriesResponse.data;
  return { props: { products, categories } };
}
