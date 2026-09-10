import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './schema';
import { StudioAccessGuard } from './components/StudioAccessGuard';

export default defineConfig({
  name: 'netbots-studio',
  title: 'NetBots Studio',
  basePath: '/studio',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',

  // Fix: Use token-based auth instead of cookie-based auth.
  // Cookie-based auth (default 'dual' mode) fails in embedded Next.js Studio
  // because cookies from sanity.io cannot be accessed cross-origin from localhost.
  // Token mode stores the session token in localStorage instead.
  auth: {
    loginMethod: 'token',
  },

  // Email-based access control: only allowed emails can use the Studio.
  // Primary security is managed at sanity.io/manage (project members).
  // This provides an additional UI-level guard.
  components: {
    layout: StudioAccessGuard,
  },

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('NetBots Content')
          .items([
            S.listItem()
              .title('Blog Articles')
              .child(S.documentTypeList('post').title('Blog Articles')),
            S.listItem()
              .title('Authors')
              .child(S.documentTypeList('author').title('Authors')),
          ]),
    }),
  ],

  schema: {
    types: schemaTypes,
  },
});
