import QuantityButton from "../../components/commonComponents/button/QuantityButton"
import { handleIncrease, handleDecrease, handleRemove } from "../../components/commonFunctions/CommonFunctions"
import { RootState } from "../../state/store/store"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "../../state/store/store"
import { Trash2, Star } from "lucide-react";

const renderStars = (rating: number) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<Star key={i} size={12} className="fill-yellow-400 text-yellow-400" />);
    } else if (rating >= i - 0.5) {
      stars.push(
        <div key={i} className="relative">
          <Star size={12} className="text-gray-300" />
          <div className="absolute top-0 left-0 overflow-hidden w-1/2">
            <Star size={12} className="fill-yellow-400 text-yellow-400" />
          </div>
        </div>
      );
    } else {
      stars.push(<Star key={i} size={12} className="text-gray-300" />);
    }
  }
  return stars;
};

const OrderSummary = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.productData.cartItems);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-1.5 h-6 bg-violet-600 rounded-full"></div>
        <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">Order Summary</h2>
      </div>

      <div className="space-y-4">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col gap-4"
          >
            <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start">
              {/* Product Image */}
              <div className="w-24 h-24 bg-gray-50 rounded-lg flex-shrink-0 flex items-center justify-center p-2 border border-gray-100">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="max-w-full max-h-full object-contain"
                />
              </div>

              {/* Product Details */}
              <div className="flex-1 flex flex-col min-w-0 text-center sm:text-left">
                <h3 className="text-sm font-bold text-gray-900 truncate mb-1">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-500 line-clamp-1 mb-2 font-medium">
                  {item.description}
                </p>

                {/* Rating */}
                <div className="flex items-center justify-center sm:justify-start gap-1.5 mb-2">
                  <div className="flex space-x-0.5">
                    {renderStars(item.rating)}
                  </div>
                  <span className="text-[10px] font-bold text-gray-400">
                    {item.rating?.toFixed(1)}
                  </span>
                </div>

                <span className={`text-[10px] font-bold ${item.availabilityStatus === 'In Stock' ? 'text-green-600' : 'text-orange-600'}`}>
                  {item.availabilityStatus}
                </span>
              </div>

              {/* Price Section */}
              <div className="flex flex-col items-center sm:items-end flex-shrink-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[10px] text-gray-400 line-through font-medium">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </span>
                  <span className="bg-green-100 text-green-700 text-[9px] font-black px-1.5 py-0.5 rounded">
                    {item.discountPercentage?.toFixed(0)}% OFF
                  </span>
                </div>
                <span className="text-lg font-black text-[#7c3aed]">
                  ₹{((item.price - (item.price * item.discountPercentage) / 100) * item.quantity).toFixed(2)}
                </span>
              </div>
            </div>

            {/* Quantity Controls & Delete Button */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-50">
              <QuantityButton
                onQuant={item.quantity}
                onAdd={() => handleIncrease(item.id, dispatch, cartItems)}
                onRemove={() => handleDecrease(item.id, dispatch, cartItems)}
              />

              <button
                onClick={() => handleRemove(item.id, dispatch)}
                className="flex items-center gap-1.5 text-xs font-bold text-red-500 hover:text-red-700 transition-colors py-1 px-2 rounded-lg hover:bg-red-50"
              >
                <Trash2 size={14} />
                <span>Remove</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default OrderSummary
