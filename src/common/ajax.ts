import axios, { AxiosResponse, AxiosError } from "axios";
import { message, notification } from "antd";
import { getToken, clearLocalDatas, USER_INFO, TOKEN, MENU } from "@/utils";
import qs from "qs"

const BASE_URL = process.env.REACT_APP_API_BASEURL || "/api/react-ant-admin";

const codeMessage: { [key: number]: string } = {200: "Le serveur a renvoyé avec succès les données demandées.", 201: "Création ou modification des données réussie.", 202: "Une requête a été mise en file d'attente en arrière-plan (tâche asynchrone).", 204: "Suppression des données réussie.", 400: "La requête envoyée comporte une erreur, le serveur n'a pas effectué de création ou de modification des données.", 401: "L'utilisateur n'est pas autorisé (jeton, nom d'utilisateur ou mot de passe incorrect).", 403: "L'utilisateur est autorisé, mais l'accès est interdit.", 404: "La requête est destinée à un enregistrement inexistant, le serveur n'a pas effectué d'opération." ,406: "Le format de la requête n'est pas disponible." ,410: "La ressource demandée a été définitivement supprimée et ne sera plus disponible." ,422: "Une erreur de validation s'est produite lors de la création d'un objet." ,500: "Une erreur est survenue sur le serveur, veuillez vérifier le serveur." , 502: "Erreur de passerelle." , 503: "Le service n'est pas disponible, le serveur est temporairement surchargé ou en maintenance." , 504: "Délai d'attente de la passerelle dépassé."};

const config = {
  baseURL: BASE_URL,

  timeout: 1000 * 15,

  withCredentials: false,

  maxRedirects: 3,
  headers: {
    "Content-Type": " application/json;charset=UTF-8",
  },
};


const instance = axios.create(config);
instance.interceptors.request.use(
  function (config) {
    let token = getToken();
    if (token) {
      config.headers["authorization"] = token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response: AxiosResponse) {
    if (response.data) {
      let { msg, status } = response.data;
      if (status === 1) {
        message.error(msg);
      }
    }
    return response && response.data;
  },
  function (error: AxiosError) {
    const { response } = error;
    if (response && response.status) {
      const errorText = codeMessage[response.status] || response.statusText;
      const { status, config } = response;
      notification.error({
        message: `Erreur de requête ${status}: ${config.url}`,
        description: errorText,
      });
      if (response.status === 401 || response.status === 403) {
        clearLocalDatas([USER_INFO, TOKEN, MENU]);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } else if (!response) {
      notification.error({
        description: "Problème côté client ou problème de réseau, veuillez vider le cache !",
        message: "État anormal",
      });
    }

    return Promise.reject(error);
  }
);

const rewriteGet = instance.get
instance.get = function (url: string, data: any, ...any) {
  let query: string = qs.stringify(data, { addQueryPrefix: true });
  return rewriteGet(url + query, ...any)
}

export default instance;
