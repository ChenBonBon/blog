import Password from './password.vue';

const encryptedRoutes = (window as any).__ENCRYPTED_ROUTES__;

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

        if (
          !sessionStorage.getItem('decrypted') ||
          !sessionStorage.getItem('decrypted')?.includes(route.path)
        ) {
          router.push('/password.html');
          sessionStorage.setItem('password', route.password);
          sessionStorage.setItem('path', route.path);
        }
      }
    });
  },
};
