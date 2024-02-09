export const logoutUser = async () => {
  try {
    const token = sessionStorage.getItem('token');
    const headers = new Headers();
    headers.append('Authorization', `Bearer ${token}`);

    const response = await fetch(
      'https://wscloudfinal-production.up.railway.app/api/auth/v1/logout',
      {
        method: 'Post',
        headers: headers
      }
    );

    const data = await response.json();

    if (response.ok) {
      sessionStorage.removeItem('token');
      return { success: true };
    } else {
      return { success: false, message: data.message };
    }
  } catch (error) {
    console.error('Erreur lors de la déconnexion:', error);
    return { success: false, message: "Une erreur s'est produite lors de la déconnexion." };
  }
};
