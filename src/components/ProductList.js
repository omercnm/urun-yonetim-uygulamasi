import React, { useState } from "react";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [sortingType, setSortingType] = useState("none");
  const [theme, setTheme] = useState("light");

  const handleSort = (type) => {
    setSortingType(type);
  };

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortingType) {
      case "yearAsc":
        return a.year - b.year;
      case "yearDesc":
        return b.year - a.year;
      case "priceAsc":
        return a.price - b.price;
      case "priceDesc":
        return b.price - a.price;
      default:
        return 0;
    }
  });

  const handleAddProduct = () => {
    setProducts([...products, { ...newProduct, id: Date.now() }]);
    setNewProduct({});
  };

  const handleDeleteProduct = (productId) => {
    const updatedProducts = products.filter(
      (product) => product.id !== productId
    );
    setProducts(updatedProducts);
  };

  const handleUpdateProduct = () => {
    const updatedProducts = products.map((product) =>
      product.id === selectedProduct.id ? selectedProduct : product
    );
    setProducts(updatedProducts);
    setSelectedProduct(null);
  };

  const changeTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <div className=" bg-cover mx-auto p-4 bg-white text-black dark:bg-slate-700 dark:text-white ">
      <div className="flex justify-between ">
        <h1 className="text-3xl mb-4">Ürün Yönetim Paneli</h1>
        <div>
          <input
            onClick={changeTheme}
            className="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckDefault"
          />
          <label
            className="inline-block pl-[0.15rem] hover:cursor-pointer"
            for="flexSwitchCheckDefault"
          >
            {theme} mode
          </label>
        </div>
      </div>

      <div className="mb-4">
        <button
          className={`px-4 py-2 mr-2 ${
            sortingType === "yearAsc" ? "bg-blue-500" : "bg-gray-400"
          } text-white rounded hover:bg-blue-600`}
          onClick={() => handleSort("yearAsc")}
        >
          Yıla Göre Sırala (Artan)
        </button>
        <button
          className={`px-4 py-2 mr-2 ${
            sortingType === "yearDesc" ? "bg-blue-500" : "bg-gray-400"
          } text-white rounded hover:bg-blue-600`}
          onClick={() => handleSort("yearDesc")}
        >
          Yıla Göre Sırala (Azalan)
        </button>
        <button
          className={`px-4 py-2 mr-2 ${
            sortingType === "priceAsc" ? "bg-blue-500" : "bg-gray-400"
          } text-white rounded hover:bg-blue-600`}
          onClick={() => handleSort("priceAsc")}
        >
          Fiyata Göre Sırala (Artan)
        </button>
        <button
          className={`px-4 py-2 ${
            sortingType === "priceDesc" ? "bg-blue-500" : "bg-gray-400"
          } text-white rounded hover:bg-blue-600`}
          onClick={() => handleSort("priceDesc")}
        >
          Fiyata Göre Sırala (Azalan)
        </button>
      </div>

      <h2 className="text-xl mt-4 mb-2">Yeni Ürün Ekle</h2>
      <div className="mb-4 p-2 border rounded-lg">
        <input
          className="p-2 border rounded mr-2 dark:text-black"
          type="text"
          placeholder="Marka"
          value={newProduct.brand || ""}
          onChange={(e) =>
            setNewProduct({ ...newProduct, brand: e.target.value })
          }
        />
        <input
          className="p-2 border rounded mr-2 dark:text-black"
          type="text"
          placeholder="Model"
          value={newProduct.model || ""}
          onChange={(e) =>
            setNewProduct({ ...newProduct, model: e.target.value })
          }
        />
        <input
          className="p-2 border rounded mr-2 dark:text-black"
          type="text"
          placeholder="Renk"
          value={newProduct.color || ""}
          onChange={(e) =>
            setNewProduct({ ...newProduct, color: e.target.value })
          }
        />
        <input
          className="p-2 border rounded mr-2 dark:text-black"
          type="number"
          placeholder="Yıl"
          value={newProduct.year || ""}
          onChange={(e) =>
            setNewProduct({ ...newProduct, year: parseInt(e.target.value) })
          }
        />
        <input
          className="p-2 border rounded mr-2 dark:text-black"
          type="number"
          placeholder="Fiyat (TL)"
          value={newProduct.price || ""}
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })
          }
        />
        <button
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          onClick={handleAddProduct}
        >
          Ekle
        </button>
      </div>
      {selectedProduct && (
        <div className="mb-4 p-2 border rounded-lg">
          <h2 className="text-xl mb-2">Ürünü Güncelle</h2>
          <input
            className="p-2 border rounded mr-2 dark:text-black"
            type="text"
            placeholder="Marka"
            value={selectedProduct.brand || ""}
            onChange={(e) =>
              setSelectedProduct({ ...selectedProduct, brand: e.target.value })
            }
          />
          <input
            className="p-2 border rounded mr-2 dark:text-black"
            type="text"
            placeholder="Model"
            value={selectedProduct.model || ""}
            onChange={(e) =>
              setSelectedProduct({ ...selectedProduct, model: e.target.value })
            }
          />
          <input
            className="p-2 border rounded mr-2 dark:text-black"
            type="text"
            placeholder="Renk"
            value={selectedProduct.color || ""}
            onChange={(e) =>
              setSelectedProduct({ ...selectedProduct, color: e.target.value })
            }
          />
          <input
            className="p-2 border rounded mr-2 dark:text-black"
            type="number"
            placeholder="Yıl"
            value={selectedProduct.year || ""}
            onChange={(e) =>
              setSelectedProduct({
                ...selectedProduct,
                year: parseInt(e.target.value),
              })
            }
          />
          <input
            className="p-2 border rounded mr-2 dark:text-black"
            type="number"
            placeholder="Fiyat (TL)"
            value={selectedProduct.price || ""}
            onChange={(e) =>
              setSelectedProduct({
                ...selectedProduct,
                price: parseFloat(e.target.value),
              })
            }
          />
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 "
            onClick={handleUpdateProduct}
          >
            Güncelle
          </button>
        </div>
      )}
      <h2 className="text-xl mb-2">Ürün Listesi</h2>
      <ul>
        {sortedProducts.map((product) => (
          <li key={product.id} className="mb-4 p-2 border rounded-lg">
            <strong>Marka:</strong> {product.brand}, <strong>Model:</strong>{" "}
            {product.model}, <strong>Renk:</strong> {product.color},{" "}
            <strong>Yıl:</strong> {product.year}, <strong>Fiyat:</strong>{" "}
            {product.price} TL
            <button
              className="ml-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={() => handleDeleteProduct(product.id)}
            >
              Sil
            </button>
            <button
              className="ml-2 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => setSelectedProduct(product)}
            >
              Güncelle
            </button>
          </li>
        ))}
      </ul>

      <div className="container m-[650px]"></div>
    </div>
  );
}

export default ProductList;
