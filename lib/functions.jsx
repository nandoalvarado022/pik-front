// require('isomorphic-fetch');
import fetch from "node-fetch"
import rn from "random-number";
import toastr from "toastr";
import date from "date-and-time";
import { storage } from "./storage";
import Router from "next/router";
import "date-and-time/locale/es";
// import { preguntaNotificaciones } from './push-notification'
import VARS from "./variables"
date.locale("es");

export default class Funciones {
  db = null;
  constructor() {
  }

  async canjearCupon(data = {}) {
    let encontroCupon = false;
    const publicacion = await this.db
      .collection("publicaciones")
      .doc(data.id_publicacion);
    let cupones = await publicacion.get();
    cupones = cupones.data().cupones;
    cupones.map((item) => {
      if (item.usado == false && item.cupon == data.cuponDigitado) {
        encontroCupon = true;
        const now = new Date();
        const fecha = date.format(now, "YYYY-MM-DD HH:mm:ss");
        item.usado = true;
        item.fecha = fecha;
      }
      return item;
    });
    const result = await publicacion.update({ cupones });
    return {
      encontroCupon,
    };
  }

  async validarCupon(data = {}) {
    const publicacion = await this.db
      .collection("publicaciones")
      .doc(data.id_publicacion)
      .get();
    const cupon = publicacion.data().cupones
      ? publicacion
        .data()
        .cupones.find(
          (item) => item.usado == false && item.cupon == data.cuponDigitado
        )
      : false;
    if (!!cupon) {
      return { valor: cupon.valor, estado: true };
    } else {
      return { estado: false };
    }
  }

  async getUsuarios(data = {}) {
    const func = async () => {
      const registros = [];
      let req = this.db.collection("usuarios");
      /*if (data.id_usuario){
          req = req.doc(data.id_usuario)
      } else{*/
      if (data.email) req = req.where("email", "==", data.email);
      if (data.club_short_name)
        req = req.where("club_short_name", "==", data.club_short_name);
      if (data.nickname) req = req.where("nickname", "==", data.nickname);
      if (data.limite) req = req.limit(data.limite);
      if (data.orden) req = req.orderBy("fecha", "desc");
      // }
      const resUsuarios = await req.get();
      resUsuarios.forEach((item) => {
        registros.push({
          ...item.data(),
          id: item.id,
        });
      });
      return registros;
    };
    // return func()
    return this.validarCache(`data_usuarios_${JSON.stringify(data)}`, func);
  }

  async getClub(params = {}) {
    const { id_club, logUsuarios } = params;
    const func = async () => {
      const data = [];
      let result = this.db.collection("clubs");
      if (id_club) result = result.where("short_name", "==", id_club);
      result = await result.get();
      result.forEach((item) => data.push({ ...item.data(), id_club: item.id }));
      if (logUsuarios) {
        // Devolver usuarios por el club que se solicito
        let result = await this.db
          .collection("usuarios")
          .where("club_short_name", "==", data[0].short_name)
          .get();
        const usuarios = [];
        result.forEach((item) =>
          usuarios.push({
            ...item.data(),
            id_usuario: item.id,
            tipo_coleccion: "usuarios",
          })
        );
        data[0].usuarios = usuarios;
      }
      return data;
    };
    // return func()
    return this.validarCache(`data_club_${JSON.stringify(id_club)}`, func);
  }

  async saveUsuario(datosUsuario) {
    return await this.db.collection("usuarios").add(datosUsuario);
  }

  async saveClub() {
    const result = await this.db.collection("clubs").doc().set({
      conocenos:
        "PASION SCOOTER MEDELLIN que esperas para rodar con nosotros enterate de todas nuestras rodadas en nuestras redes Whatsapp:3022600906#clubpsmedellin",
      email: "psm@gmail.com",
      fecha: "2020-01-19 16:28:58",
      imagen: "psm.jpg",
      miembros: 1065,
      nombre: "Pasión Scooter Medellín",
      portada_imagen: "psm.jpg",
      short_name: "psm",
    });
  }

  async leerUsuarios() {
    const result = await this.getUsuarios();
    const todosUsuarios = [];
    result.forEach((usuario) => {
      todosUsuarios.push(usuario);
    });
  }

  saveNotificacion = async (datos) => {
    let { notificacionNueva, id_usuario } = datos;
    id_usuario = id_usuario
      ? id_usuario
      : JSON.parse(localStorage.getItem("user")).id_usuario;
    let result = await this.db.collection("usuarios").doc(id_usuario).get();
    let notificaciones = result.data().notificaciones;
    notificaciones.push({ template: notificacionNueva, leido: false });
    result = await this.db
      .collection("usuarios")
      .doc(id_usuario)
      .update({ notificaciones: notificaciones });
  };

  async borrarNotificacion(idNoti) {
    let data = [];
    let notificaciones = [];
    const id_usuario = JSON.parse(localStorage.getItem("user")).id_usuario;
    let result = await this.db.collection("usuarios").doc(id_usuario).get();
    result = result.data().notificaciones;
    result.map((item, ind) => {
      if (ind != idNoti) notificaciones.push(item);
    });
    result = await this.db
      .collection("usuarios")
      .doc(id_usuario)
      .update({ notificaciones: notificaciones });
    return notificaciones;
  }

  saveMiembroClub({ id_club }) {
    // Document reference
    const storyRef = this.db.collection("clubs").doc(id_club);
    // Update read count
    storyRef.update({ miembros: increment });
  }

  savePregunta = async (data) => {
    const result = await this.db.collection("preguntas").add(data);
    // Sumando a +1 las publicaciones del usuario
    const req_usuario = this.db.collection("usuarios").doc(data.id_usuario);
    const datos_usuario = await req_usuario.get();
    let estadisticas = await datos_usuario.data().estadisticas;
    estadisticas = {
      ...estadisticas,
      preguntas: estadisticas.preguntas + 1,
    };
    req_usuario.update({ estadisticas });
    //
    return result;
  };

  savePublicacionNuevoUsuario = async (data) => {
    this.db.collection("publicaciones").add(data);
  };

  savePublicacion = async (data) => {
    const req_usuario = this.db.collection("usuarios").doc(data.id_usuario);
    let data_usuario = await req_usuario.get();
    this.db
      .collection("publicaciones")
      .add(data)
      .then(async () => {
        // Sumando a +1 las publicaciones del usuario
        let estadisticas = data_usuario.data().estadisticas;
        estadisticas = {
          ...estadisticas,
          publicaciones: estadisticas.publicaciones + 1,
        };
        req_usuario.update({ estadisticas });
        //
        // Notifaciones a club si aplica
        const obj = {
          club_short_name: data_usuario.data().club_short_name,
          template: data.descripcion,
          fecha: data.fecha,
        };
        if (obj.club_short_name) await this.saveNotificacionesClub(obj);
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  };

  async saveNotificacionesClub({ club_short_name, template, fecha }) {
    const objeto = {
      club_short_name,
    };
    const usuarios = await this.getUsuarios(objeto);
    usuarios.forEach((item) => {
      const id_usuario = item.id;
      const usuario = this.db.collection("usuarios").doc(id_usuario);
      const notificacion = {
        template,
        fecha,
        leido: false,
      };

    });
  }

  saveRespuesta = async (data) => {
    // Guardar una respuesta a una pregunta
    const publicacion = this.db
      .collection("publicaciones")
      .doc(data.id_publicacion);

  };

  async saveTip(data) {
    // Registrar cuando un usuario hizo un tip
    if (!data.email) return;
    const usuario = await this.getUsuarios({
      condicion: ["email", "==", data.email],
    });

  }

  saveRecomendacion = async ({ recomendacion }) => {
    // Inscribir un usuario a una actividad/plan
    const result = await this.db
      .collection("recomendaciones")
      .add(recomendacion);
    // Sumando a +1 las recomendaciones del usuario
    const req_usuario = await this.db
      .collection("usuarios")
      .doc(recomendacion.id_usuario)
      .get();
    let estadisticas = await req_usuario.data().estadisticas;
    const ins_usuario = db.collection("usuarios").doc(recomendacion.id_usuario);
    estadisticas = {
      ...estadisticas,
      recomendaciones: estadisticas.recomendaciones + 1,
    };
    ins_usuario.update({ estadisticas });
    //
    return result;
  };

  saveRevision = async ({ revision }) => {
    const id_usuario = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")).id_usuario
      : null;
    const usuario = this.db.collection("usuarios").doc(id_usuario);

  };

  updateUsuario = async (data) => {
    // Actualizar un usuario
    let datos = JSON.parse(localStorage.getItem("user"));
    datos = {
      ...datos,
      ciudad: data.ciudad,
      pais: data.pais,
    };
    localStorage.setItem("user", JSON.stringify(datos));
    const result = await this.db
      .collection("usuarios")
      .doc(data.id_usuario)
      .update(data);
  };

  savePerfil = async (data) => {
    // Validando nickname
    let valida = await this.getUsuarios({
      nickname: data.nickname,
    });
    if (valida.length > 0) delete data.nickname;
    // Actualizando perfil
    let result = await this.db
      .collection("usuarios")
      .doc(data.id_usuario)
      .update(data);
    // Consultando perfil para devolverlo
    result = await this.db.collection("usuarios").doc(data.id_usuario).get();
    localStorage.setItem("user", JSON.stringify(result.data()));
    return result.data();
  };

  saveCompra = async (data) => {
    // Aumentando variable compras en variables generales
    // Guardando en la colección de compras
    const resultCompra = await this.db.collection("compras").add(data);
    return resultCompra;
  };

  saveUsuarioActivity = async (data) => {
    // Inscribir un usuario a una actividad/plan
    const result = await this.db.collection("actividades_usuarios").add(data);
    // Sumando a +1 las recomendaciones del usuario
    const req_usuario = await this.db
      .collection("usuarios")
      .doc(data.id_usuario)
      .get();
    let estadisticas = await req_usuario.data().estadisticas;
    const ins_usuario = db.collection("usuarios").doc(data.id_usuario);
    estadisticas = {
      ...estadisticas,
      rodadas: estadisticas.rodadas + 1,
    };
    ins_usuario.update({ estadisticas });
    //
    return result;
  };

  getVariable_global = async ({ clave = "" }) => {
    var result = await this.db
      .collection("variables")
      .where("nombre", "==", clave)
      .get();
    return result;
  };

  getNotificaciones = async ({ reqCache }) => {
    const func = async () => {
      let data = {};
      if (typeof window == "undefined") return [];
      if (localStorage.getItem("user")) {
        // logueado
        const id_usuario = JSON.parse(localStorage.getItem("user")).id_usuario;
        const result = await this.db
          .collection("usuarios")
          .doc(id_usuario)
          .get();
        data.listado = result.data().notificaciones;
      } else {
        const template =
          '<p>¡Hola! es un placer que ingreses a nuestra familia 😍 <br /> ahora solo debes registrarte haciendo clic <a href="/login" className="font-white">aquí</a></p>';
        data.listado = [{ template }];
      }
      return data;
    };
    return func();
  };

  getPreguntas = async ({ id_pregunta, orden } = {}) => {
    const tblUsuarios = await this.getUsuarios({});
    const data = [];
    const key = `data_pregunta_${id_pregunta}`;
    const func = async () => {
      let result = this.db.collection("preguntas");
      if (id_pregunta) result = result.where("short_name", "==", id_pregunta);
      if (orden) result = result.orderBy(orden, "desc");
      result = await result.limit(10).get();
      result.forEach((item) => {
        const author = tblUsuarios.filter(
          (x) => x.id_usuario == item.data().id_usuario
        )[0];
        data.push({
          ...item.data(),
          id: item.id,
          tipo_coleccion: "preguntas",
          author,
        });
      });
      return data;
    };
    return this.validarCache(key, func);
  };

  async validarCache(key, func, reqCache = true) {
    const tiempoCache = 2; // Tiempo en minutos
    const now = new Date();
    const cacheGuardada =
      typeof window != "undefined"
        ? sessionStorage.getItem(key)
          ? sessionStorage.getItem(key)
          : null
        : null;
    function expiroTiempoCache() {
      let fecha_fin = JSON.parse(sessionStorage.getItem(key)).fecha_fin;
      fecha_fin = new Date(fecha_fin);
      if (key == "data_actividades_undefined") {
      }
      if (now > fecha_fin) {
        return true;
      } else {
        return false;
      }
    }
    if (reqCache && cacheGuardada && !expiroTiempoCache()) {
      return JSON.parse(sessionStorage.getItem(key)).data;
    } else {
      const data = await func();
      if (data) {
        // Si el servicio trajo datos los almaceno en cache
        let fecha_fin = date.addMinutes(now, tiempoCache);
        fecha_fin = date.format(fecha_fin, "YYYY-MM-DD HH:mm:ss");

        typeof window != "undefined" &&
          sessionStorage.setItem(
            key,
            JSON.stringify({
              data,
              fecha_fin,
            })
          );
      }
      return data;
    }
  }

  getRecomendaciones = async () => {
    const func = async () => {
      const tblUsuarios = await this.getUsuarios({});
      const data = [];
      const result = await this.db
        .collection("recomendaciones")
        .orderBy("fecha")
        .limit(10)
        .get();
      result.forEach((item) => {
        const author = tblUsuarios.filter(
          (x) => x.id_usuario == item.data().id_usuario
        )[0];
        data.push({
          ...item.data(),
          id: item.id,
          tipo_coleccion: "recomendaciones",
          author,
        });
      });
      return data;
    };
    return this.validarCache("data_recomendaciones", func);
  };

  enviarMensajeChat = (params) => {

  };

  getChatActividad = async () => {
    const data = [];
    const result = await this.db
      .collection("actividades")
      .doc("ir-a-ver-pikachu-nid3")
      .onSnapshot(function (doc) {
        result.forEach((item) => data.push({ ...item.data(), id: item.id }));
      });
    return data;
  };

  getVehiculos = (vehiculo = null) => {
    let data;
    data = [
      { styles: { backgroundPosition: "-12px -20px" }, label: "a" },
      { styles: { backgroundPosition: "-165px -20px" }, label: "b" },
      { styles: { backgroundPosition: "-320px -15px" }, label: "c" },
      { styles: { backgroundPosition: "-10px -130px" }, label: "d" },
      { styles: { backgroundPosition: "-165px -130px" }, label: "e" },
      { styles: { backgroundPosition: "-322px -130px" }, label: "f" },
      { styles: { backgroundPosition: "-325px -255px" }, label: "g" },
      {
        styles: { backgroundPosition: "-35px -305px", backgroundSize: "420px" },
        label: "h",
      },
    ];
    if (vehiculo) {
      data = data.find((item) => item.label == vehiculo);
    }
    return data;
  };

  getMedallasUsuario = async () => {
    const data = [];
    const result = await this.db.collection("medallas_usuarios").get();
    result.forEach((item) => data.push(item.data()));
    return data;
  };

  getMedallas = async () => {
    const data = [];
    const result = await this.db.collection("medallas").get();
    result.forEach((item) => {
      return data.push({ id: item.id, ...item.data() });
    });
    return data;
  };

  getUsuariosActividad = async (id_actividad = null) => {
    const data = [];
    let result = await this.db.collection("actividades_usuarios").get();
    result.forEach((item) => data.push(item.data()));
    result = id_actividad
      ? data.filter((item) => item.id_actividad == id_actividad)
      : data;
    return result;
  };

  getActividades = async (obj = {}) => {
    const { club } = obj;
    const func = async () => {
      const data = [];
      let query = this.db.collection("actividades");
      if (club) query = query.where("club", "==", club);
      const resActividades = await query.limit(10).get();
      resActividades.forEach((item) =>
        data.push({
          ...item.data(),
          id: item.id,
          tipo_coleccion: "actividades",
        })
      );
      return data;
    };
    const params = Object.keys(obj).length > 0 ? JSON.stringify(obj) : "";
    const result = await this.validarCache(`data_actividades_${params}`, func);
    return result;
  };

  getClubs = async (obj = {}) => {
    const func = async () => {
      const data = [];
      let req = this.db.collection("clubs");
      if (obj.limite) req = req.limit(obj.limite);
      let result = await req.orderBy("fecha", "desc").get();
      result.forEach((item) => data.push(item.data()));
      return data;
    };
    const params = Object.keys(obj).length > 0 ? JSON.stringify(obj) : "";
    return this.validarCache(`data_clubs_${params}`, func);
  };

  getInfoUsuario = async ({ id_usuario }) => {
    const func = async () => {
      const data = [];
      let result = await this.db
        .collection("usuarios")
        .where("nickname", "==", id_usuario)
        .get();
      result.forEach((item) => data.push(item.data()));
      const club_short_name = data[0].club_short_name
        ? data[0].club_short_name
        : null;
      if (club_short_name != null) {
        const club_req = await this.db
          .collection("clubs")
          .where("short_name", "==", club_short_name)
          .get();
        const data2 = [];
        club_req.forEach((item) => data2.push(item.data()));
        const club = data2[0];
        data[0].club = club;
      }
      return data[0];
    };
    // return func()
    return this.validarCache(`data_info_usuario_${id_usuario}`, func);
  };

  getActividadesDetalle = async (obj = {}) => {
    // Listado de rodadas
    const { club } = obj;
    const func = async () => {
      // const actividades = []
      // const tblUsuarios = await this.getUsuarios({})
      // const tblActividadesUsuario = await this.getUsuariosActividad()
      const actividades = await this.getActividades({ club });
      actividades &&
        actividades.map((actividad) => {
          const author = this.getUsuarios({ id_usuario: actividad.id_usuario }); //.filter(x => x.email == plan.author)[0]
          let participantes = []; //tblActividadesUsuario.filter(x => x.id_actividad == plan.short_name).map(x => x.id_usuario)
          // participantes = tblUsuarios.filter(x => participantes.includes(x.email))
          const data = {
            ...actividad,
            participantes,
            author,
            tipo_coleccion: "actividades",
          };
          actividad = data;
        });
      return actividades;
    };
    const params = Object.keys(obj).length > 0 ? JSON.stringify(obj) : "";
    // return func()
    return await this.validarCache(`data_actividades_detalle_${params}`, func);
  };

  getActividadDetalle = ({ idActividad }) =>
    new Promise(async (resolve, reject) => {
      // Detalle de una actividad
      const tblUsuarios = await this.getUsuarios({});
      const tblActividadesUsuario = await this.getUsuariosActividad(
        idActividad
      );
      const tblActividades = await this.getActividades({});
      const plan = tblActividades.find((x) => x.short_name == idActividad);
      if (plan) {
        const author = tblUsuarios.filter((x) => x.email == plan.author)[0];
        let participantes = tblActividadesUsuario
          .filter((x) => x.id_actividad == plan.short_name)
          .map((x) => x.id_usuario);
        participantes = tblUsuarios.filter((x) =>
          participantes.includes(x.email)
        );
        const data = {
          ...plan,
          participantes,
          author,
        };
        resolve(data);
      } else {
        reject("Error");
      }
    });

  async handleLike(obj = {}) {
    if (typeof localStorage != "undefined" && !localStorage.getItem("user")) {
      const errorInicio = toastr;
      errorInicio.options.onclick = () => Router.push("/login");
      errorInicio.warning("Debes ingresar para hacer esto");
      return false;
    }
    obj.elemento.classList.remove("active");
    setTimeout(() => {
      obj.elemento.classList.add("active");
    }, 200);
    const elementNumber = obj.elemento.firstChild;
    const totalLikes = Number(elementNumber.innerHTML) + 1;
    setTimeout(() => {
      elementNumber.innerHTML = totalLikes;
    }, 1000);
    obj.user = JSON.parse(localStorage.getItem("user")).email;

    // Guardar un like en firestore
    const documento = await this.db
      .collection(obj.tipo_coleccion)
      .doc(obj.docID);


    return obj;
  }
  nothing() {
    return null;
  }
}

export const getFeed = async ({ slug = "", category = "" }) => {
  const query = `
    query {
      publications(status: true, slug: "${slug}", category: "${category}") {
        is_new
        description
        image_link
        image_2
        image_3
        image_4
        image_5
        price
        quantity
        tags
        title
        type
        user_picture
        user_phone
        slug
        sale_price
      }
    }`

  const res = await fetch(VARS.API_URL_GRAPHQL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query })
  })
  const data = await res.json()
  return data?.data?.publications
}

export const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export const subirImagen = ({ tipoArchivo, idImageElement }) =>
  new Promise(async (resolve, reject) => {
    const arrayURLS = [];
    // const $imagenes = document.getElementById("subir_imagen");
    const $imagenes = document.getElementById(idImageElement);
    Array.from($imagenes.files).forEach((file) => {
      const d = new Date();
      const datestring = d.getDate() + "_" + (d.getMonth() + 1) + "_" + d.getFullYear() + "_" + d.getHours() + "_" + d.getMinutes() + "_" + d.getSeconds();
      const random = rn({ min: 0, max: 100, integer: true });
      const nombre_archivo = `${datestring}_${random}`;
      let ubicacionGuardar = storage.ref("/images/" + tipoArchivo + "/" + nombre_archivo + ".jpg");
      const uploadTask = ubicacionGuardar.put(file);
      uploadTask.on(
        "state_changed",
        function (snapshot) {
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if (document.querySelector("#progressUploadImage")) {
            document.querySelector("#progressUploadImage").innerHTML =
              progress + "%";
          }
          console.log("Upload is " + progress + "% done");
        },
        function (err) {
          reject(err);
        },
        async function (snapshot) {
          let downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
          arrayURLS.push(downloadURL);
          if (arrayURLS.length == $imagenes.files.length) resolve(arrayURLS);
        }
      );
    });
  });

export const handleLogout = () => {
  localStorage.removeItem("user")
  localStorage.removeItem("token")
  Router.push("/?logout")
}