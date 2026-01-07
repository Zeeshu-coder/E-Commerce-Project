import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import ProductService from '../services/product.service'
import { useParams, useNavigate } from 'react-router-dom'
import CartService from '../services/cart.service'
import AuthService from '../services/auth.service'
import WishlistService from '../services/wishlist.service'
import ReviewService from '../services/review.service'

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [userRating, setUserRating] = useState(5);
  const [userComment, setUserComment] = useState("");
  const [currentUser] = useState(AuthService.getCurrentUser());
  
  const navigate = useNavigate();

  const getProduct = (id) => {
    ProductService.getProductById(id)
      .then(response => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch(e => {
        console.error(e);
        setLoading(false);
      });
  };

  const loadReviews = (productId) => {
    ReviewService.getProductReviews(productId)
        .then(response => {
            setReviews(response.data);
        })
        .catch(e => {
            console.error("Error loading reviews", e);
        });
  }

  useEffect(() => {
    getProduct(id);
    loadReviews(id);
  }, [id]);

  const handleAddToCart = async () => {
    const user = AuthService.getCurrentUser();
    if (!user) {
      alert("Please login to add items to cart.");
      navigate("/login");
      return;
    }

    try {
      await CartService.addToCart(product.id, 1);
      alert("Added to cart successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to add to cart.");
    }
  };

  const handleAddToWishlist = async () => {
    const user = AuthService.getCurrentUser();
    if (!user) {
      alert("Please login to add items to wishlist.");
      navigate("/login");
      return;
    }

    try {
      await WishlistService.addToWishlist(product.id);
      alert("Added to wishlist successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to add to wishlist.");
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!currentUser) {
        alert("Please login to write a review.");
        navigate("/login");
        return;
    }
    
    try {
        await ReviewService.addReview(product.id, userRating, userComment);
        setUserComment("");
        setUserRating(5);
        loadReviews(product.id);
        alert("Review submitted successfully!");
    } catch (error) {
        console.error("Error submitting review", error);
        alert("Failed to submit review.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8 text-center">
            Loading product details...
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8 text-center">
            Product not found.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden md:flex mb-8">
            <div className="md:w-1/2">
                <img 
                    src={product.imageUrl || "https://via.placeholder.com/600"} 
                    alt={product.name} 
                    className="w-full h-96 object-cover"
                />
            </div>
            <div className="md:w-1/2 p-8">
                <h1 className="text-3xl font-bold mb-4 text-gray-800">{product.name}</h1>
                <p className="text-sm text-gray-500 mb-4 uppercase tracking-wide">{product.category}</p>
                <div className="text-2xl font-bold text-amber-600 mb-6">${product.price}</div>
                <p className="text-gray-700 mb-6 leading-relaxed">
                    {product.description}
                </p>
                <div className="mb-6">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold 
                        ${product.stockQuantity > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {product.stockQuantity > 0 ? 'In Stock' : 'Out of Stock'}
                    </span>
                    <span className="ml-4 text-gray-600">
                        {product.stockQuantity} items available
                    </span>
                </div>
                
                <div className="flex gap-4">
                    <button 
                        onClick={handleAddToCart}
                        disabled={product.stockQuantity <= 0}
                        className={`flex-1 py-3 px-6 rounded-lg font-bold text-white transition-colors
                            ${product.stockQuantity > 0 ? 'bg-amber-500 hover:bg-amber-600' : 'bg-gray-400 cursor-not-allowed'}`}
                    >
                        {product.stockQuantity > 0 ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                    <button 
                        onClick={handleAddToWishlist}
                        className="py-3 px-6 rounded-lg font-bold text-amber-500 border-2 border-amber-500 hover:bg-amber-50 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        Wishlist
                    </button>
                </div>
            </div>
        </div>

        {/* Reviews Section */}
        <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Customer Reviews</h2>
            
            {/* Review Form */}
            {currentUser ? (
                <form onSubmit={handleSubmitReview} className="mb-8 border-b pb-8">
                    <h3 className="text-lg font-semibold mb-4">Write a Review</h3>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Rating</label>
                        <select 
                            value={userRating} 
                            onChange={(e) => setUserRating(Number(e.target.value))}
                            className="border rounded px-3 py-2 w-full md:w-1/4 focus:outline-none focus:border-amber-500"
                        >
                            <option value="5">5 - Excellent</option>
                            <option value="4">4 - Very Good</option>
                            <option value="3">3 - Good</option>
                            <option value="2">2 - Fair</option>
                            <option value="1">1 - Poor</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Comment</label>
                        <textarea 
                            value={userComment}
                            onChange={(e) => setUserComment(e.target.value)}
                            className="border rounded px-3 py-2 w-full focus:outline-none focus:border-amber-500"
                            rows="3"
                            placeholder="Share your thoughts about this product..."
                            required
                        ></textarea>
                    </div>
                    <button 
                        type="submit"
                        className="bg-amber-500 text-white px-6 py-2 rounded hover:bg-amber-600 transition-colors"
                    >
                        Submit Review
                    </button>
                </form>
            ) : (
                <div className="bg-gray-50 p-4 rounded mb-8 text-center">
                    <p className="text-gray-600">Please <a href="/login" className="text-amber-500 hover:underline">login</a> to write a review.</p>
                </div>
            )}

            {/* Reviews List */}
            <div className="space-y-6">
                {reviews.length === 0 ? (
                    <p className="text-gray-500 italic">No reviews yet. Be the first to review!</p>
                ) : (
                    reviews.map(review => (
                        <div key={review.id} className="border-b pb-6 last:border-b-0">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <span className="font-bold text-gray-800 mr-2">{review.user ? review.user.fullName : 'Anonymous'}</span>
                                    <span className="text-sm text-gray-500">
                                        {new Date(review.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                                <div className="flex text-amber-500">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${i < review.rating ? 'fill-current' : 'text-gray-300'}`} viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                            </div>
                            <p className="text-gray-700">{review.comment}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
