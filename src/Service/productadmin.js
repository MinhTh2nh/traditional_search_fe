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
  picture_two,
  picture_three
) => {
  try {
    return await axios.post(
      `${backendUrl}/api/admin-product`,
      {
        product_name: product_name,
        product_type: product_type,
        price: price,
        quantity: quantity,
        size: size,
        color: color,
        material: material,
        picture_one: picture_one,
        picture_two: picture_two,
        picture_three: picture_three,
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
