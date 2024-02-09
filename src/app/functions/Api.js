import { logoutUser } from '../../deconnection';

class Api {
  static async fetch(url, method = 'GET', headers = {}) {
    try {
      const token = sessionStorage.getItem('token');

      if (token == null) {
        window.location.href = '/session/signin';
      }

      const response = await fetch(url, {
        method,
        headers: {
          Authorization: 'Bearer ' + token,
          ...headers
        }
      });

      const content = await response.json();
      if (content.status_code === '401') {
        const logoutResult = await logoutUser();
        if (logoutResult.success) {
          window.location.href = '/session/signin';
        } else {
          console.error('Échec de la déconnexion:', logoutResult.message);
          alert(logoutResult.message);
        }
      }
      return content;
    } catch (error) {
      throw new Error(`Erreur lors de la récupération des données: ${error.message}`);
    }
  }
}

export default Api;
