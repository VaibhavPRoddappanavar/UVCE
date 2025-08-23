import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { useNavigate } from 'react-router-dom';

interface CartItem {
  id: string;
  title: string;
  image: string;
  price: string;
  artist: string;
  product?: {
    name: string;
    image: string;
    basePrice: number;
  };
  quantity: number;
  orderType: 'digital' | 'physical';
}

interface ShippingInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const [cartItems] = useState<CartItem[]>([
    // Demo cart items - in real app this would come from state management
    {
      id: 'warli-dance',
      title: 'Warli Dance',
      image: 'https://upload.wikimedia.org/wikipedia/commons/3/3b/Warli_Painting.jpg',
      price: '2000',
      artist: 'Savitri Devi',
      product: {
        name: 'T-Shirt',
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300',
        basePrice: 500
      },
      quantity: 2,
      orderType: 'physical'
    }
  ]);

  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    name: '', email: '', phone: '', address: '', city: '', state: '', pincode: ''
  });

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId] = useState(() => 'ORD' + Date.now());

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const artPrice = parseInt(item.price);
      const productPrice = item.product ? item.product.basePrice : 0;
      return total + (artPrice + productPrice) * item.quantity;
    }, 0);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value
    });
  };

  const handlePlaceOrder = () => {
    // Simulate order placement
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <div className="max-w-2xl mx-auto py-20 px-4 text-center">
        <div className="bg-white rounded-2xl shadow-lg section-indian p-8">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-3xl font-bold header-indian mb-4">Order Placed Successfully!</h2>
          <p className="text-lg text-stone-600 mb-4">Your order ID: <span className="font-semibold text-orange-600">{orderId}</span></p>
          
          <div className="bg-orange-50 rounded-xl p-6 mb-6">
            <h3 className="font-semibold mb-3">What happens next?</h3>
            <div className="text-left space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <span className="bg-orange-200 text-orange-700 text-xs px-2 py-1 rounded">1</span>
                <span>Artist receives payment and starts creating your custom product</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="bg-orange-200 text-orange-700 text-xs px-2 py-1 rounded">2</span>
                <span>Product is printed with the traditional art design</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="bg-orange-200 text-orange-700 text-xs px-2 py-1 rounded">3</span>
                <span>QR code is attached for art story and artist information</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="bg-orange-200 text-orange-700 text-xs px-2 py-1 rounded">4</span>
                <span>Package is shipped to your address (5-7 business days)</span>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="font-semibold mb-2">Your QR Code</h4>
            <div className="flex justify-center mb-2">
              <QRCodeCanvas 
                value={`${window.location.origin}/order/${orderId}`} 
                size={120} 
                fgColor="#e1ad01" 
                bgColor="#fff8f0" 
              />
            </div>
            <p className="text-xs text-stone-500">Scan to track your order</p>
          </div>

          <div className="flex gap-3 justify-center">
            <button 
              onClick={() => navigate('/marketplace')}
              className="btn-indian px-6 py-2"
            >
              Continue Shopping
            </button>
            <button 
              onClick={() => navigate('/')}
              className="px-6 py-2 border border-stone-300 rounded"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold header-indian mb-6">Checkout</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Order Summary */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
          <div className="bg-white rounded-xl shadow section-indian p-6">
            {cartItems.map((item, index) => (
              <div key={index} className="flex gap-4 mb-4 pb-4 border-b border-stone-200 last:border-b-0">
                <div className="relative">
                  <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded border-2 border-orange-200" />
                  {item.product && (
                    <img src={item.product.image} alt={item.product.name} className="absolute -bottom-2 -right-2 w-8 h-8 object-cover rounded border border-orange-300" />
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold">{item.title}</h4>
                  <p className="text-sm text-stone-600">by {item.artist}</p>
                  {item.product && (
                    <p className="text-sm text-orange-600">on {item.product.name}</p>
                  )}
                  <p className="text-sm text-stone-500">Qty: {item.quantity}</p>
                  <div className="flex gap-2 text-sm">
                    <span>Art: ₹{item.price}</span>
                    {item.product && <span>Product: ₹{item.product.basePrice}</span>}
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">₹{(parseInt(item.price) + (item.product?.basePrice || 0)) * item.quantity}</p>
                  <span className={`text-xs px-2 py-1 rounded ${item.orderType === 'digital' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                    {item.orderType}
                  </span>
                </div>
              </div>
            ))}
            
            <div className="border-t border-stone-200 pt-4 mt-4">
              <div className="flex justify-between text-lg font-bold">
                <span>Total: ₹{calculateTotal()}</span>
              </div>
              <p className="text-xs text-stone-500 mt-1">Includes artist commission and platform fees</p>
            </div>
          </div>
        </div>

        {/* Shipping Information */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Shipping Information</h3>
          <div className="bg-white rounded-xl shadow section-indian p-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={shippingInfo.name}
                  onChange={handleInputChange}
                  className="p-3 border border-stone-300 rounded"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={shippingInfo.email}
                  onChange={handleInputChange}
                  className="p-3 border border-stone-300 rounded"
                  required
                />
              </div>
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={shippingInfo.phone}
                onChange={handleInputChange}
                className="w-full p-3 border border-stone-300 rounded"
                required
              />
              <textarea
                name="address"
                placeholder="Complete Address"
                value={shippingInfo.address}
                onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
                className="w-full p-3 border border-stone-300 rounded"
                rows={3}
                required
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={shippingInfo.city}
                  onChange={handleInputChange}
                  className="p-3 border border-stone-300 rounded"
                  required
                />
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={shippingInfo.state}
                  onChange={handleInputChange}
                  className="p-3 border border-stone-300 rounded"
                  required
                />
                <input
                  type="text"
                  name="pincode"
                  placeholder="PIN Code"
                  value={shippingInfo.pincode}
                  onChange={handleInputChange}
                  className="p-3 border border-stone-300 rounded"
                  required
                />
              </div>
            </div>

            <div className="mt-6 p-4 bg-orange-50 rounded-lg">
              <h4 className="font-semibold mb-2">💝 Special Features</h4>
              <div className="text-sm space-y-1">
                <div className="flex items-center gap-2">
                  <span>📖</span>
                  <span>QR code with artist story and art history</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>🎨</span>
                  <span>Direct artist support with every purchase</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>📱</span>
                  <span>Digital certificate of authenticity</span>
                </div>
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              className="w-full btn-indian mt-6 py-3 text-lg"
              disabled={!shippingInfo.name || !shippingInfo.email || !shippingInfo.address}
            >
              Place Order - ₹{calculateTotal()}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
