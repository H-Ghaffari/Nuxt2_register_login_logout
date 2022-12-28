export default function ({ store, redirect, route}) {

    const isGuest = ['login', 'register'];
    const requiresAuth = ['dashboard', 'survey'];
    const routName = route.name;
    store.dispatch('auth/loadTokenToVuex');
    const token = store.getters['auth/getToken'];

    if (routName===null) return redirect('/dashboard')
    if (!token && requiresAuth.includes(routName)) {
      return redirect('/login')
    } else if ( token && isGuest.includes(routName)){
        return redirect('/dashboard')
    }
  }