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

export const getFeed = async ({ slug = "", category = null, subcategory = null }) => {
  const query = `query {
      publications(status: true, slug: "${slug}", category: ${category}, subcategory: ${subcategory}) {
        accept_changues
        banner_bottom
        banner_top
        category
        certificate
        description
        id
        image_1
        image_2
        image_3
        image_4
        image_5
        image_link
        is_new
        price
        quantity
        sale_price
        slug
        tags
        title        
        user
        user_name
        user_phone
        user_picture
        views
        warranty
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
          const getIURL = async () => {
            console.log("entro en getIURL")
            try {
              return [await ref_thumbnail.getDownloadURL(), await ref_full.getDownloadURL()]
            }
            catch (err) {
              return null
            }
          }

          let url_thumbnail, url_full = null
          const ref_thumbnail = storage.ref("/images/" + tipoArchivo + "/" + nombre_archivo + "_320x320.jpg");
          const ref_full = storage.ref("/images/" + tipoArchivo + "/" + nombre_archivo + "_1080x1080.jpg");
          const myInterval = setInterval(async () => {
            const images = await getIURL(ref_thumbnail, ref_full)
            if (images) {
              console.log("entro e imagenes");
              clearInterval(myInterval)
              url_thumbnail = images[0]
              url_full = images[1]
              arrayURLS.push(url_thumbnail)
              arrayURLS.push(url_full)
              // if (arrayURLS.length == $imagenes.files.length)
              resolve(arrayURLS)
              return arrayURLS
            } else {
              console.log("entro y no imagenes");
            }
          }, 2000)
          /*const file_name = uploadTask.snapshot.ref.name
          // uploadTask.snapshot.ref*/
        }
      );
    });
  });

export const handleLogout = () => {
  localStorage.removeItem("user")
  localStorage.removeItem("token")
  Router.push("/?logout")
}

export const loadAudio = function (fuente) {
  // const fuente = "/audios/noti.mp3"
  const sonido = document.querySelector("audio")
  sonido.src = fuente
  sonido.volume = 0.2
  sonido.play()
}

export function getPaises() {
  return [
    { id: "colombia", nombre: "Colombia" },
    { id: "mexico", nombre: "México" },
    { id: "argentina", nombre: "Argentina" },
    { id: "españa", nombre: "España" },
    { id: "salvador", nombre: "Salvador" },
  ]
}

export function getCiudades() {
  return [
    { pais: "colombia", id: "medellin", nombre: "Medellín" },
    { pais: "colombia", id: "bogota", nombre: "Bogotá" },
    { pais: "colombia", id: "pereira", nombre: "Pereira" },
    { pais: "colombia", id: "cartagena", nombre: "Cartagena" },
    { pais: "colombia", id: "barranquilla", nombre: "Barranquilla" },
    { pais: "colombia", id: "cali", nombre: "Cali" },
    { pais: "mexico", id: "ciudad-mexico", nombre: "Ciudad de México" },
    { pais: "mexico", id: "guadalajara", nombre: "Guadalajara" },
    { pais: "mexico", id: "puebla-zaragoza", nombre: "Puebla de Zaragoza" },
    { pais: "mexico", id: "ecatepec", nombre: "Ecatepec" },
    { pais: "mexico", id: "tijuana", nombre: "Tijuana" },
    { pais: "argentina", id: "buenos_aires", nombre: "Buenos Aires" },
    { pais: "españa", id: "madrid", nombre: "Madrid" },
    { pais: "salvador", id: "san_salvador", nombre: "San Salvador" },
  ]
}

export function shuffle(array) {
  // Ordenar aleatoriamente un array
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

export function format_number(input) {
  input = String(input)
  var num = input.replace(/\./g, '');
  if (!isNaN(num)) {
    num = num.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g, '$1.');
    num = num.split('').reverse().join('').replace(/^[\.]/, '');
    input = num;
  }
  else {
    input = input.replace(/[^\d\.]*/g, '');
  }
  return input
}

export function slugify(string, lenght) {
  const a = 'àáäâãåăæçèéëêǵḧìíïîḿńǹñòóöôœøṕŕßśșțùúüûǘẃẍÿź·/_,:;'
  const b = 'aaaaaaaaceeeeghiiiimnnnooooooprssstuuuuuwxyz------'
  const p = new RegExp(a.split('').join('|'), 'g')
  const cadena = string.toString().toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, '-and-') // Replace & with ‘and’
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '') // Trim - from end of text
  return lenght ? cadena.substring(0, lenght) : cadena
}

export function checkIsMobile(userAgent) {
  var ua = userAgent.toLowerCase();
  return (
    /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
      ua
    ) ||
    /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
      ua.substr(0, 4)
    )
  );
}

export function getCategories(id) {
  const categories = [{ id: 1, name: "Accesorios", image: "/images/icons/accesorios.svg" }, { id: 2, name: "Nintendo Switch", image: "/images/icons/nintendo.svg" }, { id: 3, name: "Playstation", image: "/images/icons/play.svg" }, { id: 4, name: "Xbox", image: "/images/icons/xbox.svg" }, { id: 5, name: "Otros", image: "/images/icons/otros1.svg" }]
  if (id) return categories.find(item => item.id == id)
  return categories
}

export function getSubcategories(id) {
  const subcategories = [
    { id: 1, name: "Membresias Nintendo Switch", url: "/subcategory/membresias-nintendo-switch" },
    { id: 2, name: "Membresias Playstation", url: "/subcategory/membresias-playstation" },
    { id: 3, name: "Promociones", url: "/subcategory/promociones" },
    { id: 4, name: "Juegos Clasicos", url: "/subcategory/juegos-clasicos" },
    { id: 5, name: "Combos", url: "/subcategory/combos" },
    { id: 6, name: "Sorteos", url: "/subcategory/sorteos" },
  ]
  if (id) return subcategories.find(item => item.id == id)
  return subcategories
}