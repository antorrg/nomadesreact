import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GenericButton from "../../../Auth/generalComponents/GenericButton/GenericButton";
import showConfirmationDialog from "../../../Auth/generalComponents/sweetAlert";
import ImageUploader from "../../../utils/ImageUploader";
import { createProduct } from "../../../utils/productEndPoints";
import "./productstyle.css";

const ProductCreate = () => {
  const navigate = useNavigate();
  const onClose = () => navigate("/admin");
  const [product, setProduct] = useState({
    title: "",
    landing: "",
    info_header: "",
    info_body: "",
    items: [{ img: "", text: "" }],
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleItemChange = (index, event) => {
    const { name, value } = event.target;
    setProduct((prevProduct) => {
      const newItems = [...prevProduct.items];
      newItems[index] = { ...newItems[index], [name]: value };
      return { ...prevProduct, items: newItems };
    });
  };

  const handleImageChange = (name, url) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: url,
    }));
  };

  const handleItemImageChange = (index, url) => {
    setProduct((prevProduct) => {
      const newItems = [...prevProduct.items];
      newItems[index] = { ...newItems[index], img: url };
      return { ...prevProduct, items: newItems };
    });
  };

  const addItem = () => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      items: [...prevProduct.items, { img: "", text: "" }],
    }));
  };

  const removeItem = (index) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      items: prevProduct.items.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async () => {
    const confirmed = await showConfirmationDialog(
      "¿Está seguro de crear el producto?"
    );
    if (confirmed) {
      // Aquí iría la lógica para crear el producto
      console.log(product)
      createProduct(product, onClose);
    }
  };

  return (
    <div className="imageBack">
      <div className="coverBack">
        <div className="container-md modal-content colorBack formProductContainer rounded-4 shadow">
          <div className="container mt-5">
            <h3>Creación de Producto: </h3>
            <section className="needs-validation" id="updateForm" noValidate>
              <div className="col-md-6 mb-3">
                <ImageUploader
                  titleField="Imagen principal:"
                  imageValue={product.landing}
                  onImageUpload={(url) => handleImageChange("landing", url)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Título:
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="title"
                  name="title"
                  value={product.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="info_header" className="form-label">
                  Info posicionamiento:
                </label>
                <textarea
                  className="form-control"
                  id="info_header"
                  name="info_header"
                  rows="3"
                  value={product.info_header}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="info_body" className="form-label">
                  Descripción:
                </label>
                <textarea
                  className="form-control"
                  id="info_body"
                  name="info_body"
                  rows="3"
                  value={product.info_body}
                  onChange={handleChange}
                />
              </div>
              <div>
                <h4>Items:</h4>
                {product.items.map((item, index) => (
                  <div key={index}>
                    <div>
                      <label htmlFor={`item_img_${index}`}>Imagen:</label>
                      <ImageUploader
                        id={`item_img_${index}`}
                        titleField=""
                        imageValue={item.img}
                        onImageUpload={(url) =>
                          handleItemImageChange(index, url)
                        }
                      />
                    </div>
                    <div>
                      <label htmlFor={`item_text_${index}`}>Texto: </label>
                      <textarea
                        id={`item_text_${index}`}
                        name="text"
                        value={item.text}
                        className="form-control"
                        onChange={(event) => handleItemChange(index, event)}
                        required
                      />
                    </div>
                    <GenericButton
                      onClick={() => removeItem(index)}
                      className="btn btn-sm btn-outline-danger mb-3"
                      buttonText="Eliminar"
                      disabled={product.items.length === 1}
                    />
                  </div>
                ))}
              </div>
              <div className="d-flex flex-row me-3">
                <GenericButton
                  className="btn btn-outline-success mb-3 me-2"
                  type="button"
                  onClick={addItem}
                  buttonText="Agregar Item"
                />
                <GenericButton
                  className="btn btn-secondary mb-3 me-2"
                  buttonText="Cancelar"
                  onClick={onClose}
                />
                <GenericButton
                  className="btn btn-primary mb-3 me-2"
                  type="button"
                  onClick={handleSubmit}
                  buttonText="Enviar"
                />
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;
