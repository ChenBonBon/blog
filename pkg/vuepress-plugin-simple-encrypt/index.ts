import { createPage } from '@vuepress/core';
import { path } from '@vuepress/utils';
import { entrypt } from './utils';

const encryptedRoutes: any[] = [];

const SimpleEncrypt = () => {
  return {
    name: 'vuepress-plugin-simple-encrypt',
    clientConfigFile: path.resolve(__dirname, './clientConfig.ts'),
    define: {
      __ENCRYPTED_ROUTES__: encryptedRoutes,
    },
    onInitialized: async (app) => {
      app.pages.push(
        await createPage(app, {
          path: '/password.html',
          content: `<Password />`,
        })
      );
    },
    extendsPage: (page) => {
      if (page.data.frontmatter) {
        if (page.data.frontmatter.secret) {
          if (page.data.frontmatter.password) {
            encryptedRoutes.push({
              path: page.data.path,
              password: entrypt(page.data.frontmatter.password),
            });
          }
        }
      }
    },
  };
};

export default SimpleEncrypt;
