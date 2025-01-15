import axios from "axios";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const getHeaders = () => ({
  "Content-type": "application/json",
});

export const ListAllProduct = async () => {
  return await axios.get(`${backendUrl}/api/admin-product`, {
    headers: getHeaders(),
  });
};

export const exportAllProducts = async () => {
  return await axios.post(`${backendUrl}/api/admin-product/export`, {
    headers: getHeaders(),
  });
};

export const ViewProductbyID = async (id) => {
  return await axios.get(`${backendUrl}/api/admin-product/${id}`, {
    headers: getHeaders(),
  });
};

export const addNewProduct = async (
  product_name,
  product_type,
  price,
  quantity,
  size,
  color,
  material,
  picture_one,
) => {
  try {
    return await axios.post(
      `${backendUrl}/api/admin-product`,
      {
        product_name: product_name,
        product_type: product_type,
        price: price,
        total_stock: quantity,
        size: size,
        color: color,
        description: material,
        image_url: picture_one,
      },
      { headers: getHeaders() }
    );
  } catch (error) {
    console.error("Error adding new product:", error.response.data);
    throw new Error("Error adding new product");
  }
};

export const updateProductID = async (id, updateData) => {
  try {
    console.log("Updating product with ID:", id);
    console.log("Update data:", updateData);
    return await axios.put(
      `${backendUrl}/api/admin-product/${id}/update`,
      updateData,
      { headers: getHeaders() }
    );
  } catch (error) {
    throw new Error("Error updating product");
  }
};

export const deleteProduct = async (id) => {
  return await axios.delete(`${backendUrl}/api/admin-product/${id}`, {
    headers: getHeaders(),
  });
};
