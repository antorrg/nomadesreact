import axios from "axios";
import * as toast from "../Auth/generalComponents/HandlerError";
import setAuthHeader from "../Auth/generalComponents/axiosUtils";

export const updateProduct = async (id, product, onClose) => {
  console.log(id);
  try {
    const response = await axios.put(
      `/api/v1/product/${id}`,
      product,
      setAuthHeader()
    );
    if (response.status === 200) {
      toast.showSuccess("Producto actualizado correctamente");
      await onClose(); // Cierra el modal después de guardar los cambios
    }
  } catch (error) {
    toast.HandlError(error);
    console.error("Error al actualizar el producto:", error);
  }
};

export const updateItem = async (id, item, onClose) => {
  try {
    const response = await axios.put(
      `/api/v1/product/item/${id}`,
      item,
      setAuthHeader()
    );
    if (response.status === 200) {
      //await axios(`/api/v1//media/imgs/${imgId}`)
      toast.showSuccess("Item actualizado correctamente");
      await onClose(); // Cierra el modal después de guardar los cambios
    }
  } catch (error) {
    toast.HandlError({ error: error.message });
    console.error("Error al actualizar el item:", error);
  }
};
export const createProduct = async (product, onClose) => {
  try {
    const response = await axios.post(
      `/api/v1/product/create`,
      product,
      setAuthHeader()
    );
    if (response.status === 201) {
      toast.showSuccess("Producto creado correctamente");
      await onClose(); // Cierra el modal después de guardar los cambios
    }
  } catch (error) {
    toast.HandlError(error);
    //console.error("Error al crear el producto:", error);
  }
};

export const createItem = async (item, onClose) => {
  try {
    const response = await axios.post(
      `/api/v1/product/item/create`,
      item,
      setAuthHeader()
    );
    if (response.status === 201) {
      toast.showSuccess("Item creado correctamente");
      await onClose(); // Cierra el modal después de guardar los cambios
    }
  } catch (error) {
    toast.HandlError({ error: error.message });
    console.error("Error al crear el item:", error);
  }
};
export const deleteProduct = async (id) => {
  console.log(id);
  try {
    const response = await axios.delete(
      `/api/v1/product/${id}`,
      item,
      setAuthHeader()
    );
    if (response.status === 200) {
      toast.showSuccess("Producto borrado correctamente");
      await onClose(); // Cierra el modal después de guardar los cambios
    }
  } catch (error) {
    toast.HandlError(error);
  }
};
export const deleteItem = async (id) => {
  console.log(id);
  try {
    const response = await axios.delete(
      `/api/v1/product/item/${id}`,
      setAuthHeader()
    );
    if (response.status === 200) {
      toast.showSuccess("Item eliminado correctamente");
      await onClose(); // Cierra el modal después de guardar los cambios
    }
  } catch (error) {
    toast.HandlError(error);
  }
};
export const deleteImage = async (id) => {
  console.log(id);
  try {
    const response = await axios.delete(
      `/api/v1/media/imgs/${id}`,
      setAuthHeader()
    );
    if (response.status === 200) {
      toast.showSuccess("Imagen eliminada correctamente");
      //await onClose(); // Cierra el modal después de guardar los cambios
    }
  } catch (error) {
    toast.HandlError(error);
  }
};