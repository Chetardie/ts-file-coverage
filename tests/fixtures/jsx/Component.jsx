import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

const ProductCard = ({ product, onAddToCart, onToggleFavorite }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleAddToCart = useCallback(async () => {
    setIsLoading(true);
    try {
      await onAddToCart(product.id);
    } finally {
      setIsLoading(false);
    }
  }, [product.id, onAddToCart]);

  const handleImageError = () => {
    setImageError(true);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  return (
    <div className="product-card">
      <div className="product-image">
        {imageError ? (
          <div className="image-placeholder">No Image</div>
        ) : (
          <img
            src={product.imageUrl}
            alt={product.name}
            onError={handleImageError}
          />
        )}
      </div>

      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-price">{formatPrice(product.price)}</div>

        <div className="product-actions">
          <button
            onClick={handleAddToCart}
            disabled={isLoading || !product.inStock}
            className="add-to-cart-btn"
          >
            {isLoading ? 'Adding...' : 'Add to Cart'}
          </button>

          <button
            onClick={() => onToggleFavorite(product.id)}
            className={`favorite-btn ${product.isFavorite ? 'active' : ''}`}
          >
            ♥
          </button>
        </div>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    price: PropTypes.number.isRequired,
    imageUrl: PropTypes.string,
    inStock: PropTypes.bool,
    isFavorite: PropTypes.bool,
  }).isRequired,
  onAddToCart: PropTypes.func.isRequired,
  onToggleFavorite: PropTypes.func.isRequired,
};

export default ProductCard;
