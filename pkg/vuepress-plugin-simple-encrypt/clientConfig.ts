import Password from './password.vue';

const encryptedRoutes = __ENCRYPTED_ROUTES__;

export default {
  enhance({ app, router }) {
    app.component('Password', Password);
    router.beforeEach((to) => {
      const { path } = to;
      if (
        encryptedRoutes &&
        encryptedRoutes.find((route) => route.path === path)
      ) {
        const route = encryptedRoutes.find((route) => route.path === path);
        if (globalThis.sessionStorage) {
          const decrypted = sessionStorage.getItem('decrypted');
          if (
            route &&
            !(
              typeof decrypted === 'string' &&
              JSON.parse(decrypted).includes(route.path)
            )
          ) {
            router.push('/password.html');
            sessionStorage.setItem('password', route.password);
            sessionStorage.setItem('path', route.path);
          }
        }
      }
    });
  },
};
