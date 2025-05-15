import { useNavigate } from 'react-router-dom';

const ProductManagerPage = () => {
  const navigate = useNavigate();
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Product Manager Dashboard</h1>
      <ul className="space-y-4">
        <li>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => navigate('/product-manager/products')}
          >
            Ürünleri Yönet
          </button>
        </li>
        {/* Diğer butonlar burada kalabilir */}
      </ul>
    </div>
  );
};

export default ProductManagerPage;
