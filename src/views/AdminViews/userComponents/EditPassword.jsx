import { ValidPass } from "../../../Auth/generalComponents/internalUtils/Validate";
import { useAuth } from "../../../Auth/AuthContext/AuthContext";
import * as us from "../../../Auth/authHelpers/Auth";
import { useState } from "react";
import showConfirmationDialog from "../../../Auth/generalComponents/sweetAlert";
import GenericButton from "../../../Auth/generalComponents/GenericButton/GenericButton";
import { useNavigate, useParams } from "react-router-dom";
import "../../styles/login.css";
import "../../styles/forms.css";

const EditPassword = () => {
  const { logout } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const closeLogin = () => {
    navigate(-1);
  };
  const onClose = () => {
    navigate(-1);
  };
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const [verify, setVerify] = useState(true);
  const [inputPass, setInputPass] = useState({
    id: id,
    password: "",
  });

  const [input, setInput] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const handleChangePass = (event) => {
    const { name, value } = event.target;
    setInputPass({
      ...inputPass,
      [name]: value,
    });
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setInput({
      ...input,
      [name]: value,
    });
    setError((prevError) => ({
      ...prevError,
      [name]:
        name === "confirmPassword" && value !== input.newPassword
          ? "Las contraseñas no coinciden"
          : ValidPass({ ...input, [name]: value })[name],
    }));
  };

  const userData = {
    id: inputPass.id,
    password: inputPass.password,
  };

  const handleSubmitVerify = async (event) => {
    event.preventDefault();
    //  lógica para verificar la contraseña actual
    const confirmed = await showConfirmationDialog(
      "¿Quiere verificar su contraseña?"
    );
    if (confirmed) {
      // Si el usuario hace clic en "Aceptar", ejecutar la funcion:
      us.verifyPassword(userData, setVerify);
    }
  };

  const passChange = {
    password: input.newPassword,
  };

  const handleSubmitChange = async (event) => {
    event.preventDefault();
    const confirmed = await showConfirmationDialog(
      "¿Está seguro cambiar la contraseña?"
    );
    if (confirmed) {
      // Si el usuario hace clic en "Aceptar", ejecutar la funcion:
      us.changePassword(id, passChange, setVerify, onClose, logout);
    }
  };

  const disabledInput = verify;
  const disabledBy =
    !input.newPassword.trim() ||
    !input.confirmPassword.trim() ||
    error.newPassword ||
    error.confirmPassword ||
    disabledInput;

  return (
    <div className="imageBack">
      <div className="coverBack">
        <div className="container-md modal-content colorBack passContainer rounded-4 shadow">
          <div className="form-signin m-auto p-3">
            <section>
              <div className="d-flex justify-content-between align-items-center">
                <h5>Editar contraseña:</h5>
                <button
                  type="button"
                  onClick={closeLogin}
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <label className="mb-3">Introduzca su contraseña actual:</label>
              <div className="form-floating d-flex justify-content-between align-items-center">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Contraseña actual"
                  value={inputPass.password}
                  name="password"
                  autoComplete="off"
                  onChange={(event) => handleChangePass(event)}
                />
                <button
                  type="button"
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                  style={{ backgroundColor: "transparent" }}
                  className="buttonEye"
                >
                  <i
                    className={showPassword ? "bi bi-eye-slash" : "bi bi-eye"}
                  ></i>
                </button>
              </div>
              <GenericButton
                type="submit"
                className="btn btn-primary w-80 py-1"
                onClick={handleSubmitVerify}
                buttonText={"Verificar contraseña"}
                disabled={!inputPass.password}
              />

              {/* Campos para el nuevo password */}
              {!disabledInput ? (
                <label>¡Password confirmado! Puede continuar:</label>
              ) : null}
              <label>Intoduzca su nueva contraseña:</label>
              <div className="form-floating d-flex justify-content-between align-items-center">
                <input
                  type={showPassword1 ? "text" : "password"}
                  placeholder="Nuevo password"
                  value={input.newPassword}
                  name="newPassword"
                  autoComplete="off"
                  onChange={(event) => handleChange(event)}
                  disabled={disabledInput} // Deshabilitar si la contraseña actual no está verificada
                />
                <button
                  type="button"
                  onClick={() => {
                    setShowPassword1(!showPassword1);
                  }}
                  style={{ backgroundColor: "transparent" }}
                  className="buttonEye"
                >
                  <i
                    className={showPassword1 ? "bi bi-eye-slash" : "bi bi-eye"}
                  ></i>
                </button>
                {error.newPassword && (
                  <p className="errorMsg">{error.newPassword}</p>
                )}
              </div>
              <label>Confirme su nueva contraseña:</label>
              <div className="form-floating d-flex justify-content-between align-items-center">
                <input
                  type={showPassword2 ? "text" : "password"}
                  placeholder="Confirmar nuevo password"
                  value={input.confirmPassword}
                  name="confirmPassword"
                  autoComplete="off"
                  onChange={(event) => handleChange(event)}
                  disabled={disabledInput} // Deshabilitar si la contraseña actual no está verificada
                />
                <button
                  type="button"
                  onClick={() => {
                    setShowPassword2(!showPassword2);
                  }}
                  style={{ backgroundColor: "transparent" }}
                  className="buttonEye"
                >
                  <i
                    className={showPassword ? "bi bi-eye-slash" : "bi bi-eye"}
                  ></i>
                </button>
                {error.confirmPassword && (
                  <p className="errorMsg">{error.password}</p>
                )}
              </div>
              <GenericButton
                type="submit"
                className="btn btn-primary w-80 py-1"
                onClick={handleSubmitChange}
                buttonText={"Cambiar contraseña"}
                disabled={disabledBy}
              />
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPassword;
