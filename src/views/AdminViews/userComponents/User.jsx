import { useNavigate, useLocation } from "react-router-dom";
import Edition from "../../../Auth/generalComponents/Edition/Edition";
import * as us from "../../../Auth/authHelpers/Auth";
import showConfirmationDialog from "../../../Auth/generalComponents/sweetAlert";
import "./user.css";

const User = ({ user, isSingleUser }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isProfileRoute = location.pathname.includes("profile");

  const goToDetail = () => navigate(`/admin/users/${user.id}`);
  const goToBack = () => navigate(-1);
  const goToEdition = () => navigate(`/admin/users/update/${user.id}`);
  const goToUpgrade = () => navigate(`/admin/users/upgrade/${user.id}`);
  const onClose = () => navigate("/admin");
  const deleteUser = () => {
    userDelete();
  };
  const goToPassUpd = () => {
    if (isProfileRoute) {
      navigate(`/admin/users/updateinfo/${user.id}`);
    } else {
      resetPassword();
    }
  };
  const resetPassword = async () => {
    const confirmed = await showConfirmationDialog(
      "¿Quiere reiniciar su contraseña?"
    );
    if (confirmed) {
      // Si el usuario hace clic en "Aceptar", ejecutar la funcion:
      us.onResetPass(user.id, onClose);
    }
  };

  const userDelete = async () => {
    const confirmed = await showConfirmationDialog(
      "¿Quiere eliminar su usuario? \n¡Esta accion no podra deshacerse!"
    );
    if (confirmed) {
      // Si el usuario hace clic en "Aceptar", ejecutar la funcion:
      us.onDeleteUser(user.id, onClose);
    }
  };
  const userStatus = user.enable ? "Activo" : "Bloqueado";

  const renderUserInfo = (label, value) => (
    <div className="user-info">
      <dt className="user-info-label">{label}:</dt>
      <dd className="user-info-value">{value}</dd>
    </div>
  );

  return (
    <div className="col userStyle">
      <div className="card shadow-sm p-2">
        <img
          className="card-img-top"
          src={user.picture}
          alt={`${user.nickname}'s profile`}
        />
        <div className="card-body">
          <dl className="user-info-list">
            {renderUserInfo("Email", user.email)}
            {renderUserInfo("Apodo", user.nickname)}
            {renderUserInfo("Rol", user.role)}
            {isSingleUser && (
              <>
                {renderUserInfo("Nombre", user.given_name)}
                {renderUserInfo("País", user.country)}
                {renderUserInfo("Estado", userStatus)}
              </>
            )}
          </dl>

          <div className="d-flex justify-content-between align-items-center">
            {isSingleUser ? (
              <>
                <button
                  className="btn btn-sm btn-outline-success"
                  onClick={goToBack}
                >
                  Volver
                </button>
                <Edition
                  allowedRoles={["Super Admin", "Administrador"]}
                  className="btn btn-sm btn-outline-success"
                  userEditId={user.id}
                  text={isProfileRoute ? "Contraseña" : "Reset Contr"}
                  onClick={goToPassUpd}
                />
                {!isProfileRoute && (
                  <Edition
                    allowedRoles={["Super Admin", "Administrador"]}
                    className="btn btn-sm btn-outline-danger"
                    text="Rol-Bloqueo"
                    onClick={goToUpgrade}
                  />
                )}
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={goToEdition}
                >
                  Editar
                </button>
              </>
            ) : (
              <>
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={goToDetail}
                >
                  Detalles
                </button>
                <Edition
                  allowedRoles={["Super Admin", "Administrador"]}
                  className="btn btn-sm btn-outline-danger"
                  text="Eliminar"
                  onClick={deleteUser}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
// import {useNavigate, useLocation} from 'react-router-dom'
// import Edition from '../../../Auth/userComponents/Edition/Edition'
// import './user.css'

// const User = ({user, isSingleUser}) => {
//  const navigate = useNavigate()
//  const location = useLocation()
//  const isProfileRoute = location.pathname.includes("profile");

//   const goToDetail = ()=>{navigate(`/admin/users/${user.id}`)}
//   const goToBack = ()=>{navigate(-1)}
//   const goToEdition = ()=>{navigate(`/admin/users/update/${user.id}`)}

//   const userStatus = (user.enable===true)? 'Activo': 'Bloqueado'

//   return (
//     <div className='col userStyle'>
//       <div className='card shadow-sm p-4'>
//         <img className='card-img-top' src={user.picture} alt='Card image'/>
//         <div className='card.body'>
//             <p className='card-text'> Email:
//                 <p className='card-text text-muted text-sm'>{user.email}</p>
//             </p>
//             {isSingleUser?
//             <>
//             <p className='card-text'> Nombre:
//                 <p className='card-text text-muted text-sm'>{user.given_name}</p>
//             </p>
//             <p className='card-text'> Pais:
//                 <p className='card-text text-muted text-sm'>{user.country}</p>
//             </p>
//             <p className='card-text'> Estado:
//                 <p className='card-text text-muted text-sm'>{userStatus}</p>
//             </p></> : null}
//             <p className='card-text'> Apodo
//                 <p className='card-text text-muted text-sm'>{user.nickname}</p>
//             </p>
//             <p className='card-text'> Rol:
//                 <p className='card-text text-muted text-sm'>{user.role}</p>
//             </p>
//             {isSingleUser?
//             <div className='d-flex justify-content-between align-items-center'>
//                 <div className='btn-group'>
//                   <button className='btn btn-sm btn-outline-success' onClick={goToBack}>Volver:</button>
//                 </div>
//                 <div className='btn-group'>
//                   {isProfileRoute ?
//                   <Edition allowedRoles={["Super Admin", "Admin"]} className='btn btn-sm btn-outline-success' userEditId={user.id} text={"Contraseña:"} onClick={()=>{alert('cambiar password')}}/>
//                   :
//                   <Edition allowedRoles={["Super Admin", "Admin"]} className='btn btn-sm btn-outline-success' text={"Rest Contr:"} onClick={()=>{alert('reset password')}}/>
//                   }
//                 </div>
//                 <div className='btn-group'>
//                   {!isProfileRoute?
//                   <Edition allowedRoles={["Super Admin", "Admin"]} className='btn btn-sm btn-outline-danger' text={"Rol-Bloqueo"} onClick={()=>{alert('bloquear, cambiar rol')}}/>
//                   :null}
//                 </div>
//                 <div className='btn-group'>
//                   <button className='btn btn-sm  btn-outline-primary' onClick={goToEdition}>Editar:</button>
//                 </div>
//             </div> :
//             <div className='d-flex justify-content-between align-items-center'>
//                 <div className='btn-group'>
//                   <button className='btn btn-sm btn-outline-primary' onClick={goToDetail}>Detalles:</button>
//                 </div>
//                 <div className='btn-group'>
//                   <Edition allowedRoles={["Super Admin", "Admin"]} className='btn btn-sm btn-outline-danger' text={"Eliminar"} onClick={()=>{alert('borrar')}}/>
//                 </div>
//             </div>
//                }
//         </div>
//       </div>
//     </div>
//   )
// }

// export default User

// allowedRoles={["Super Admin", "Admin"]}
// onClick={toEdition}
// text={"Editar"}
// className="btn btn-primary my-2 ms-2"
